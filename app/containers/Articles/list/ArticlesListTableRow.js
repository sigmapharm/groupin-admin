import React from 'react';
import * as PropTypes from 'prop-types';
import  Delete from  '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { getArticlesList } from '../actions';




const addCommas = ( nStr) => {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};

export class AticlesListTableRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    const { row } = this.props;

    return (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row">
          {row.laboratoire && row.laboratoire.nom}
        </TableCell>
        <TableCell>{row.categorie}</TableCell>
        <TableCell>{row.nom}</TableCell>
        <TableCell>{addCommas(row.pph.toFixed(2)).replace(/,/g," ").replace(".",",")}</TableCell>
        <TableCell>{ addCommas(row.ppv.toFixed(2)).replace(/,/g," ").replace(".",",")}</TableCell>
        <TableCell>{row.tva}{"%"}</TableCell>
        <TableCell>
          <EditIcon color="primary" />
          <Delete color="error" />
        </TableCell>
      </TableRow>
    );
  }
}
AticlesListTableRow.defaultProps = {};

AticlesListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
};

export default  AticlesListTableRow;
