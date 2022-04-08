import { withStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import DateInput from '../../../components/DateInput';
import Select from './select';
import FilterButton from './FilterButton';
import PrintButton from './PrintButton';
import { useSelectFormat } from '../hooks/useSelectFormat';
import ReactExport from 'react-data-export';
import _ from 'lodash';
import PDFButton from './PdfButton';
import history from 'utils/history';
import moment from 'moment';
import { getReportingPDF } from '../actions';
import { saveAs } from 'file-saver';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import authenticated from '../../HOC/authenticated/authenticated';
import { selectReportingPdf } from '../selectors';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const FilterInputsList = ({ classes, laboratoires, regions, pharmacies, rows, dispatch, getReporting, reportPdf }) => {
  const day = moment().get('date');
  const year = moment().get('year');
  const month = moment().get('month');
  //
  const lastMonthDate = moment(new Date(`${month}/${day}/${year}`), 'YYYY-MM-DD')
    .format()
    .split('T')[0];

  // select values

  const [lab, setLab] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState([]);
  const [pharma, setPharma] = useState('');
  const [article, setArticle] = useState('');
  const [dateFrom, setDateFrom] = useState(lastMonthDate);
  const [dateTo, setDateTo] = useState(
    moment(new Date(), 'YYYY-MM-DD')
      .format()
      .split('T')[0],
  );
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArticle, setSelectedArticle] = useState('');

  const labOptions = useSelectFormat(laboratoires, { label: 'nom', value: 'nom', allow: ['articledto'] });
  const articlesOptions = useSelectFormat(article, { label: 'nom', value: 'nom' });
  const regionOptions = useSelectFormat(regions, { label: 'name', value: 'code', allow: ['cities'] });
  const villeOptiosn = useSelectFormat(city, { label: 'name', value: 'code' });
  const pharmaciesOptiosn = useSelectFormat(pharmacies, { label: 'denomination', value: 'denomination' });

  // useEffect(() => {
  //   dispatch(getReportingPDF(''));
  // }, []);

  // performe filter
  const handleTablefilter = e => {
    // reset the browser to default
    e.preventDefault();

    dispatch(
      getReporting(
        `?lab=${lab ? lab.value : ''}&city=${selectedCity ? selectedCity.id : ''}&region=${region ? region.id : ''}&from=${
          dateFrom === 'Invalid date' ? '' : dateFrom
        }&to=${dateTo === 'Invalid date' ? '' : dateTo}&ar=${selectedArticle}&pha=${pharma ? pharma.value : ''}`,
      ),
    );
  };

  const handlePdfPrint = () => {
    dispatch(
      getReportingPDF({
        searchInput: `?lab=${lab ? lab.value : ''}&city=${selectedCity ? selectedCity.id : ''}&region=${
          region ? region.id : ''
        }&from=${dateFrom === 'Invalid date' ? '' : dateFrom}&to=${
          dateTo === 'Invalid date' ? '' : dateTo
        }&ar=${selectedArticle}&pha=${pharma ? pharma.value : ''}`,
        callback: (err, blob) => {
          if (err) {
            console.log('print err', err);
            return;
          }
          const pdfBlob = new Blob([blob], { type: blob.type });
          saveAs(
            pdfBlob,
            `reporting-${
              moment(new Date(), 'YYYY-MM-DD')
                .format()
                .split('T')[0]
            }.pdf`,
          );
        },
      }),
    );
  };

  return (
    <form className={classes.listContainer} onSubmit={handleTablefilter}>
      {/* labo select input */}
      <Select
        placeholder="Laboratoires"
        options={labOptions}
        onChange={e => {
          setLab(e);
          setSelectedArticle('');
        }}
        value={lab}
      />
      {/* articles  select input  */}
      <Select
        options={articlesOptions}
        onChange={e => {
          setSelectedArticle(e);
        }}
        value={selectedArticle}
      />
      {/* pharmacies select input  */}
      <Select
        placeholder="pharmacies"
        options={pharmaciesOptiosn}
        onChange={e => {
          setPharma(e);
        }}
        value={pharma}
      />
      {/* Regions select inputs */}
      <Select
        placeholder="Regions"
        options={regionOptions}
        onChange={e => {
          setRegion(e);
          setCity(e.cities);
          setSelectedCity('');
        }}
        value={region}
      />
      {/* villes select input */}
      <Select
        placeholder="Ville"
        options={villeOptiosn}
        onChange={e => {
          setSelectedCity(e);
        }}
        value={selectedCity}
      />
      {/* date inputs */}
      <DateInput
        label="De"
        onChange={e => {
          setDateFrom(e);
        }}
        value={dateFrom}
      />
      <DateInput
        label="A"
        onChange={e => {
          setDateTo(e);
        }}
        value={dateTo}
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

      <a onClick={handlePdfPrint}>
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

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  reportPdf: selectReportingPdf(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
  withStyles(style),
)(FilterInputsList);

// export default withStyles(style)(FilterInputsList);
