import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
import IconButton from '@material-ui/core/IconButton/IconButton';
import DeleteIcon from '@material-ui/icons/ArrowDropDown';
import { fields } from '../../../containers/Offres/add/validation';

const styles = () => ({
  offreInputs: {},
  specialProps: {
    InputLabelProps: {
      shrink: true,
    },
    style: {
      width: '100%',
    },
    label: 'Date Fin',
  },
});
export function OffreInfo(props) {
  const {
    formData,
    errors,
    classes,
    onChange,
    maxLength,
    children,
    disableAllWithoutDate,
    disableAll,
  } = props;
  const disable = disableAllWithoutDate || disableAll;
  return (
    <>
      <Grid xs={12} md={6} item>
        <TextField
          required
          name={fields.designation.name}
          label={fields.designation.label}
          value={formData[fields.designation.name]}
          error={!!errors[fields.designation.name]}
          onChange={onChange}
          noValidate
          disabled={disable}
          autoComplete="off"
          className={classes.offreInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          required
          noValidate
          autoComplete="off"
          name={fields.dateDebut.name}
          // fields.dateDebut.label
          disabled={disable}
          label={fields.dateDebut.label}
          value={formData[fields.dateDebut.name]}
          error={!!errors[fields.dateDebut.name]}
          onChange={onChange}
          type={fields.dateDebut.type}
          className={classes.offreInputs}
          InputLabelProps={{
            shrink: true,
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          required
          noValidate
          autoComplete="off"
          disabled={disableAll}
          name={fields.dateFin.name}
          label={fields.dateFin.label}
          value={formData[fields.dateFin.name]}
          error={!!errors[fields.dateFin.name]}
          onChange={onChange}
          type={fields.dateFin.type}
          className={classes.offreInputs}
          InputLabelProps={{
            maxLength,
            shrink: true,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          required
          name={fields.montant.name}
          label={fields.montant.label}
          value={formData[fields.montant.name]}
          error={!!errors[fields.montant.name]}
          onChange={onChange}
          disabled={disable}
          noValidate
          autoComplete="off"
          type={fields.montant.type}
          className={classes.offreInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          noValidate
          autoComplete="off"
          name={fields.montantMax.name}
          label={fields.montantMax.label}
          type={fields.montantMax.type}
          value={formData[fields.montantMax.name]}
          onChange={onChange}
          disabled={disable}
          className={classes.offreInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          noValidate
          autoComplete="off"
          name={fields.offerComment.name}
          label={fields.offerComment.label}
          value={formData[fields.offerComment.name]}
          onChange={onChange}
          className={classes.offreInputs}
          disabled={disable}
          inputProps={{
            maxLength,
          }}
          fullWidth
          multiline
          rows={1}
          rowsMax={2}
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          noValidate
          autoComplete="off"
          name={fields.globalDiscount.name}
          label={fields.globalDiscount.label}
          value={formData[fields.globalDiscount.name] || ''}
          type={fields.globalDiscount.type}
          error={!!errors[fields.globalDiscount.name]}
          onChange={onChange}
          className={classes.offreInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
          multiline
          rows={1}
          rowsMax={2}
        />
      </Grid>
      {children}
    </>
  );
}
OffreInfo.defaultProps = {};

OffreInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
};

export default withStyles(styles)(OffreInfo);
