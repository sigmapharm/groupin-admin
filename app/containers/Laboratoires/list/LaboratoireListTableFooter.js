import React from 'react';
import * as PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import LaboratoireListTableFooterAction from './LaboratoireListTableFooterAction';

export class LaboratoireListTableFooter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { totalElements, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } = this.props;
    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            colSpan={3}
            count={totalElements}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              native: true,
            }}
            labelRowsPerPage="Nombre des Laboratoires par page : "
            labelDisplayedRows={({ from, to, count }) => `De ${from} à ${to} sur ${count} Laboratoires`}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={LaboratoireListTableFooterAction}
          />
        </TableRow>
      </TableFooter>
    );
  }
}

LaboratoireListTableFooter.defaultProps = {};

LaboratoireListTableFooter.propTypes = {
  totalElements: PropTypes.any,
  rowsPerPage: PropTypes.any,
  page: PropTypes.any,
  handleChangePage: PropTypes.any,
  handleChangeRowsPerPage: PropTypes.any,
};

export default LaboratoireListTableFooter;
