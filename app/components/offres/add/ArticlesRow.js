import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Delete from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField/TextField';
import Grid from '@material-ui/core/Grid/Grid';
import { fields } from '../../../containers/Offres/add/validation';
import { RowCheckBox } from '../../RowCheckBox';
import moment from 'moment';

export const AticlesListTableRow = props => {
  const { row, handleArticleRowChange, editMode, isOffreStart } = props;

  const [discount, setDiscount] = useState(row.discount);
  const [minQuantity, setMinQuantity] = useState(row.minQuantity);
  const [isChecked, setIsChecked] = React.useState(row.required);
  useEffect(
    () => {
      handleArticleRowChange({
        discount: Number(discount),
        minQuantity: Number(minQuantity),
        selected: discount && minQuantity,
        required: isChecked,
        index: row.writeIndex,
        id: row.id,
      });
    },
    [discount, minQuantity, isChecked],
  );

  console.log('isOffreStart', isOffreStart);

  return (
    <TableRow key={row.id} style={discount && minQuantity ? { backgroundColor: '#4d609c70' } : {}}>
      <TableCell>{row.nom}</TableCell>
      <TableCell>{row.pph.toFixed(2)}</TableCell>
      <TableCell>{row.ppv.toFixed(2)}</TableCell>
      <TableCell>{row.tva}</TableCell>
      <TableCell>
        <TextField
          disabled={isOffreStart ? true : editMode}
          name={fields.discount.name}
          label={fields.discount.label}
          value={discount}
          type={fields.discount.type}
          onChange={({ target: { value } }) => {
            setDiscount(value);
          }}
          autoComplete="off"
          inputProps={{ maxLength: 100 }}
          fullWidth
        />
      </TableCell>
      <TableCell>
        <TextField
          disabled={isOffreStart ? true : editMode}
          name={fields.quantiteMin.name}
          label={fields.quantiteMin.label}
          value={minQuantity}
          type={fields.quantiteMin.type}
          onChange={({ target: { value } }) => {
            setMinQuantity(value);
          }}
          autoComplete="off"
          inputProps={
            { maxLength: 100 }
            //disabled={!row.selected}
          }
          fullWidth
        />
      </TableCell>
      <TableCell>{(row.discount ? row.pph * (1 - (row.discount || 0) / 100) : 0).toFixed(2)}</TableCell>

      {
        <TableCell component="th" scope="row">
          <Checkbox
            helperText="Veuillez remplir les champs vides"
            disabled={isOffreStart ? true : !(discount && minQuantity)}
            onChange={({ target: { checked } }) => setIsChecked(checked)}
            checked={isChecked}
          />
        </TableCell>
      }
    </TableRow>
  );
};

AticlesListTableRow.defaultProps = {};

AticlesListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
};

export default AticlesListTableRow;
