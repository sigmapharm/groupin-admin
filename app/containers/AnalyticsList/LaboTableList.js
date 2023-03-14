import { Paper, Table, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { DataTableBody } from './TableBody';
import { LaboDataTableBody } from './LaboTableBody';

export const LaboTableList = ({ cols, list, classes }) => {
  const parentRef = React.useRef();

  return (
    <Paper className={classes.root} style={{ height: 500, overflow: 'auto' }}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            {cols.map(({ colName, label }, index) => (
              <TableCell
                key={colName}
                style={{
                  width: 70,
                  padding: 0,
                  color: '#fff',
                  borderLeft: '1px solid #fff',
                  textAlign: 'center',
                }}
              >
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <LaboDataTableBody rows={list} />
      </Table>
    </Paper>
  );
};
