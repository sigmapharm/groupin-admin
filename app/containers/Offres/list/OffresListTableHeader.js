import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import CustomTableCell from './CustomTableCell';

export function OffresListTableHeader({ changeHandler, cols }) {
  return (
    <TableRow>
      {cols.map(({ colName, label, order }, index) => (
        <CustomTableCell key={colName}>
          <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
            <TableSortLabel
              active
              direction={order}
              onClick={changeHandler(index)}
              style={{ color: 'white' }}
            >
              {label}
            </TableSortLabel>
          </Tooltip>
        </CustomTableCell>
      ))}
      <CustomTableCell style={{ textAlign: 'center' }}>Actions</CustomTableCell>
    </TableRow>
  );
}

export default React.memo(OffresListTableHeader);
