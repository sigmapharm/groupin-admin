import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { fields } from '../add/validation';
import SingleAutoCompleteSelect from '../../../components/AutoCompleteSelect';
import { useSelectFormat } from '../../Reporting/hooks/useSelectFormat';

const styles = theme => ({
  userInputs: {},
  select: {
    marginTop: theme.spacing.unit,
    maxWidth: '350px',
  },
});

export function PersonalInfo(props) {
  const { formData, cities, errors, classes, onChange, maxLength, regions } = props;
  console.log('user', formData);
  const regionsOptions = useSelectFormat(regions, { label: 'name', value: 'code', allow: ['cities'] }, true);
  const [citiesRegion, setcitiesRegion] = useState();
  const citiesOptions = useSelectFormat(citiesRegion, { label: 'name', value: 'code' }, true);
  console.log('region logs', regions);
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedCity, setSelectedCity] = useState();

  return (
    <>
      <Grid xs={12} md={6} item>
        <TextField
          label="Nom"
          name={fields.lastName.name}
          defaultValue={formData[fields.lastName.name]}
          error={!!errors[fields.lastName.name]}
          onChange={onChange}
          className={classes.userInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          label="Prenom"
          name={fields.firstName.name}
          defaultValue={formData[fields.firstName.name]}
          error={!!errors[fields.firstName.name]}
          onChange={onChange}
          className={classes.userInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          id="standard-disabled"
          name={fields.cin.name}
          label="CIN"
          defaultValue={formData[fields.cin.name]}
          error={!!errors[fields.cin.name]}
          onChange={onChange}
          className={classes.userInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.email.name}
          label="Email"
          defaultValue={formData[fields.email.name]}
          error={!!errors[fields.email.name]}
          onChange={onChange}
          className={classes.userInputs}
          inputProps={{
            maxLength,
          }}
          disabled
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.tel.name}
          label="Tel"
          defaultValue={formData[fields.tel.name]}
          error={!!errors[fields.tel.name]}
          onChange={onChange}
          className={classes.userInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.gsm.name}
          label="GSM"
          defaultValue={formData[fields.gsm.name]}
          error={!!errors[fields.gsm.name]}
          onChange={onChange}
          className={classes.userInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        {/*
          <TextField
          name={fields.ville.name}
          label="Ville"
          defaultValue={formData[fields.ville.name]}
          error={!!errors[fields.ville.name]}
          onChange={onChange}
          className={classes.userInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />

        */}

        <SingleAutoCompleteSelect
          className={classes.select}
          name={fields.region.name}
          options={regionsOptions}
          onChange={value => {
            onChange({
              target: {
                name: 'region',
                value: {
                  id: value.id,
                  name: value.value,
                  code: value.value,
                  cities: value.cities,
                },
              },
            });
            setSelectedRegion(value);
            setcitiesRegion(value.cities);
          }}
          value={selectedRegion}
          placeholder={fields.region.label}
          isClearable
        />
        <SingleAutoCompleteSelect
          className={classes.select}
          name={fields.ville.name}
          options={citiesOptions}
          onChange={value => {
            console.log(value);
            onChange({
              target: { name: 'ville', value: { id: value.id, name: value.value, code: value.value } },
            });
            setSelectedCity(value);
          }}
          value={selectedCity}
          placeholder={fields.ville.label}
          isClearable
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.address.name}
          label="Address"
          defaultValue={formData[fields.address.name]}
          error={!!errors[fields.address.name]}
          onChange={onChange}
          className={classes.userInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.codePostal.name}
          label="Code Postale"
          defaultValue={formData[fields.codePostal.name]}
          error={!!errors[fields.codePostal.name]}
          onChange={onChange}
          className={classes.userInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
    </>
  );
}

PersonalInfo.defaultProps = {};

PersonalInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
};

export default withStyles(styles)(PersonalInfo);
