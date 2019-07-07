import React from 'react';
import _ from 'lodash';
import TableHead from '@material-ui/core/TableHead/TableHead';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableFooter from '@material-ui/core/TableFooter/TableFooter';
import Headers from './headers';
import EmptyBody from './emptyBody';
import Footer from './footer/index';

export default ({
  headers = [],
  onChangePage,
  onChangeRowPerPage,
  totalElements,
  pageSize,
  pageNumber,
  pageable=true,
  children: body,
}) => (
  <Table>
    <TableHead>
      <Headers headers={headers} />
    </TableHead>
    <TableBody>
      {!_.isEmpty(body) ? body : <EmptyBody colSpan={headers.length} />}
    </TableBody>
    {pageable && <TableFooter>
      <Footer
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowPerPage}
        totalElements={totalElements}
        pageSize={pageSize}
        pageNumber={pageNumber}
      />
    </TableFooter>}
  </Table>
);
