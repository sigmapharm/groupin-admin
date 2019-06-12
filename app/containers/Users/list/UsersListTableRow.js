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
import Toggle from '../../../components/Toggle/Toggle';
import UserListConsult from '../consultlistuser/UserListConsult';
const closeButton = { marginLeft: '59rem' };
export class UsersListTableRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // eslint-disable-next-line no-unused-vars
  edit = () => {
    this.setState({
      isdisplaydata: true,
    });
  };

  handledetailclose = () => {
    this.setState({
      isdisplaydata: false,
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
          <TableCell>
            <EditIcon color="primary" />
            <Search color="secondary" onClick={() => this.edit(row)} />
            <Toggle />
            <ResetIcon color="primary" />
          </TableCell>
        </TableRow>
        <Dialog
          maxWidth="lg"
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.isdisplaydata}
        >
          <MuiDialogTitle disableTypography>
            <Typography variant="h5" color="primary">
              {`Details Utilisateur`}{' '}
              <IconButton
                color="primary"
                aria-label="Close"
                style={closeButton}
                onClick={this.handledetailclose}
              >
                <CloseIcon />
              </IconButton>
            </Typography>
          </MuiDialogTitle>
          <MuiDialogContent>
            <UserListConsult row={row} />
          </MuiDialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

UsersListTableRow.defaultProps = {};

UsersListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
};

export default UsersListTableRow;
