import React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Delete from  '@material-ui/icons/Delete';


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
          <Delete color="error" />
        </TableCell>
        <TableCell>{row.nom}</TableCell>
        <TableCell>{row.pph.toFixed(2)}</TableCell>
        <TableCell>{row.ppv.toFixed(2)}</TableCell>
        <TableCell>{row.tva}</TableCell>
        <TableCell>{}</TableCell>
        <TableCell>{}</TableCell>
      </TableRow>
    );
  }
}
AticlesListTableRow.defaultProps = {};

AticlesListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
};

export default  AticlesListTableRow;
