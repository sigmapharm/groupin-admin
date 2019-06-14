import React from 'react';
import * as PropTypes from 'prop-types';
import Search from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import ResetIcon from '@material-ui/icons/SettingsBackupRestore';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import UserListConsult from '../consultlistuser/UserListConsult';
import { updateUser } from '../actions';
import authenticated from '../../HOC/authenticated/authenticated';
import UpdateUserForm from '../Edit/UpdateUserForm';

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
    const { row } = this.state;
    this.setState({
      formData: { ...row },
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
    this.props.dispatch(updateUser(formData));
  };

  closeDetails = () => {
    this.setState({
      ...initialState,
    });
  };

  toggle = e => {
    this.props.toggleUser(e.target.checked);
  };

  closeEditMode = () => {
    this.setState({
      ...initialState,
    });
  };

  render() {
    const { row } = this.props;
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
            <Tooltip placement="top" title="Rénitialiser mot de passe">
              <IconButton style={{ padding: 5 }}>
                <ResetIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Switch
              checked={row.enabled}
              onChange={this.toggle}
              value={row.enabled}
              color="primary"
            />
          </TableCell>
        </TableRow>
        {detailsOpen && (
          <Dialog maxWidth="lg" onClose={this.handleClose} open>
            <MuiDialogTitle disableTypography>
              <Typography variant="h5" color="primary">
                {`Details Utilisateur`}
                <IconButton
                  color="primary"
                  aria-label="Close"
                  style={closeButton}
                  onClick={this.closeDetails}
                >
                  <CloseIcon />
                </IconButton>
              </Typography>
            </MuiDialogTitle>
            <MuiDialogContent>
              <UserListConsult row={row} />
            </MuiDialogContent>
          </Dialog>
        )}
        {editMode && (
          <Dialog maxWidth="lg" onClose={this.handleClose} open>
            <MuiDialogTitle disableTypography>
              <Typography variant="h5" color="primary">
                {`Modifier Utilisateur`}
                <IconButton
                  color="primary"
                  aria-label="Close"
                  style={closeButton}
                  onClick={this.closeEditMode}
                >
                  <CloseIcon />
                </IconButton>
              </Typography>
            </MuiDialogTitle>
            <MuiDialogContent>
              <UpdateUserForm formData={row} />
            </MuiDialogContent>
          </Dialog>
        )}
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch,
});
UsersListTableRow.defaultProps = {};
const withConnect = connect(mapDispatchToProps);

UsersListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  toggleUser: PropTypes.func.isRequired,
};

export default compose(
  withConnect,
  authenticated,
)(UsersListTableRow);
