import { withStyles } from '@material-ui/core';
import React, { useState, useReducer } from 'react';
import DateInput from '../../../components/DateInput';
import Select from './select';
import FilterButton from './FilterButton';
import PrintButton from './PrintButton';
import { useSelectFormat } from '../hooks/useSelectFormat';
import ReactExport from 'react-data-export';
import _ from 'lodash';
import ReactToPdf from 'react-to-pdf';
import PDFButton from './PdfButton';
import history from 'utils/history';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function reducres(state = {}, { type, payload, value }) {
  console.log(type);
  switch (type) {
    case 'LABO':
      return { ...state, laboName: payload, value };
    case 'ARTICLES':
      return { ...state, articles: payload, value };
    case 'PHARMACIES':
      return { ...state, pharmacies: payload, value };
    case 'REGIONS':
      return { ...state, regions: payload, value };
    case 'VILLES':
      return { ...state, villes: payload, value };
    case 'DATE-DE':
      return { ...state, date_de: payload };
    case 'DATE-A':
      return { ...state, date_a: payload };
    default:
      return state;
  }
}

const FilterInputsList = ({ classes, laboratoires, regions, pharmacies, setRows, rows, tableRef, pdf }) => {
  // sub-selects
  const [villes, setVilles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [clearInput, setClearInput] = useState(null);

  //  format select rows
  const labOptions = useSelectFormat(laboratoires, { label: 'nom', value: 'nom', allow: ['articledto'] });
  const articlesOptions = useSelectFormat(articles, { label: 'nom', value: 'nom' });
  const regionOptions = useSelectFormat(regions, { label: 'name', value: 'code', allow: ['cities'] });
  const villeOptiosn = useSelectFormat(villes, { label: 'name', value: 'code' });
  const pharmaciesOptiosn = useSelectFormat(pharmacies, { label: 'denomination', value: 'denomination' });

  const [state, dispatch] = useReducer(reducres, {});

  // performe filter
  const handleTablefilter = e => {
    // reset the browser to default
    e.preventDefault();

    // map value to filter
    const __filterdstate = _.mapValues(state, (obj, key) => {
      //  dont forget to fix the date
      // if (key === 'date_de' || key === 'date_a') {
      //   return obj;
      // }
      return obj.value;
    });

    // remove undefined values
    Object.keys(__filterdstate).forEach(key => (__filterdstate[key] === undefined ? delete __filterdstate[key] : {}));

    const filterdRows = _.filter(rows, _.matches(__filterdstate));

    console.log('rows', filterdRows);
    console.log('__filterdstate', __filterdstate);

    setRows(filterdRows);
  };

  const options = {
    unit: 'in',
    format: [4, 2],
  };

  return (
    <form className={classes.listContainer} onSubmit={handleTablefilter}>
      {/* labo select input */}
      <Select
        placeholder="Laboratoires"
        options={labOptions}
        onChange={(lab, prop) => {
          if (prop.action === 'clear') {
            dispatch({ type: 'LABO', payload: '', value: '' });
            return;
          }

          dispatch({ type: 'LABO', payload: lab, value: lab.value });
          setArticles(lab.articledto);
        }}
        value={state.laboName}
      />
      {/* articles  select input  */}
      <Select
        options={articlesOptions}
        onChange={(article, prop) => {
          if (prop.action === 'clear') {
            dispatch({ type: 'ARTICLES', payload: '', value: '' });
            return;
          }

          dispatch({ type: 'ARTICLES', payload: article, value: article.value });
        }}
        placeholder="Désignation d'article"
      />
      {/* pharmacies select input  */}
      <Select
        placeholder="pharmacies"
        options={pharmaciesOptiosn}
        onChange={(pharma, prop) => {
          if (prop.action === 'clear') {
            dispatch({ type: 'PHARMACIES', payload: '', value: '' });
            return;
          }

          dispatch({ type: 'PHARMACIES', payload: pharma, value: pharma.value });
        }}
      />
      {/* Regions select inputs */}
      <Select
        placeholder="Regions"
        options={regionOptions}
        onChange={(reg, prop) => {
          if (prop.action === 'clear') {
            dispatch({ type: 'REGIONS', payload: '', value: '' });
            setClearInput(null);
          }

          dispatch({ type: 'REGIONS', payload: reg, value: reg.value });
          setVilles(reg.cities);
          setClearInput(null);
        }}
        value={state.regions}
      />
      {/* villes select input */}
      <Select
        placeholder="Ville"
        options={villeOptiosn}
        onChange={(ville, prop) => {
          if (prop.action === 'clear') {
            dispatch({ type: 'VILLES', payload: '', value: '' });
            return;
          }

          dispatch({ type: 'VILLES', payload: ville, value: ville.value });
          setClearInput(ville);
        }}
        value={clearInput}
      />
      {/* date inputs */}
      <DateInput
        label="De"
        onChange={value => {
          dispatch({ type: 'DATE-DE', payload: value });
        }}
        value={new Date()}
      />
      <DateInput
        label="A"
        onChange={value => {
          dispatch({ type: 'DATE-A', payload: value });
        }}
      />
      {/* buttons */}
      <FilterButton className={classes.buttons} type="submit" />
      {/* export  table to excel file */}
      <ExcelFile element={<PrintButton className={classes.buttons} />} filename="Reporting">
        <ExcelSheet data={rows} name="Reporting">
          <ExcelColumn label="laboratoires" value="laboName" />
          <ExcelColumn label="offres" value="totalOffers" />
          <ExcelColumn label="commandes" value="totalCommandes" />
          <ExcelColumn label="articles commandés" value="totalArticalesCommandes" />
          <ExcelColumn label="chiffre d'affaires" value="ca" />
        </ExcelSheet>
      </ExcelFile>
      <a href={pdf.url} download="reporting.pdf">
        <PDFButton className={classes.buttons} />
      </a>
    </form>
  );
};

const style = {
  listContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  buttons: {
    marginTop: 13,
    marginLeft: 15,
  },
};

export default withStyles(style)(FilterInputsList);
