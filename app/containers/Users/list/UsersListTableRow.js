import React, { forwardRef } from 'react';
import * as PropTypes from 'prop-types';
import Search from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ResetIcon from '@material-ui/icons/SettingsBackupRestore';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { compose } from 'redux';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import UserListConsult from '../consultlistuser/UserListConsult';
import authenticated from '../../HOC/authenticated/authenticated';
import UpdateUserForm from '../Edit/UpdateUserForm';
import { formatCityToLabelValue } from '../add/utils';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import FilterInputsList from '../../Reporting/inputsList/FilterInputsList';
import { ShoppingCart } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { getUserCommandsList, getUserInfo } from '../actions';
import { DropDown } from '../../../components/DropDown';
import { Person, PersonOutline, Settings } from '@material-ui/icons';
import { Button, ListItemIcon, MenuItem } from '@material-ui/core';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import Table from '../../../components/Table';
import moment from 'moment';

const RowComponent = forwardRef((props, ref) => {
  return (
    <IconButton buttonRef={ref} onClick={props.onClick}>
      <Settings />
    </IconButton>
  );
});

export const commandHeaders = [
  { title: 'Date commande' },
  { title: 'Total remisé' },
  { title: 'Offre' },
  { title: 'Laboratoire' },
];

const closeButton = { float: 'right' };

const initialState = {
  formData: {
    firstName: '',
    lastName: '',
    cin: '',
    email: '',
    tel: '',
    gsm: '',
    ville: '',
    codePostal: '',
    pharmacie: '',
    address: '',
    region: '',
  },
  errors: {
    fields: {},
    messages: {},
  },
  isSuccess: false,
  detailsOpen: false,
  editMode: false,
  updateStatus: false,
  userStatus: 'active',
};

