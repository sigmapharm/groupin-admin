import { TablePagination } from '@material-ui/core';
import React from 'react';
import OffresListTableFooterActions from '../../../Offres/list/OffresListTableFooterActions';
const Pagination = ({
  page,
  rowsPerPage,
  totalElements,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        count={totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{ native: true }}
        labelRowsPerPage="command par page:"
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        style={{ display: 'flex', flexWrap: 'wrap' }}
        ActionsComponent={() => null}
      />

      <OffresListTableFooterActions
        onChangePage={handleChangePage}
        page={page}
        rowsPerPage={rowsPerPage}
        count={totalElements}
      />
    </div>
  );
};

export default Pagination;
