import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export class ArticlesListTableHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <TableRow>
          <TableCell>Laboratoire</TableCell>
          <TableCell>Catégorie</TableCell>
          <TableCell>Désignation</TableCell>
          <TableCell>PPH</TableCell>
          <TableCell>PPV</TableCell>
          <TableCell>TVA</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
    );
  }
}

ArticlesListTableHeader.defaultProps = {};

export default ArticlesListTableHeader;
