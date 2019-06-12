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
import Toggle from '../../../components/Toggle/Toggle';
import UserListConsult from '../consultlistuser/UserListConsult';
import { updateUser } from '../actions';
import authenticated from '../../HOC/authenticated/authenticated';

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
};

export class UsersListTableRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      detailsOpen: false,
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

  edit = () => {
    this.setState({
      detailsOpen: true,
    });
  };

  handleEditclose = () => {
    this.setState({
      detailsOpen: false,
    });
  };

  handleSubmitEdit = e => {
    e.preventDefault();
    const { formData } = this.state;
    this.props.dispatch(updateUser(formData));
  };

  closeDetails = () => {
    this.setState({
      detailsOpen: false,
    });
  };

  render() {
    const { row } = this.props;
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
            <IconButton style={{ padding: 5 }}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton style={{ padding: 5 }}>
              <Search color="secondary" onClick={this.edit} />
            </IconButton>
            <Toggle />
            <IconButton style={{ padding: 5 }}>
              <ResetIcon color="primary" />
            </IconButton>
          </TableCell>
        </TableRow>
        {this.state.detailsOpen && (
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
};

export default compose(
  withConnect,
  authenticated,
)(UsersListTableRow);
