import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { fields } from '../../../containers/Users/add/validation';

const styles = () => ({
  userInputs: {},
});

export function PersonalInfo(props) {
  const { formData, errors, classes, onChange, maxLength } = props;
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
          inputProps={{
            maxLength,
          }}
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
        <TextField
          name={fields.ville.name}
          label={fields.ville.label}
          value={formData[fields.ville.name]}
          error={!!errors[fields.ville.name]}
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
