import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { fields } from '../add/validation';

const styles = () => ({
  userInputs: {},
});

export function PersonalInfo(props) {
  const { formData, errors, classes, onChange, maxLength } = props;
  return (
    <>
      <Grid xs={12} md={6} item>
        <TextField
          id="standard-disabled"
          label="Nom "
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
          id="standard-disabled"
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
          id="standard-name"
          name={fields.email.name}
          label="Email"
          defaultValue={formData[fields.email.name]}
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
          id="standard-name"
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
          id="standard-disabled"
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
        <TextField
          id="standard-name"
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
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          id="standard-name"
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
