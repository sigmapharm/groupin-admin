import React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Delete from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField/TextField';
import Grid from '@material-ui/core/Grid/Grid';
import { fields } from '../../../containers/Offres/add/validation';

export class AticlesListTableRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { row, handleArticleRowChange, index } = this.props;
    return (
      <TableRow key={row.id}>
        {/*  <TableCell component="th" scope="row">
          <Checkbox
            onChange={({ target: { checked } }) =>
              handleArticleRowChange({
                discount: row.discount,
                minQuantity: row.minQuantity,
                index,
                selected: checked,
              })
            }
            checked={!!row.selected}
          /> 
        </TableCell>*/}
        <TableCell>{row.nom}</TableCell>
        <TableCell>{row.pph.toFixed(2)}</TableCell>
        <TableCell>{row.ppv.toFixed(2)}</TableCell>
        <TableCell>{row.tva}</TableCell>
        <TableCell>
          <TextField
            name={fields.discount.name}
            label={fields.discount.label}
            value={row.discount || ''}
            type={fields.discount.type}
            onChange={({ target: { value } }) =>
              handleArticleRowChange({
                discount: +value,
                minQuantity: row.minQuantity,
                selected: !!value,
                index,
              })
            }
            autoComplete="off"
            inputProps={
              { maxLength: 100 } // disabled={!row.selected}
            }
            fullWidth
          />
        </TableCell>
        <TableCell>
          <TextField
            name={fields.quantiteMin.name}
            label={fields.quantiteMin.label}
            value={row.minQuantity || ''}
            type={fields.quantiteMin.type}
            onChange={({ target: { value } }) =>
              handleArticleRowChange({
                minQuantity: +value,
                discount: row.discount,
                //selected: row.selected,
                index,
              })
            }
            autoComplete="off"
            inputProps={
              { maxLength: 100 } //disabled={!row.selected}
            }
            fullWidth
          />
        </TableCell>
        <TableCell>
          {(row.discount
            ? row.pph * (1 - (row.discount || 0) / 100)
            : 0
          ).toFixed(2)}
        </TableCell>
      </TableRow>
    );
  }
}
AticlesListTableRow.defaultProps = {};

AticlesListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
};

export default AticlesListTableRow;
