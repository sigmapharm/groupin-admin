import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export class ArticlesListTableHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cols , changeHandler } = this.props
    return (
      <TableRow>
        {cols.map(({ colName, label, order }, index) => (
          <TableCell key={colName}>
            <Tooltip
              title="Sort"
              placement="bottom-start"
              enterDelay={300}
            >
              <TableSortLabel
                active
                direction={order}
                onClick={changeHandler(index)}
              >
                {label}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        ))}
        <TableCell>Actions</TableCell>
      </TableRow>
    );
  }
}


export default ArticlesListTableHeader;
