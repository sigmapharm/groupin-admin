import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { fields } from '../../../containers/Users/add/validation';
import SingleAutoCompleteSelect from '../../AutoCompleteSelect';

const styles = theme => ({
  userInputs: {},
  select: {
    marginTop: theme.spacing.unit,
    maxWidth: '350px',
  },
});

export function PersonalInfo(props) {
  const { formData, cities, errors, classes, onChange, maxLength, regions } = props;
  console.log(regions);
  return (
    <>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.lastName.name}
          label={fields.lastName.label}
          value={formData[fields.lastName.name]}
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
          name={fields.firstName.name}
          label={fields.firstName.label}
          value={formData[fields.firstName.name]}
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
          name={fields.cin.name}
          label={fields.cin.label}
          value={formData[fields.cin.name]}
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
          label={fields.email.label}
          value={formData[fields.email.name]}
          error={!!errors[fields.email.name]}
          onChange={onChange}
          className={classes.userInputs}
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
          value={formData[fields.tel.name]}
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
          label={fields.gsm.label}
          value={formData[fields.gsm.name]}
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
        <SingleAutoCompleteSelect
          className={classes.select}
          name={fields.ville.name}
          options={cities}
          onChange={value => {
            onChange({
              target: { name: 'ville', value },
            });
          }}
          value={formData[fields.ville.name]}
          placeholder={fields.ville.label}
          isClearable
        />

        <SingleAutoCompleteSelect
          name={fields.region.name}
          label={fields.region.label}
          value={formData[fields.region.name]}
          error={!!errors[fields.region.name]}
          options={regions}
          onChange={value => {
            onChange({
              target: { name: 'region', value },
            });
          }}
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
          label={fields.codePostal.label}
          value={formData[fields.codePostal.name]}
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
