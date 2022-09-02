import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { fields } from '../../../containers/Providers/add/validation';
import SingleAutoCompleteSelect from '../../AutoCompleteSelect';
const styles = () => ({
  providerInputs: {},
});

export function ProviderInfo(props) {
  const { formData, errors, classes, onChange, maxLength, cities } = props;
  console.log(formData[fields.cityName.name]);
  console.log('!!errors[fields.cityName.name]', !!errors[fields.cityName.name]);
  return (
    <>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.fullName.name}
          label={fields.fullName.label}
          value={formData[fields.fullName.name]}
          error={!!errors[fields.fullName.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.providerInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.phone.name}
          label={fields.phone.label}
          value={formData[fields.phone.name] || ''}
          error={!!errors[fields.phone.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.providerInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.fax.name}
          label={fields.fax.label}
          value={formData[fields.fax.name] || ''}
          error={!!errors[fields.fax.name]}
          onChange={onChange}
          autoComplete="off"
          className={classes.providerInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>

      <Grid xs={12} md={6} item>
        <TextField
          name={fields.email.name}
          label={fields.email.label}
          value={formData[fields.email.name] || ''}
          error={!!errors[fields.email.name]}
          onChange={onChange}
          autoComplete="off"
          className={classes.providerInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <SingleAutoCompleteSelect
          className={classes.providerInputs}
          name={fields.cityName.name}
          error={!!errors[fields.cityName.name]}
          onChange={value => {
            onChange({
              target: { name: fields.cityName.name, value: value.label },
            });
          }}
          value={formData[fields.cityName.label]}
          placeholder={fields.cityName.label}
          options={cities}
          isClearable
          fullWidth
        />
        {/* <Grid xs={12} md={6} item> */}
        {/* <TextField
          name={fields.cityName.name}
          label={fields.cityName.label}
          value={formData[fields.cityName.name] || ''}
          error={!!errors[fields.cityName.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.providerInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        /> */}
      </Grid>
    </>
  );
}
ProviderInfo.defaultProps = {};

ProviderInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
};
export default withStyles(styles)(ProviderInfo);
