import React from 'react';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ErrorsArea from '../ErrorsArea';
import PharmacieInfo from './PharmacieInfo';
// import { formatCityToLabelValue } from '../../../containers/Pharmacies/add/utils';
const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
  },
  paper: {
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
    paddingTop: theme.spacing.unit * 5,
  },
  title: { marginLeft: '-120px' },
  gridContainer: {
    paddingLeft: theme.spacing.unit * 15,
    paddingRight: theme.spacing.unit * 15,
  },
  headerGridContainer: {
    paddingLeft: theme.spacing.unit * 15,
    paddingRight: theme.spacing.unit * 15,
  },
  divider: {
    marginTop: theme.spacing.unit * 5,
  },
  select: {
    marginTop: theme.spacing.unit,
    maxWidth: '350px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  inputs: {
    maxWidth: '350px',
  },
  // selectPharmacieContainer: {
  //   maxWidth: '360px',
  //   display: 'inline-flex',
  //   textAlign: 'center',
  // },
  buttons: {
    marginLeft: '1%',
  },
  buttonajout: {
    marginLeft: '-22%',
  },
});

export function AddPharmacieFrom(props) {
  const {
    // cities,
    editMode,
    classes,
    errors,
    formData,
    handleFormDataChange,
    handleSubmit,
    handleAnuler,
  } = props;

  // const formattedCities = cities.map(formatCityToLabelValue)

  return (
    <Paper className={classes.paper}>
      <Grid className={classes.headerGridContainer} container>
        <Grid xs={12} className={classes.title} item>
          <Typography variant="h5" color="primary">
            {`Informations des Pharmacies`}
          </Typography>
        </Grid>
      </Grid>
      <Grid className={classes.gridContainer} spacing={8} container>
        <Grid xs={12} item>
          <ErrorsArea variant="success" prefix="Vous avez les erreurs suivantes" errors={errors.messages} />
        </Grid>
        <PharmacieInfo
          //  cities={formattedCities}
          // cities={cities}
          formData={formData}
          errors={errors.fields}
          onChange={handleFormDataChange}
          maxLength={30}
          classes={{
            pharmacieInputs: classes.inputs,
          }}
        />
      </Grid>
      <div style={{ marginTop: 10 }} />
      <Grid xs={12} md={6} item />
      <Grid xs={12} item />
      <Grid justify="center" container>
        <Button type="submit" variant="contained" color="primary" className={classes.buttonajout} onClick={handleSubmit}>
          {editMode ? 'Mettre à jour' : 'Valider'}
        </Button>

        <Button type="submit" variant="contained" color="primary" className={classes.buttons} onClick={handleAnuler}>
          Annuler
        </Button>
      </Grid>
    </Paper>
  );
}

AddPharmacieFrom.defaultProps = {};

AddPharmacieFrom.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  handleFormDataChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddPharmacieFrom);
