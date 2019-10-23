import React from 'react';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';

export default React.memo(({ headers }) => {
  return (
    <TableRow>
      {headers.map((e, index) => (
        <TableCell key={index}>
          {e.$$typeof ? e : <span>{e.title}</span>}
        </TableCell>
      ))}
    </TableRow>
  );
});
