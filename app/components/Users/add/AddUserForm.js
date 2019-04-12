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

const styles = () => ({});

export function AddUserForm(props) {
  const {
    classes,
    errors,
    pharmacies,
    formData,
    handleFormDataChange,
    handlePharmacieSelectChange,
    handleAddPharmacieClick,
    handleSubmit,
  } = props;
  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant="h5" color="primary">
        {`Informations personnelles`}
      </Typography>
      <Grid
        className={classes.gridContainer}
        spacing={8}
        justify="center"
        alignItems="center"
        container
      >
        <Grid xs={12} item>
          <ErrorsArea
            variant="success"
            prefix="Vous avez les erreurs suivantes"
            errors={errors.messages}
          />
        </Grid>
        <PersonalInfo
          formData={formData}
          errors={errors.fields}
          onChange={handleFormDataChange}
          maxLength={30}
        />
        <Grid xs={12} md={6} item>
          {pharmacies && (
            <Grid alignContent="center" container>
              <Grid xs={11} item>
                <SingleAutoCompleteSelect
                  className={classes.select}
                  name="pharmacie"
                  options={pharmacies}
                  onChange={handlePharmacieSelectChange}
                  value={formData.pharmacie}
                  placeholder="Pharmacie"
                  isClearable
                />
              </Grid>
              <Grid xs={1} item>
                <Fab
                  size="small"
                  color="primary"
                  onClick={handleAddPharmacieClick}
                >
                  <AddIcon />
                </Fab>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid xs={12} md={6} item />
        <Grid xs={12} item />
        <Grid justify="center" container>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Valider
          </Button>
        </Grid>
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
