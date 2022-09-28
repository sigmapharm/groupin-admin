import React from 'react';
import * as PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import PharmacieListTableFooterAction from './PharmacieListTableFooterAction';

export class PharmacieListTableFooter extends React.PureComponent {
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
            labelRowsPerPage="Nombre des Pharmacies par page : "
            labelDisplayedRows={({ from, to, count }) => `De ${from} à ${to} sur ${count} Pharmacies`}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={PharmacieListTableFooterAction}
          />
        </TableRow>
      </TableFooter>
    );
  }
}

PharmacieListTableFooter.defaultProps = {};

PharmacieListTableFooter.propTypes = {
  totalElements: PropTypes.any,
  rowsPerPage: PropTypes.any,
  page: PropTypes.any,
  handleChangePage: PropTypes.any,
  handleChangeRowsPerPage: PropTypes.any,
};

export default PharmacieListTableFooter;
