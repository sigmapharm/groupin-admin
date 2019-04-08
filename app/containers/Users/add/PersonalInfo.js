import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { fields } from './validation';

const styles = () => ({
  userInputs: {},
});

export function PersonalInfo(props) {
  const { formData, errors, classes, onChange, maxLength } = props;
  return (
    <>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.nom.name}
          label={fields.nom.label}
          value={formData[fields.nom.name]}
          error={!!errors[fields.nom.name]}
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
          name={fields.prenom.name}
          label={fields.prenom.label}
          value={formData[fields.prenom.name]}
          error={!!errors[fields.prenom.name]}
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
          name={fields.telephone.name}
          label={fields.telephone.label}
          value={formData[fields.telephone.name]}
          error={!!errors[fields.telephone.name]}
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
