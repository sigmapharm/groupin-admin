import { Paper, Table, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { DataTableBody } from './TableBody';

const TableList = ({ cols, list, classes }) => {
  const parentRef = React.useRef();

  return (
    <Paper className={classes.root}>
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

        <DataTableBody rows={list} />
      </Table>
    </Paper>
  );
};

export default TableList;
