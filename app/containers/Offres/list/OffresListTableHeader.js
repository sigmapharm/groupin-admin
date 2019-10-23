import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export function OffresListTableHeader({ changeHandler, cols }) {
  return (
    <TableRow>
      {cols.map(({ colName, label, order }, index) => (
        <TableCell key={colName}>
          <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
            <TableSortLabel
              active
              direction={order}
              onClick={changeHandler(index)}
            >
              {label}
            </TableSortLabel>
          </Tooltip>
        </TableCell>
      ))}
      <TableCell style={{ textAlign: 'center' }}>Actions</TableCell>
    </TableRow>
  );
}

export default React.memo(OffresListTableHeader);
