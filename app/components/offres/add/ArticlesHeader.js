import React from 'react';

import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

export default ({ onCheckAllChange, checkAllValue }) => (
  <TableRow>
    {/* <TableCell>
      <Checkbox onChange={onCheckAllChange} checked={checkAllValue} />
    </TableCell> */}
    <TableCell>Article Requis</TableCell>
    <TableCell>Désignation</TableCell>
    <TableCell>
      <span style={{ textDecoration: 'line-through' }}>PPH</span>
    </TableCell>
    <TableCell>PPV</TableCell>
    <TableCell>TVA(%)</TableCell>
    <TableCell>Remise(%)</TableCell>
    <TableCell>Quantité minimal</TableCell>
    <TableCell>PPH Remisè</TableCell>
  </TableRow>
);
