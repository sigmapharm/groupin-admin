import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export class UsersListTableHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Utilisateur</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Pharmacie</TableCell>
          <TableCell>Rôle</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

UsersListTableHeader.defaultProps = {};

export default UsersListTableHeader;
