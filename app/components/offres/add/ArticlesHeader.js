import React from 'react';

import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';

export class ArticlesListTableHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TableRow>
        <TableCell />
        <TableCell>Désignation</TableCell>
        <TableCell>
          <span style={{ textDecoration: 'line-through' }}>PPH</span>
        </TableCell>
        <TableCell>PPV</TableCell>
        <TableCell>TVA(%)</TableCell>
        <TableCell>Remise(%)</TableCell>
        <TableCell>PPH Remisè</TableCell>
      </TableRow>
    );
  }
}

ArticlesListTableHeader.defaultProps = {};

export default ArticlesListTableHeader;
