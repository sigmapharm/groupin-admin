import React from 'react';
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
import  ArticleInfo  from './ArticleInfo';


const styles = () => ({
  root: {},
  paper: {},
  title: {},
  gridContainer: {},
  divider: {},
  select: {},
  closeButton: {},

});

export function AddArticleForm(props) {
  const {
    classes,
    errors,
    laboratoires,
    formData,
    handleFormDataChange,
    handleLaboratoireSelectChange,
    handleAddLaboratoireClick,
    handleSubmit,
  } = props;
  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant="h5" color="primary">
        {`Informations D'article`}
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
        <ArticleInfo
          formData={formData}
          errors={errors.fields}
          onChange={handleFormDataChange}
          maxLength={30}
        />

        <Grid xs={12} md={6} item>
          {laboratoires && (
            <Grid alignContent="center" container>
              <Grid xs={11} item>
                <SingleAutoCompleteSelect
                  className={classes.select}
                  name="laboratoire"

                  options={laboratoires}
                  onChange={handleLaboratoireSelectChange}
                  value={formData.laboratoire}
                  placeholder="Laboratoire"
                  isClearable
                />
              </Grid>
              <Grid xs={1} item>
                <Fab
                  size="small"
                  color="primary"
                  onClick={handleAddLaboratoireClick}
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
