import React, { forwardRef } from 'react';
import _ from 'lodash';
import TableHead from '@material-ui/core/TableHead/TableHead';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableFooter from '@material-ui/core/TableFooter/TableFooter';
import Headers from './headers';
import EmptyBody from './emptyBody';
import Footer from './footer/index';
import { withStyles } from '@material-ui/core';

function DataTable(props) {
  const {
    headers = [],
    onChangePage,
    onChangeRowPerPage,
    totalElements,
    pageSize,
    pageNumber,
    pageable = true,
    children: body,
    emptyMsg,
    tableRef,
    classes,
  } = props;

  return (
    <Table>
      <TableHead className={classes.tableHead}>
        <Headers headers={headers} />
      </TableHead>
      <TableBody>{!_.isEmpty(body) ? body : <EmptyBody emptyMsg={emptyMsg} colSpan={headers.length} />}</TableBody>
      {pageable && (
        <TableFooter>
          <Footer
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowPerPage}
            totalElements={totalElements}
            pageSize={pageSize}
            pageNumber={pageNumber}
          />
        </TableFooter>
      )}
    </Table>
  );
}

const styles = theme => ({
  tableHead: {
    backgroundColor: theme.palette.primary.main,
  },
});

export default withStyles(styles)(DataTable);