export class UsersListTableRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      userRow: {},
      open: false,
      anchorEl: null,
      isTippyOpen: false,
      showSubCommands: false,
      subCommands: [],
    };
  }

  handleFormDataChange = e => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  openDetails = (id, closeDropDown) => () => {
    this.props.dispatch(
      getUserInfo({
        callback: (err, data) => {
          if (!err) {
            this.setState({
              userRow: data,
              detailsOpen: true,
            });
            return;
          }
          console.log(err);
        },
        id,
      }),
    );
    closeDropDown();
  };

  edit = () => {
    this.setState({
      formData: { ...row, ville: formatCityToLabelValue(row.ville) },
      editMode: true,
      isTippyOpen: false,
    });
  };

  handleSubmitEdit = e => {
    e.preventDefault();
    const { formData } = this.state;
    this.props.updateUser(
      {
        ...formData,
        ville: { id: formData.ville && formData.ville.value },
      },
      () => {
        this.setState({
          editMode: false,
        });
      },
    );
  };

  handeledit = e => {
    e.preventDefault();
    this.setState({
      editMode: true,
    });
  };

  closeDetails = () => {
    this.setState({
      ...initialState,
    });
  };

  toggle = e => {
    console.log(e.target.checked);
    this.props.toggleUser(e.target.checked);
  };

  reset = () => {
    this.props.resetUser();
  };

  delete = () => {
    // eslint-disable-next-line react/prop-types
    this.props.deleteUser();
    this.setState({ isTippyOpen: false });
  };

  closeEditMode = () => {
    this.setState({
      ...initialState,
    });
  };

  toggleProfileMenu = e => {
    this.setState({
      anchorEl: e.currentTarget,
      open: true,
    });
  };

  hanldeGetUserCommandes = userId => () => {
    this.props.dispatch(
      getUserCommandsList({
        userId,
        callback: (res, err) => {
          this.setState({ subCommands: res, showSubCommands: true });
        },
      }),
    );
  };

  closeSubCommandsModel = () => {
    this.setState({ showSubCommands: false });
  };

  closeUpdateStatusModel = () => {
    this.setState({ updateStatus: false });
  };

  openUpdateUserStatus = () => {
    const { row } = this.props;
    this.props.dispatch(
      getUserInfo({
        callback: (err, data) => {
          if (!err) {
            this.setState({ updateStatus: true, userStatus: data.enabled ? 'active' : 'inactive' });
            return;
          }
          console.log(err);
        },
        id: row.id,
      }),
    );
  };

  updateStatus = () => {
    this.props.toggleUser(this.state.userStatus === 'active' ? true : false);
    this.setState({ updateStatus: false });
  };

  render() {
    const { row, cities, regions } = this.props;
    const { editMode, detailsOpen } = this.state;
    return (
      <React.Fragment>
        <TableRow key={row.id}>
          <TableCell style={{ padding: 5 }} component="th" scope="row">
            {row.firstName} {row.lastName}
          </TableCell>
          <TableCell style={{ padding: 5 }}>{row.email}</TableCell>
          <TableCell style={{ padding: 5 }}>{row.pharmacy}</TableCell>
          <TableCell style={{ padding: 5 }}>{row.role}</TableCell>
          <TableCell style={{ padding: 5 }}>{row.createdAt ? row.createdAt.split('T')[0] : 'aucune commandes'}</TableCell>
          <TableCell style={{ padding: 0 }}>{row.quantityCmd}</TableCell>
          <TableCell style={{ padding: 0 }}>{row.totalAmount ? row.totalAmount.toFixed(2) : null}</TableCell>
          <TableCell style={{ padding: 0, display: 'flex' }}>
            {/* <Switch checked={row.enabled} onChange={this.toggle} value={row.enabled} color="primary" /> */}
            <Tippy
              theme="light"
              interactive
              visible={this.state.isTippyOpen}
              onClickOutside={() => {
                this.setState({ isTippyOpen: false });
              }}
              content={
                <div>
                  <MenuItem onClick={this.openDetails(row.id, () => this.setState({ isTippyOpen: false }))}>
                    <ListItemIcon style={{ padding: 5 }}>
                      <Person color="secondary" />
                    </ListItemIcon>
                    <Typography>Consulter</Typography>
                  </MenuItem>
                  <MenuItem onClick={this.edit}>
                    <ListItemIcon style={{ padding: 5 }}>
                      <EditIcon color="primary" />
                    </ListItemIcon>
                    <Typography>Modifier</Typography>
                  </MenuItem>

                  {/* <Tooltip placement="top" title="Rénitialiser mot de passe">
                    <IconButton onClick={this.reset} style={{ padding: 5 }}>
                      <ResetIcon color="primary" />
                    </IconButton>
                  </Tooltip> */}
                  <MenuItem onClick={this.delete}>
                    <ListItemIcon style={{ padding: 5 }}>
                      <DeleteIcon color="primary" />
                    </ListItemIcon>
                    <Typography>Supprimer</Typography>
                  </MenuItem>

                  <MenuItem onClick={this.openUpdateUserStatus}>
                    <ListItemIcon style={{ padding: 5 }}>
                      <EditIcon color="primary" />
                    </ListItemIcon>
                    <Typography>update Status</Typography>
                  </MenuItem>

                  <MenuItem onClick={this.hanldeGetUserCommandes(row.id)}>
                    <ListItemIcon style={{ padding: 5 }}>
                      <ShoppingCart color="primary" />
                    </ListItemIcon>
                    <Typography>Commands List</Typography>
                  </MenuItem>
                </div>
              }
            >
              <RowComponent onClick={() => this.setState({ isTippyOpen: true })} />
            </Tippy>
          </TableCell>
        </TableRow>

        {detailsOpen && (
          <Dialog maxWidth="lg" onClose={this.handleClose} open>
            <MuiDialogTitle style={{ display: 'flex', justifyContent: 'space-between' }} disableTypography>
              <Typography variant="h5" color="primary">
                {`Details Utilisateur`}
              </Typography>
              <IconButton color="primary" aria-label="Close" style={closeButton} onClick={this.closeDetails}>
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>
            <MuiDialogContent>
              {/* <FilterInputsList
                laboratoires={laboratoires}
                regions={regions}
                pharmacies={pharmacies}
                rows={reporting}
                getReporting={getReporting}
              /> */}
              <UserListConsult row={this.state.userRow} />
            </MuiDialogContent>
          </Dialog>
        )}
        {editMode && (
          <Dialog maxWidth="lg" onClose={this.handleClose} open>
            <MuiDialogTitle style={{ display: 'flex', justifyContent: 'space-between' }} disableTypography>
              <Typography variant="h5" color="primary">
                {`Modifier Utilisateur`}
              </Typography>
              <IconButton color="primary" aria-label="Close" onClick={this.closeEditMode}>
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>
            <MuiDialogContent>
              <UpdateUserForm
                formData={this.state.formData}
                cities={cities}
                handleFormDataChange={this.handleFormDataChange}
                handleSubmit={this.handleSubmitEdit}
                regions={regions}
                rowId={this.props.rowId}
              />
            </MuiDialogContent>
          </Dialog>
        )}
        <Dialog
          title="List des commands associées"
          open={this.state.showSubCommands}
          showBtns={false}
          onClose={this.closeSubCommandsModel}
          maxWidth="lg"
        >
          <div>
            <Table headers={commandHeaders} pageable={false}>
              {this.state.subCommands.map(row => {
                return (
                  <TableRow key={row.commandId}>
                    <TableCell>{row.createdAt ? moment(row.createdAt).format('YYYY/MM/DD') : '---------'}</TableCell>
                    <TableCell>{row.totalAmountDiscount.toFixed(2)}</TableCell>
                    <TableCell>{row.offerName}</TableCell>
                    <TableCell>{row.laboName}</TableCell>
                  </TableRow>
                );
              })}
            </Table>
          </div>
        </Dialog>
        <Dialog
          title="Modifier User Status"
          open={this.state.updateStatus}
          showBtns={false}
          onClose={this.closeUpdateStatusModel}
          maxWidth="lg"
        >
          <div
            style={{
              width: 300,
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <select
              style={{
                width: 200,
                border: '1px solid black',
                height: 50,
                borderRadius: 11,
              }}
              value={this.state.userStatus}
              onChange={e => this.setState({ userStatus: e.target.value })}
            >
              <option value={'active'}>active</option>
              <option value={'inactive'}>inactive</option>
            </select>
            <Button
              style={{
                marginTop: 10,
              }}
              variant="contained"
              color="blue"
              onClick={this.updateStatus}
            >
              update
            </Button>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}
UsersListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  toggleUser: PropTypes.func.isRequired,
  resetUser: PropTypes.func.isRequired,
};

const styles = theme => ({});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(UsersListTableRow);
