import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import _ from 'lodash';
import { TableSortLabel, Tooltip } from '@material-ui/core';

function ChartTable(props) {
  const { cols = [], classes, children, tableUpdate, dispatch, fromDate = '', toDate = '' } = props;

  const { pageable = {}, sort, totalPages, first, last, numberOfElements, totalElements, empty } = props;

  const [sorting, setSorting] = useState({ order: 'desc', desg: '' });
  const [pageSize, setPageSize] = useState(5);

  const handleNextPage = (event, _page) => {
    dispatch(tableUpdate(`?page=${pageable.pageNumber + 1}&size=${pageSize}&from=${fromDate}&to=${toDate}`));
  };

  const handleBackPage = (event, _page) => {
    dispatch(tableUpdate(`?page=${pageable.pageNumber - 1}&size=${pageSize}&from=${fromDate}&to=${toDate}`));
  };

  useEffect(() => {
    dispatch(tableUpdate(`?from=&to=`));
  }, []);

  const handleChangeRowsPerPage = event => {
    dispatch(tableUpdate(`?size=${event.target.value}&from=${fromDate}&to=${toDate}`));
    setPageSize(event.target.value);
  };

  const handleSorting = desg => {
    const order = sorting.order === 'desc' ? 'asc' : 'desc';

    setSorting({ order, desg });
    dispatch(tableUpdate(`?direction=${order}&field=${desg || ''}&from=${fromDate}&to=${toDate}`));
  };

  return (
    <div className={classes.container}>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            {cols.map(({ colName, label, order, orderName }, index) => (
              <TableCell key={colName}>
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active
                    direction={orderName === sorting.desg ? sorting.order : 'asc'}
                    onClick={() => handleSorting(orderName)}
                    style={{ color: 'white' }}
                  >
                    {label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={totalElements}
              rowsPerPage={numberOfElements}
              page={pageable.pageNumber}
              SelectProps={{
                native: true,
              }}
              onChangePage={handleNextPage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
                disabled: pageable.pageNumber === 0,
                onClick: handleBackPage,
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
                disabled: pageable.pageNumber === parseInt(totalPages - 1) ? true : false,
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

const styles = theme => ({
  container: {
    marginTop: 30,
    overflowX: 'auto',
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
});

export default withStyles(styles)(ChartTable);
