import React, { useState } from 'react';
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
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton/IconButton';
import FillIcon from '@material-ui/icons/ArrowDownward';
import _ from 'lodash';
import ErrorsArea from '../../ErrorsArea';
import OffreInfo from './OffreInfo';
import SingleAutoCompleteSelect from '../../AutoCompleteSelect';
import ArticlesListTableHeader from './ArticlesHeader';
import AticlesListTableRow from './ArticlesRow';
import { useEffect } from 'react';
import fuzzy from 'fuzzy';
import { Checkbox, Input } from '@material-ui/core';
import { useSelectFormat } from '../../../containers/Reporting/hooks/useSelectFormat';
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
  globalVarsContainer: {
    width: 'auto',
    display: 'flex',
    alignItems: 'flex-end',
  },
  globalVarsIcon: { padding: '10px 10px' },
});
function editOnlyDateField(editMode, formData) {
  if (formData == null) return false;
  const { dateDebut, dateFin } = formData;
  if (moment(new Date()).isBefore(dateDebut)) return false;
  return moment(new Date()).isBetween(dateDebut, dateFin);
}

function disableAll(editMode, formData) {
  if (formData == null) return false;
  const { dateFin } = formData;
  return moment(new Date()).isAfter(dateFin);
}

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
    originalFormData,
    toggleAllSelection,
    checkAllValue,
    handleGlobalVarsChange,
    applyGlobalVars,
    labName,
    regions,
    pharmacies,
  } = props;

  const [articlesRow, setArticlesRows] = useState(rows);
  const [search, setSearch] = useState('');
  const [displayRows, setDisplayRows] = useState([]);
  const [times, setTimes] = useState(0);
  const [isAllowNonSigmapharmChecked, setIsAllowNonSigmapharmChecked] = useState(false);
  const isOffreNotStart = moment(formData.dateDebut).isAfter(new Date());

  const [region, setRegion] = useState('');
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [selectedregion, setSelectedRegion] = useState();

  const regionOptions = useSelectFormat(regions, { label: 'name', value: 'id', allow: ['cities'] });
  const villeOptiosn = useSelectFormat(city, { label: 'name', value: 'id' });

  console.log('formData', formData);

  const [showBy, setShowBy] = useState({ label: formData.show_by, value: formData.show_by });

  useEffect(
    () => {
      setShowBy({ label: formData.show_by, value: formData.show_by });
      setIsAllowNonSigmapharmChecked(formData[fields.allow_non_sigmapharm.name]);
    },
    [formData],
  );

  useEffect(
    () => {
      setArticlesRows(_.map(rows, (item, index) => ({ ...item, writeIndex: index })));
      setTimes(times + 1);
      if (editMode && times < 3) {
        console.log('update display');
        setDisplayRows(_.map(rows, (item, index) => ({ ...item, writeIndex: index })));
      }
    },
    [rows],
  );
  console.log(city);
  useEffect(
    () => {
      setDisplayRows(articlesRow);
    },
    [labName],
  );

  const handleSearch = e => {
    setSearch(e.target.value);
    const list = fuzzy.filter(e.target.value, articlesRow, {
      extract: function(el) {
        return el.nom;
      },
    });

    setDisplayRows(list.map(item => item.original));
  };

  const disableAllFields = disableAll(editMode, originalFormData);
  const disableAllFieldsExceptDate = editOnlyDateField(editMode, originalFormData);
  const onGlobalVarsChange = _.debounce(handleGlobalVarsChange, 500);

  const DisplayOject = {
    City: (
      <>
        {isOffreNotStart || editMode ? (
          <div style={{ marginTop: '10px' }}>Les Ville : {formData.cityNames && formData.cityNames.join(', ')}</div>
        ) : (
          <>
            <Grid xs={12} md={6} item>
              <SingleAutoCompleteSelect
                className={classes.select}
                name="region"
                disabled={isOffreNotStart ? false : editMode}
                options={regionOptions}
                onChange={e => {
                  setCity(e.cities);
                  setSelectedRegion(e);
                }}
                value={selectedregion}
                placeholder="Region"
                isClearable
              />
            </Grid>
            <Grid xs={12} md={6} item>
              <SingleAutoCompleteSelect
                className={classes.select}
                disabled={isOffreNotStart ? false : editMode}
                name="city"
                options={villeOptiosn}
                onChange={e => {
                  setSelectedCity(e);
                  console.log(e);
                  handleFormDataChange({ target: { name: 'city', value: e.map(item => item.value) } });
                }}
                value={selectedCity}
                placeholder="Ville"
                isClearable
                isMulti
              />
            </Grid>
          </>
        )}
      </>
    ),
    Region: (
      <Grid xs={12} md={6} item>
        {isOffreNotStart || editMode ? (
          <div style={{ marginTop: '10px' }}>Region : {formData.regionNames && formData.regionNames.join(', ')}</div>
        ) : (
          <SingleAutoCompleteSelect
            className={classes.select}
            name="region"
            disabled={isOffreNotStart ? false : editMode}
            options={regionOptions}
            onChange={e => {
              setCity(e.cities);
              setSelectedRegion(e);
              handleFormDataChange({ target: { name: 'region', value: e.map(item => item.value) } });
            }}
            value={selectedregion}
            placeholder="Region"
            isClearable
            isMulti
          />
        )}
      </Grid>
    ),
    Pharmacy: (
      <Grid xs={12} md={6} item>
        {isOffreNotStart || editMode ? (
          <div style={{ marginTop: '10px' }}>Pharmacies : {formData.pharmacyNames && formData.pharmacyNames.join(', ')}</div>
        ) : (
          <SingleAutoCompleteSelect
            className={classes.select}
            disabled={isOffreNotStart ? false : editMode}
            name="pharmacy"
            options={pharmacies && pharmacies.map(item => ({ value: item.id, label: item.denomination }))}
            onChange={e => {
              console.log('e', e);
              handleFormDataChange({ target: { name: 'pharmacy', value: e.map(item => item.value) } });
            }}
            value={selectedregion}
            placeholder="Pharmacy"
            isClearable
            isMulti
          />
        )}
      </Grid>
    ),
    null: null,
  };

  return (
    <Paper className={classes.paper}>
      <Grid className={classes.headerGridContainer} container>
        <Grid xs={12} className={classes.title} item>
          <Typography variant="h5" color="primary">
            {`Informations d'offres`}
          </Typography>
        </Grid>
      </Grid>

      <Grid className={classes.gridContainer} spacing={8} container>
        <Grid xs={12} item>
          <ErrorsArea variant="success" prefix="Vous avez les erreurs suivantes" errors={errors.messages} />
        </Grid>
        <OffreInfo
          editMode={editMode}
          isOffreNotStart={isOffreNotStart}
          formData={formData}
          dateD={formData.dateDebut}
          dateF={formData.dateFin}
          originalFormData={originalFormData}
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
                <span>{formData.laboratoryName}</span>
              </>
            )}
          </Grid>
          <Grid xs={12} md={6} item>
            {isOffreNotStart || editMode ? (
              <div style={{ marginTop: '10px' }}>Afficher l'offre par : {showBy ? showBy.label : ''}</div>
            ) : (
              <SingleAutoCompleteSelect
                className={classes.select}
                name="show_by"
                options={[
                  { label: 'Pharmacy', value: 'Pharmacy' },
                  { label: 'Region', value: 'Region' },
                  { label: 'Ville', value: 'City' },
                ]}
                onChange={e => {
                  setShowBy(e);
                  handleFormDataChange({ target: { name: 'show_by', value: e.value } });
                }}
                value={showBy}
                placeholder="Show By "
                isClearable
              />
            )}
          </Grid>

          {DisplayOject[showBy ? showBy.value : null]}
          <div style={{ width: '100%', marginTop: '30px' }}>
            <label>
              <Checkbox
                disabled={isOffreNotStart ? false : editMode}
                checked={isAllowNonSigmapharmChecked}
                onChange={e => {
                  handleFormDataChange({ target: { name: 'allow_non_sigmapharm', value: e.target.checked } });
                  setIsAllowNonSigmapharmChecked(e.target.checked);
                }}
              />
              <span>autoriser aussi les utilisateurs non sigmapharm</span>
            </label>
          </div>
          <Grid xs={12} md={4} container item>
            <Grid className={classes.globalVarsContainer} item xs={6}>
              <TextField
                noValidate
                disabled={isOffreNotStart ? false : editMode}
                autoComplete="off"
                name="globalDiscountPerArticle"
                label="Global remise"
                type="number"
                onChange={({ target: { value } }) => onGlobalVarsChange({ globalDiscountPerArticle: +value })}
                className={classes.offreInputs}
                fullWidth
                multiline
                rows={1}
                rowsMax={2}
              />
              <IconButton
                onClick={() => applyGlobalVars('globalDiscountPerArticle', 'discount')}
                className={classes.globalVarsIcon}
                aria-label="Delete"
                disabled={isOffreNotStart ? false : editMode}
              >
                <FillIcon fontSize="small" />
              </IconButton>
            </Grid>
            <Grid className={classes.globalVarsContainer} item xs={6}>
              <TextField
                noValidate
                disabled={isOffreNotStart ? false : editMode}
                autoComplete="off"
                name="globalMinQuantity"
                label="Global min quantite"
                type="number"
                onChange={({ target: { value } }) => {
                  onGlobalVarsChange({ globalMinQuantity: +value });
                }}
                className={classes.offreInputs}
                fullWidth
                multiline
                rows={1}
                rowsMax={2}
              />
              <IconButton
                onClick={() => applyGlobalVars('globalMinQuantity', 'minQuantity')}
                className={classes.globalVarsIcon}
                aria-label="Delete"
                disabled={isOffreNotStart ? false : editMode}
              >
                <FillIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </OffreInfo>

        <Grid className={classes.gridContainer} spacing={8} container>
          <Typography variant="h5" color="primary" className={classes.infoArticle}>
            {rows.filter(item => item.minQuantity > 0).length} {` Articles de l'offre `}
          </Typography>
        </Grid>
        <div
          style={{
            padding: 3,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Input placeholder="search for articles" value={search} onChange={handleSearch} />
        </div>
        <Grid className={classes.gridContainer} spacing={8} container>
          <Table className={classes.table} style={{ marginLeft: '1%' }}>
            <TableHead>
              <ArticlesListTableHeader
                checkAllValue={disableAllFields || disableAllFieldsExceptDate || (rows.length == 0 ? false : checkAllValue)}
                onCheckAllChange={disableAllFields || disableAllFieldsExceptDate ? null : toggleAllSelection}
              />
            </TableHead>
            <TableBody>
              {displayRows.length != 0 ? (
                displayRows.map(row => (
                  <AticlesListTableRow
                    handleArticleRowChange={disableAllFields || disableAllFieldsExceptDate ? () => {} : handleArticleRowChange}
                    key={row.id}
                    row={row}
                    editMode={editMode}
                    isOffreNotStart={isOffreNotStart}
                    editModec={true}
                    articles={articlesRow}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell className={classes.rowsEmpty} colSpan={8}>
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
            onClick={handleSubmit(disableAllFieldsExceptDate)}
          >
            {editMode ? 'Mettre à jour ' : 'Valider'}
          </Button>
          <Button type="submit" variant="contained" color="primary" className={classes.buttons} onClick={onCancel}>
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
