import React from 'react';
import * as PropTypes from 'prop-types';

import EditIcon from '@material-ui/icons/Edit';
import ResetIcon from '@material-ui/icons/SettingsBackupRestore';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Toggle from '../../../components/Toggle/Toggle';

export class UsersListTableRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { row } = this.props;
    return (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row">
          {row.firstName} {row.lastName}
        </TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.pharmacie && row.pharmacie.denomination}</TableCell>
        <TableCell>{row.role}</TableCell>
        <TableCell>
          <EditIcon color="primary" />
          <Toggle />
          <ResetIcon color="primary" />
        </TableCell>
      </TableRow>
    );
  }
}

UsersListTableRow.defaultProps = {};

UsersListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
};

export default UsersListTableRow;
