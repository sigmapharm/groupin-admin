import React from 'react';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import Pageable from "./pageable"

export default ({ onChangePage, onChangeRowsPerPage,totalElements,pageSize,pageNumber}) => (
  <TableRow>
    <TablePagination
      rowsPerPageOptions={[10, 25, 50]}
      colSpan={3}
      count={totalElements}
      rowsPerPage={pageSize}
      page={pageNumber}
      SelectProps={{
        native: true,
      }}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      ActionsComponent={Pageable}
      labelRowsPerPage="Nombre d'offres par page : "
      labelDisplayedRows={({ from, to, count }) =>
        `De ${from} à ${to} sur ${count}`
      }
    />
  </TableRow>
);
