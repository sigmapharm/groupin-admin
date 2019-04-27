import React from 'react';
import * as PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import ArticlesListTableFooterActions from './ArticlesListTableFooterAction';

export class ArticlesListTableFooter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      totalElements,
      rowsPerPage,
      page,
      handleChangePage,
      handleChangeRowsPerPage,
    } = this.props;
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
            labelRowsPerPage="Nombre d'article par page : "
            labelDisplayedRows={({ from, to, count }) =>
              `De ${from} à ${to} sur ${count} articles`
            }
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={ArticlesListTableFooterActions}
          />
        </TableRow>
      </TableFooter>
    );
  }
}

ArticlesListTableFooter.defaultProps = {};

ArticlesListTableFooter.propTypes = {
  totalElements: PropTypes.any,
  rowsPerPage: PropTypes.any,
  page: PropTypes.any,
  handleChangePage: PropTypes.any,
  handleChangeRowsPerPage: PropTypes.any,
};

export default  ArticlesListTableFooter;
