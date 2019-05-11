import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ErrorsArea from '../../ErrorsArea';
import  OffreInfo  from './OffreInfo';
import SingleAutoCompleteSelect from '../../AutoCompleteSelect';
import ArticlesListTableHeader from './ArticlesHeader';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import AticlesListTableRow from './ArticlesRow';
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
  title: { marginLeft: '-120px', },
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
  buttons:{
    marginLeft:'1%',
  },
  buttonajout:{
    marginLeft:'-22%',
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
    minWidth:500,
    marginTop:'2%',
    marginLeft:'-2%',
    textAlign:'center',
    marginRight:'27%',

  },
  infoArticle:{
    marginTop:'2%',
    marginLeft:'-2%',
    scrollMarginBottom:'-2%',
},


});



export function AddOffreForm(props) {
  const {
    classes,
    errors,
    formData,
    handleFormDataChange,
    handleSubmit,
    laboratoires,
    handleLaboratoireSelectChange,
    rows,

  } = props;
  return (
    <Paper className={classes.paper}>
      <Grid className={classes.headerGridContainer} container>
        <Grid xs={12}  className={classes.title} item>
          <Typography  variant="h5" color="secondary">
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
        />
        <Grid className={classes.selectLaboratoireContainer} xs={12} md={6} item>
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
        <Grid className={classes.gridContainer}spacing={8} container>
          <Typography  variant="h5" color="secondary" className={classes.infoArticle}>
            {`Articles de l'offre`}</Typography>
        </Grid>
    <Grid className={classes.gridContainer}spacing={8} container>
          <Table className={classes.table}>
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
           {rows &&
              rows.map(row => <AticlesListTableRow key={row.id} row={row} />)}
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
            onClick={handleSubmit}>
            Valider
          </Button>
        </Grid></Grid></Paper> );}

AddOffreForm.defaultProps = {};

AddOffreForm.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  handleFormDataChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddOffreForm);
