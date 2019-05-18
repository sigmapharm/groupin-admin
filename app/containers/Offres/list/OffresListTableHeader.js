import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export class OffresListTableHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TableRow>
        <TableCell>Désignation</TableCell>
        <TableCell>Laboratoire</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Objectif atteint (MAD)</TableCell>
        <TableCell>TimeLine</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    );
  }
}

OffresListTableHeader.defaultProps = {};
export default OffresListTableHeader;
