import React from 'react';

import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';
import Header from '../../../containers/AppHeader/Header';


export class ArticlesListTableHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TableRow>
        <TableCell></TableCell>
        <TableCell>Désignation</TableCell>
        <TableCell>PPH</TableCell>
        <TableCell>PPV</TableCell>
        <TableCell>TVA</TableCell>
        <TableCell>Remise</TableCell>
        <TableCell>PPH Remisè</TableCell>
     </TableRow>

    );
  }
}

ArticlesListTableHeader.defaultProps = {};

export default ArticlesListTableHeader;
