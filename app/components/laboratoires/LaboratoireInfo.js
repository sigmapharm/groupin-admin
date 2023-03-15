import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { fields } from '../../containers/Laboratoires/add/validation';
import SingleAutoCompleteSelect from '../../components/AutoCompleteSelect';
const styles = () => ({
  laboInputs: {},
});

export function LaboratoireInfo(props) {
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
          name={fields.nom.name}
          label={fields.nom.label}
          value={formData[fields.nom.name]}
          error={!!errors[fields.nom.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.laboInputs}
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
          noValidate
          autoComplete="off"
          className={classes.laboInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.website.name}
          label={fields.website.label}
          value={formData[fields.website.name] || ''}
          error={!!errors[fields.website.name]}
          onChange={onChange}
          autoComplete="off"
          className={classes.laboInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>

      <Grid xs={12} md={6} item>
        <TextField
          name={fields.description.name}
          label={fields.description.label}
          value={formData[fields.description.name] || ''}
          error={!!errors[fields.description.name]}
          onChange={onChange}
          autoComplete="off"
          className={classes.laboInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <SingleAutoCompleteSelect
          className={classes.laboInputs}
          name={fields.subscriptionType.name}
          options={[{ label: 'FREE', value: 'FREE' }, { label: 'PREMIUM', value: 'PREMIUM' }]}
          error={!!errors[fields.subscriptionType.name]}
          onChange={value => {
            onChange({
              target: { name: fields.subscriptionType.name, value: value.label },
            });
          }}
          value={formData[fields.subscriptionType]}
          placeholder={fields.subscriptionType.label}
          isClearable
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
          className={classes.laboInputs}
          // inputProps={{
          //   maxLength,
          // }}
          fullWidth
        />
      </Grid>
    </>
  );
}
LaboratoireInfo.defaultProps = {};

LaboratoireInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
};
export default withStyles(styles)(LaboratoireInfo);
