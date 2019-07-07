import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField/TextField';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';
import ErrorsArea from '../../ErrorsArea';
import OffreInfo from './OffreInfo';
import SingleAutoCompleteSelect from '../../AutoCompleteSelect';
import ArticlesListTableHeader from './ArticlesHeader';
import AticlesListTableRow from './ArticlesRow';
import { fields } from '../../../containers/Offres/add/validation';

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

  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  inputs: {
    maxWidth: '350px',
  },
  buttons: {
    marginLeft: '1%',
  },
  buttonajout: {
    marginLeft: '-22%',
  },
  select: {
    marginTop: theme.spacing.unit,
    maxWidth: '350px',
  },
  selectLaboratoireContainer: {
    maxWidth: '360px',
    display: 'inline-flex',
    textAlign: 'center',
  },
  table: {
    minWidth: 500,
    marginTop: '2%',
    marginLeft: '-2%',
    textAlign: 'center',
    marginRight: '27%',
  },
  infoArticle: {
    marginTop: '2%',
    marginLeft: '-2%',
    scrollMarginBottom: '-2%',
  },
  rowsEmpty: {
    textAlign: 'center',
    padding: `${theme.spacing.unit * 3}px  0px`,
  },
});

export function AddOffreForm(props) {
  const {
    classes,
    errors,
    formData,
    handleFormDataChange,
    handleSubmit,
    onCancel,
    laboratoires,
    handleLaboratoireSelectChange,
    handleArticleRowChange,
    rows,
    editMode,
  } = props;
  return (
    <Paper className={classes.paper}>
      <Grid className={classes.headerGridContainer} container>
        <Grid xs={12} className={classes.title} item>
          <Typography variant="h5" color="primary">
            {`Informations d'offres`}
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
        <OffreInfo
          formData={formData}
          errors={errors.fields}
          onChange={handleFormDataChange}
          maxLength={30}
          classes={{
            offreInputs: classes.inputs,
          }}
        >
          <Grid xs={12} md={6} item>
            {!editMode ? (
              <SingleAutoCompleteSelect
                className={classes.select}
                name="laboratoire"
                options={laboratoires}
                onChange={handleLaboratoireSelectChange}
                value={formData.laboratoire}
                placeholder="Laboratoire"
                isClearable
              />
            ) : (
              <>
                <Typography color="textSecondary">Laboratoire</Typography>
                <span>
                  {formData.laboratoryName}
                </span>
              </>
            )}
          </Grid>
        </OffreInfo>

        <Grid className={classes.gridContainer} spacing={8} container>
          <Typography
            variant="h5"
            color="primary"
            className={classes.infoArticle}
          >
            {`Articles de l'offre`}
          </Typography>
        </Grid>
        <Grid className={classes.gridContainer} spacing={8} container>
          <Table className={classes.table} style={{ marginLeft: '9%' }}>
            <colgroup>
              <col width="1%" />
              <col width="1%" />
              <col width="1%" />
              <col width="1%" />
              <col width="5%" />
              <col width="5%" />
            </colgroup>
            <TableHead>
              <ArticlesListTableHeader />
            </TableHead>
            <TableBody>
              {rows.length != 0 ? (
                rows.map((row, index) => (
                  <AticlesListTableRow
                    index={index}
                    handleArticleRowChange={handleArticleRowChange}
                    key={row.id}
                    row={row}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell className={classes.rowsEmpty} colSpan={7}>
                    <span>Veuillez choisir une laboratoire </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
            {editMode ? 'Mettre à jour ' : 'Valider'}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={onCancel}
          >
            Annuler
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

AddOffreForm.defaultProps = {};

AddOffreForm.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  handleFormDataChange: PropTypes.func.isRequired,
  handleLaboratoireSelectChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddOffreForm);
