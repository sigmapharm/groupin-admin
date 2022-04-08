import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import { CustomTablePagination } from './Pagination';
import EnhancedTableHead, { stableSort, getSorting } from './sorting';
import _ from 'lodash';

function ReportingTable({ rows = [], classes, tableRef }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('ca');
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const isRowsReady = _.isArray(rows) ? rows : [];

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setPage(0);
    setRowsPerPage(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const _orderBy = property;
    let _order = 'desc';

    if (orderBy === property && order === 'desc') {
      _order = 'asc';
    }

    setOrder(_order);
    setOrderBy(_orderBy);
  };

  return (
    <div ref={tableRef}>
      <Paper>
        <Table>
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {stableSort(isRowsReady, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.laboName}
                  </TableCell>
                  <TableCell>{row.totalOffers}</TableCell>
                  <TableCell>{row.totalCommandes}</TableCell>
                  <TableCell>{row.totalArticalesCommandes}</TableCell>
                  <TableCell>{row.ca.toFixed(3)}</TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <CustomTablePagination
            className={classes.pag}
            rows={rows}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Table>
      </Paper>
    </div>
  );
}

const tableStyles = theme => ({
  pag: {
    // display: 'flex',
  },
});

export default withStyles(tableStyles)(ReportingTable);
