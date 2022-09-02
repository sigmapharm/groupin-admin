import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { fields } from '../../containers/Pharmacies/add/validation';
import SingleAutoCompleteSelect from '../../components/AutoCompleteSelect';
const styles = () => ({
  pharmacieInputs: {},
});

export function PharmacieInfo(props) {
  const {
    formData,
    errors,
    classes,
    onChange,
    maxLength,
    // cities
  } = props;
  console.log(formData);
  return (
    <>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.denomination.name}
          label={fields.denomination.label}
          value={formData[fields.denomination.name]}
          error={!!errors[fields.denomination.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.pharmacieInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.adresse.name}
          label={fields.adresse.label}
          value={formData[fields.adresse.name] || ''}
          error={!!errors[fields.adresse.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.pharmacieInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>

      <Grid xs={12} md={6} item>
        <SingleAutoCompleteSelect
          className={classes.pharmacieInputs}
          name={fields.banque.name}
          options={[
            { label: 'BMCI', value: 'BMCI' },
            { label: 'BMCE', value: 'BMCE' },
            { label: 'GFI', value: 'GFI' },
            { label: 'BP', value: 'BP' },
            { label: 'AWB', value: 'AWB' },
          ]}
          error={!!errors[fields.banque.name]}
          onChange={value => {
            onChange({
              target: { name: fields.banque.name, value: value.label },
            });
          }}
          value={formData[fields.banque]}
          placeholder={fields.banque.label}
          isClearable
          fullWidth
        />
      </Grid>
      {/* <Grid xs={12} md={6} item>
        <TextField
          name={fields.banque.name}
          label={fields.banque.label}
          value={formData[fields.banque.name] || ''}
          error={!!errors[fields.banque.name]}
          onChange={onChange}
          autoComplete="off"
          className={classes.pharmacieInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid> */}

      <Grid xs={12} md={6} item>
        <TextField
          name={fields.ice.name}
          label={fields.ice.label}
          value={formData[fields.ice.name] || ''}
          error={!!errors[fields.ice.name]}
          onChange={onChange}
          autoComplete="off"
          className={classes.pharmacieInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>

      {/* <Grid xs={12} md={6} item>
        <SingleAutoCompleteSelect
          className={classes.pharmacieInputs}
          name={fields.cityName.name}
          options={cities}
          error={!!errors[fields.cityName.name]}
          onChange={value => {
            onChange({
              target: { name: fields.cityName.name, value:value.label},
            });
          }}
          value={formData[fields.cityName]}
          placeholder={fields.cityName.label}
          isClearable
          fullWidth
        /> */}
      {/* <Grid xs={12} md={6} item>
        <TextField
          name={fields.formeJuridique.name}
          label={fields.formeJuridique.label}
          value={formData[fields.formeJuridique.name] || ''}
          error={!!errors[fields.formeJuridique.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.pharmacieInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid> */}
      <Grid xs={12} md={6} item>
        <SingleAutoCompleteSelect
          className={classes.pharmacieInputs}
          name={fields.formeJuridique.name}
          options={[
            { label: 'PHYSIQUE', value: 'PHYSIQUE' },
            { label: 'SARL', value: 'SARL' },
            { label: 'AUTRE', value: 'AUTRE' },
          ]}
          error={!!errors[fields.formeJuridique.name]}
          onChange={value => {
            onChange({
              target: { name: fields.formeJuridique.name, value: value.label },
            });
          }}
          value={formData[fields.formeJuridique]}
          placeholder={fields.formeJuridique.label}
          isClearable
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.patente.name}
          label={fields.patente.label}
          value={formData[fields.patente.name] || ''}
          error={!!errors[fields.patente.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.pharmacieInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.tel.name}
          label={fields.tel.label}
          value={formData[fields.tel.name] || ''}
          error={!!errors[fields.tel.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.pharmacieInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.gsm.name}
          label={fields.gsm.label}
          value={formData[fields.gsm.name] || ''}
          error={!!errors[fields.gsm.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.pharmacieInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.numRC.name}
          label={fields.numRC.label}
          value={formData[fields.numRC.name] || ''}
          error={!!errors[fields.numRC.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.pharmacieInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.interlocuteur.name}
          label={fields.interlocuteur.label}
          value={formData[fields.interlocuteur.name] || ''}
          error={!!errors[fields.interlocuteur.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.pharmacieInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.fonction.name}
          label={fields.fonction.label}
          value={formData[fields.fonction.name] || ''}
          error={!!errors[fields.fonction.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.pharmacieInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.dateDemarrage.name}
          label={fields.dateDemarrage.label}
          value={formData[fields.dateDemarrage.name] || ''}
          error={!!errors[fields.dateDemarrage.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.pharmacieInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.dateCreation.name}
          label={fields.dateCreation.label}
          value={formData[fields.dateCreation.name] || ''}
          error={!!errors[fields.dateCreation.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.pharmacieInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
    </>
  );
}
PharmacieInfo.defaultProps = {};

PharmacieInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
};
export default withStyles(styles)(PharmacieInfo);
