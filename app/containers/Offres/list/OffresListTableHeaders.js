import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export class OffresListTableHeaders extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TableRow>
        <TableCell>Désignation</TableCell>
        <TableCell>TimeLine</TableCell>
        <TableCell>Fin de l'offre</TableCell>
        <TableCell>Details </TableCell>
        <TableCell>Commander</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    );
  }
}

OffresListTableHeaders.defaultProps = {};

export default OffresListTableHeaders;
