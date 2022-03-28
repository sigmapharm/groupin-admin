import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { withStyles } from '@material-ui/core';

export class ArticlesListTableHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cols, changeHandler, classes } = this.props;
    return (
      <TableRow className={classes.tableHead}>
        {cols.map(({ colName, label, order }, index) => (
          <TableCell key={colName}>
            <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
              <TableSortLabel style={{ color: '#fff' }} active direction={order} onClick={changeHandler(index)}>
                {label}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        ))}
        <TableCell style={{ color: '#fff' }}>Actions</TableCell>
      </TableRow>
    );
  }
}

const styles = theme => ({
  tableHead: {
    backgroundColor: theme.palette.primary.main,
  },
});

export default withStyles(styles)(ArticlesListTableHeader);
