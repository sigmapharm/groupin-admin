import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PersonalInfo from './PersonalInfo';
import ErrorsArea from '../../../components/ErrorsArea';

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
  title: {
    paddingBottom: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 5,
  },
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
  selectPharmacieContainer: {
    maxWidth: '360px',
    display: 'inline-flex',
    textAlign: 'center',
  },

  buttons: {
    marginLeft: '1%',
  },
  buttonajout: {
    marginLeft: '-12%',
  },
});

export function UpdateUserForm(props) {
  const { classes, errors, formData, handleFormDataChange, handleSubmit, cities } = props;
  console.log(formData);
  return (
    <div>
      <Grid className={classes.headerGridContainer} container>
        <Grid xs={12} item>
          <Typography className={classes.title} variant="h5" color="primary">
            {` `}
          </Typography>
        </Grid>
        <Grid xs={12} item>
          {errors.messages && <ErrorsArea prefix="Vous avez les erreurs suivantes" errors={errors.messages} />}
        </Grid>
      </Grid>
      <Grid className={classes.gridContainer} spacing={8} container>
        <PersonalInfo
          cities={cities}
          formData={formData}
          errors={errors.fields}
          onChange={handleFormDataChange}
          maxLength={30}
          classes={{
            userInputs: classes.inputs,
          }}
        />
        <Grid xs={12} md={6} item />
        <Grid xs={12} item />
        <Grid justify="center" container>
          <Button type="submit" variant="contained" color="primary" className={classes.buttonajout} onClick={handleSubmit}>
            Modifier
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

UpdateUserForm.defaultProps = {
  errors: {
    fields: {},
  },
};

UpdateUserForm.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object,
  formData: PropTypes.object.isRequired,
  handleFormDataChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(UpdateUserForm);
