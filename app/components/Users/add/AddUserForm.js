/* eslint-disable react/prop-types */
import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import PersonalInfo from './PersonalInfo';
import SingleAutoCompleteSelect from '../../AutoCompleteSelect';
import ErrorsArea from '../../ErrorsArea';
import { AddPharmacieContainer } from '../../../containers/Pharmacie/add';

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

export function AddUserForm(props) {
  const {
    cities,
    classes,
    errors,
    pharmacies,
    formData,
    handleFormDataChange,
    handlePharmacieSelectChange,
    handleAddPharmacieClick,
    handleSubmit,
    handleAnuler,
    disbaleButton,
  } = props;
  return (
    <Paper className={classes.paper}>
      <Grid className={classes.headerGridContainer} container>
        <Grid xs={12} item>
          <Typography className={classes.title} variant="h5" color="primary">
            {`Informations personnelles`}
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <ErrorsArea variant="success" prefix="Vous avez les erreurs suivantes" errors={errors.messages} />
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
        <Grid xs={12} md={6} item>
          <SingleAutoCompleteSelect
            className={classes.select}
            name="role"
            options={[{ label: 'SUPER ADMIN', value: 'SUPER_ADMIN' }, { label: 'UTILISATEUR', value: 'MEMBRE' }]}
            onChange={value => {
              handleFormDataChange({
                target: { name: 'role', value },
              });
            }}
            value={formData.value}
            placeholder="Role"
            isClearable
          />
        </Grid>
        {/* <Grid className={classes.selectPharmacieContainer} xs={12} md={6} item>
          <SingleAutoCompleteSelect
            className={classes.select}
            name="pharmacie"
            options={pharmacies}
            onChange={handlePharmacieSelectChange}
            value={formData.pharmacie}
            placeholder="Pharmacie"
            isClearable
          />
          <Fab size="small" color="primary" onClick={handleAddPharmacieClick}>
            <AddIcon />
          </Fab>
        </Grid> */}
        <Grid xs={12} item />
        {!disbaleButton && (
          <Grid justify="center" container>
            <Button type="submit" variant="contained" color="primary" className={classes.buttonajout} onClick={handleSubmit}>
              Valider
            </Button>
            <Button type="submit" variant="contained" color="primary" onClick={handleAnuler} className={classes.buttons}>
              ANNULER
            </Button>
          </Grid>
        )}
        {/* <AddPharmacieContainer
        // successCallback={this.handleAddPharmacieSuccess}
        /> */}
      </Grid>
    </Paper>
  );
}

AddUserForm.defaultProps = {};

AddUserForm.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  pharmacies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      denomination: PropTypes.string,
    }),
  ).isRequired,
  formData: PropTypes.object.isRequired,
  handleFormDataChange: PropTypes.func.isRequired,
  handlePharmacieSelectChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleAddPharmacieClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddUserForm);
