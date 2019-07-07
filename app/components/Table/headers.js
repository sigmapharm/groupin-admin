import React from 'react';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';

export default React.memo(({ headers }) => (
  <TableRow>
    {headers.map(({title,style}, index) => (
      <TableCell key={index}>{title}</TableCell>
    ))}
  </TableRow>
));
