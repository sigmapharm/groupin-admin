import React from 'react';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import SingleAutoCompleteSelect from '../../AutoCompleteSelect';
import ErrorsArea from '../../ErrorsArea';
import ArticleInfo from './ArticleInfo';
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
  selectLaboratoireContainer: {
    maxWidth: '360px',
    display: 'inline-flex',
    textAlign: 'center',
  },
  buttons: {
    marginLeft: '1%',
  },
  buttonajout: {
    marginLeft: '-22%',
  },
});

export function AddArticleForm(props) {
  const {
    editMode,
    classes,
    errors,
    laboratoires,
    formData,
    handleFormDataChange,
    handleLaboratoireSelectChange,
    handleAddLaboratoireClick,
    handleSubmit,
    handleAnuler,
  } = props;
  return (
    <Paper className={classes.paper}>
      <Grid className={classes.headerGridContainer} container>
        <Grid xs={12} className={classes.title} item>
          <Typography variant="h5" color="primary">
            {`Informations d'articles`}
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <ErrorsArea
            variant="success"
            prefix="Vous avez les erreurs suivantes"
            errors={errors.messages}
          />
        </Grid>
      </Grid>
      <Grid className={classes.gridContainer} spacing={8} container>
        <ArticleInfo
          formData={formData}
          errors={errors.fields}
          onChange={handleFormDataChange}
          maxLength={30}
          classes={{
            articleInputs: classes.inputs,
          }}
        />
        <Grid
          {...(editMode ? {} : {className:classes.selectLaboratoireContainer})}

          xs={12}
          md={6}
          item
        >
          {editMode ? (
            <>
              <Typography color="textSecondary">Laboratoire</Typography>
              <span>{_.get(formData, 'laboratoire.nom')}</span>
            </>
          ) : (
            <>
              <SingleAutoCompleteSelect
                className={classes.select}
                name="laboratoire"
                options={laboratoires}
                onChange={handleLaboratoireSelectChange}
                value={formData.laboratoire}
                placeholder="Laboratoire"
                isClearable
              />
              <Grid xs={1} item>
                <Fab
                  size="small"
                  color="primary"
                  onClick={handleAddLaboratoireClick}
                >
                  <AddIcon />
                </Fab>
              </Grid>
            </>
          )}
        </Grid>
        <Grid xs={12} md={6} item />
        <Grid xs={12} item />
        <Grid justify="center" container>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.buttonajout}
            onClick={handleSubmit}
          >
            {editMode ? 'Mettre à jour' : 'Valider'}
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={handleAnuler}
          >
            Annuler
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

AddArticleForm.defaultProps = {};

AddArticleForm.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  laboratoires: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      nom: PropTypes.string,
    }),
  ).isRequired,
  formData: PropTypes.object.isRequired,
  handleFormDataChange: PropTypes.func.isRequired,
  handleLaboratoireSelectChange: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  handleAddLaboratoireClick: PropTypes.func,
};

export default withStyles(styles)(AddArticleForm);
