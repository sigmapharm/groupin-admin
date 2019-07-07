import React from 'react';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';

export default React.memo(({ colSpan = 1 }) => (
  <TableRow>
    <TableCell style={{textAlign:"center"}} colSpan={colSpan}>Empty</TableCell>
  </TableRow>
));
