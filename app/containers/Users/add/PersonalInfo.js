import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = () => ({
  userInputs: {},
});

export function PersonalInfo(props) {
  const { formData, errors, classes, onChange, maxLength } = props;
  return (
    <>
      <Grid xs={12} md={6} item>
        <TextField
          name="nom"
          label="Nom"
          value={formData.nom}
          error={!!errors.nom}
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
          name="prenom"
          label="Prénom"
          value={formData.prenom}
          error={!!errors.prenom}
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
          name="cin"
          label="CIN"
          value={formData.cin}
          error={!!errors.cin}
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
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          error={!!errors.email}
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
          name="telephone"
          label="Téléphone"
          type="tel"
          value={formData.telephone}
          error={!!errors.telephone}
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
          name="gsm"
          label="GSM"
          type="tel"
          value={formData.gsm}
          error={!!errors.gsm}
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
          name="ville"
          label="Ville"
          value={formData.ville}
          error={!!errors.ville}
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
          name="codePostal"
          label="Code postal"
          value={formData.codePostal}
          error={!!errors.codePostal}
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
