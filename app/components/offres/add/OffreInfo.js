import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {fields} from '../../../containers/Offres/add/validation';

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
  const { formData, errors, classes, onChange, maxLength} = props;
  return (
    <>
      <Grid xs={12} md={6} item>
        <TextField
          required={true}
          name={fields.designation.name}
          label={fields.designation.label}
          value={formData[fields.designation.name]}
          error={!!errors[fields.designation.name]}
          onChange={onChange}
          noValidate autoComplete="off"
          className={classes.offreInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth

        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          required={true}
          name={fields.status.name}
          label={fields.status.label}
          value={formData[fields.status.name]}
          error={!!errors[fields.status.name]}
          onChange={onChange}
          noValidate autoComplete="off"
          className={classes.offreInputs}
          inputProps={{
            maxLength,

          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          required={true}
          noValidate autoComplete="off"
          name={fields.dateDebut.name}
         // fields.dateDebut.label
          label={"Date Début"}
          value={formData[fields.dateDebut.name]}
          error={!!errors[fields.dateDebut.name]}
          onChange={onChange}
          type={fields.dateDebut.type}
          className={classes.offreInputs}

          InputLabelProps={{
            shrink:true,
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          required={true}
          name={fields.quantiteMin.name}
          label={fields.quantiteMin.label}
          value={formData[fields.quantiteMin.name]}
          error={!!errors[fields.quantiteMin.name]}
          onChange={onChange}
          noValidate autoComplete="off"
          className={classes.offreInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
 <Grid xs={12} md={6} item>
       <TextField
          required={true}
          noValidate autoComplete="off"
          name={fields.dateFin.name}
          label={fields.dateFin.label}
          value={formData[fields.dateFin.name]}
          error={!!errors[fields.dateFin.name]}
          onChange={onChange}
          type={fields.dateFin.type}
          className={classes.offreInputs}
          InputLabelProps={{
            maxLength,
            shrink:true,
         }}

          fullWidth
        />

      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          required={true}
          name={fields.montant.name}
          label={fields.montant.label}
          value={formData[fields.montant.name]}
          error={!!errors[fields.montant.name]}
          onChange={onChange}
          noValidate autoComplete="off"
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
          noValidate autoComplete="off"
          name={fields.montantMax.name}
          label={fields.montantMax.label}
          value={formData[fields.montantMax.name]}
          onChange={onChange}
          className={classes.offreInputs}
          inputProps={{
            maxLength,
          }}

          fullWidth
        />
      </Grid>

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
