import React from 'react';
import * as PropTypes from 'prop-types';
import  Delete from  '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


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
        <TableCell>{row.pph.toFixed(4)}</TableCell>
        <TableCell>{row.ppv.toFixed(4)}</TableCell>
        <TableCell>{row.tva}{"%"}</TableCell>
        <TableCell>
          <EditIcon color="primary" />
          <Delete color="primary" />
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
