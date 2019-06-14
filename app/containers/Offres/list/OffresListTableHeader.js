import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export function OffresListTableHeader() {
  return (
    <TableRow>
      <TableCell>Titre</TableCell>
      <TableCell>Laboratoire</TableCell>
      <TableCell>Date de début</TableCell>
      <TableCell>Date de fin</TableCell>
      <TableCell style={{ textAlign: 'center' }}>Actions</TableCell>
    </TableRow>
  );
}

export default React.memo(OffresListTableHeader);
