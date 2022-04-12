import React from 'react';
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
  },
  errors: {
    fields: {},
    messages: {},
  },
  isSuccess: false,
  detailsOpen: false,
  editMode: false,
};

export class UsersListTableRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  edit = () => {
    const { row } = this.props;
    this.setState({
      formData: { ...row, ville: formatCityToLabelValue(row.ville) },
      editMode: true,
    });
  };

  handleFormDataChange = e => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  openDetails = () => {
    this.setState({
      detailsOpen: true,
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
    this.props.toggleUser(e.target.checked);
  };

  reset = () => {
    this.props.resetUser();
  };

  delete = () => {
    // eslint-disable-next-line react/prop-types
    this.props.deleteUser();
  };

  closeEditMode = () => {
    this.setState({
      ...initialState,
    });
  };

  render() {
    const { row, cities } = this.props;
    const { editMode, detailsOpen } = this.state;
    return (
      <React.Fragment>
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.firstName} {row.lastName}
          </TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>{row.pharmacie && row.pharmacie.denomination}</TableCell>
          <TableCell>{row.role}</TableCell>
          <TableCell>{row.lastCommand ? row.lastCommand.split('T')[0] : 'no Commands'}</TableCell>
          <TableCell style={{ padding: 0 }}>
            <Tooltip placement="top" title="Mofidier">
              <IconButton onClick={this.edit} style={{ padding: 5 }}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip placement="top" title="Consulter">
              <IconButton onClick={this.openDetails} style={{ padding: 5 }}>
                <Search color="secondary" />
              </IconButton>
            </Tooltip>
            {/* <Tooltip placement="top" title="Rénitialiser mot de passe">
              <IconButton onClick={this.reset} style={{ padding: 5 }}>
                <ResetIcon color="primary" />
              </IconButton>
            </Tooltip> */}
            <Switch checked={row.enabled} onChange={this.toggle} value={row.enabled} color="primary" />
            <Tooltip placement="top" title="Supprimer">
              <IconButton onClick={this.delete} style={{ padding: 5 }}>
                <DeleteIcon color="primary" />
              </IconButton>
            </Tooltip>
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
              <UserListConsult row={row} />
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
              />
            </MuiDialogContent>
          </Dialog>
        )}
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

export default compose(authenticated)(UsersListTableRow);
