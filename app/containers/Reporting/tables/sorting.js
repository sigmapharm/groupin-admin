import React from 'react';

import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';

import Tooltip from '@material-ui/core/Tooltip';

import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import cols from './cols';
import { withStyles } from '@material-ui/core';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, classes } = this.props;

    return (
      <TableHead>
        <TableRow className={classes.tableHead}>
          {cols.map((col, index) => (
            <TableCell key={index} sortDirection={orderBy === col.id ? order : false}>
              <Tooltip title="Sort" enterDelay={300}>
                <TableSortLabel
                  style={{ color: '#fff' }}
                  active={orderBy === col.id}
                  direction={order}
                  onClick={this.createSortHandler(col.id)}
                >
                  {col.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

const styles = theme => ({
  tableHead: {
    backgroundColor: theme.palette.primary.main,
  },
});

export default withStyles(styles)(EnhancedTableHead);
