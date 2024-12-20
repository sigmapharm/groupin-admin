import { Divider, Typography, withStyles, Fab } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Search } from '@material-ui/icons';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import authenticated from '../HOC/authenticated/authenticated';
import DateInput from '../../components/DateInput';
import ArticleChart from './charts/ArticlesChart';
import CityChart from './charts/CityCharts';
import RegionChart from './charts/RegionChart';

import PharmaciesChart from './charts/PharmaciesChart';
import LaboChart from './charts/LaboratoireChart';
import moment from 'moment';
import _ from 'lodash';
import { selectArticles, selectPharmas, selectlabos, selectCity, selectPrintPharma, selectReg } from './selectors';
import { getArticles, getPharmas, getLabos, getCity, getPrintPharama, getReg } from './actions';

const Statistiques = ({ classes, articles, dispatch, pharmas, labos, city, printPharma, region }) => {
  //
  const day = moment().get('date');
  const year = moment().get('year');
  const month = moment().get('month');
  //
  const lastMonthDate = moment(new Date(`${month}/${day}/${year}`), 'YYYY-MM-DD')
    .format()
    .split('T')[0];

  // set the start date last month by default

  const [startDate, setStartDate] = useState(null);
  //
  const [endDate, setEndDate] = useState(null);

  const isStartDateInValide = startDate === 'Invalid date' ? '' : startDate;
  const isENdDAteInValide = endDate === 'Invalid date' ? '' : endDate;

  const handleSearch = () => {
    dispatch(getArticles(`?from=${isStartDateInValide}&to=${isENdDAteInValide}`));
    dispatch(getPharmas(`?from=${isStartDateInValide}&to=${isENdDAteInValide}`));
    dispatch(getLabos(`?from=${isStartDateInValide}&to=${isENdDAteInValide}`));
    dispatch(getCity(`?from=${isStartDateInValide}&to=${isENdDAteInValide}`));
    dispatch(getReg(`?from=${isStartDateInValide}&to=${isENdDAteInValide}`));
  };

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h4" className={classes.typography}>
        Statistiques
      </Typography>
      <Divider variant="middle" className={classes.divider} />
      <div className={classes.inputContainer}>
        <DateInput value={startDate} onChange={e => setStartDate(e)} label="De" />
        <DateInput value={endDate} onChange={e => setEndDate(e)} label="A" />
        <Fab color="primary" className={classes.button} onClick={handleSearch}>
          <Search />
        </Fab>

        <Divider variant="middle" className={classes.divider} />

        <div className={classes.container}>
          <ArticleChart
            rows={articles}
            tableUpdate={getArticles}
            dispatch={dispatch}
            fromDate={isStartDateInValide}
            toDate={isENdDAteInValide}
          />
          <LaboChart
            rows={labos}
            tableUpdate={getLabos}
            dispatch={dispatch}
            fromDate={isStartDateInValide}
            toDate={isENdDAteInValide}
          />
          <CityChart
            rows={city}
            tableUpdate={getCity}
            dispatch={dispatch}
            fromDate={isStartDateInValide}
            toDate={isENdDAteInValide}
          />
          <RegionChart
            rows={region}
            tableUpdate={getReg}
            dispatch={dispatch}
            fromDate={isStartDateInValide}
            toDate={isENdDAteInValide}
          />
          <PharmaciesChart
            rows={pharmas}
            tableUpdate={getPharmas}
            dispatch={dispatch}
            fromDate={isStartDateInValide}
            toDate={isENdDAteInValide}
            printPharma={printPharma}
            getPrintPharama={getPrintPharama}
          />
        </div>
      </div>
      <div className={classes.space} />
    </div>
  );
};

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    maxWidth: '1200px',
    width: '100%',
    margin: '20px auto',
    overflow: 'hidden',
  },
  divider: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  typography: {
    paddingLeft: 30,
  },
  title: {
    textAlign: 'center',
  },
  space: {
    marginTop: 70,
  },
  inputContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    marginLeft: 30,
    marginTop: 10,
  },
  container: {
    width: '100%',
  },
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  articles: selectArticles(),
  pharmas: selectPharmas(),
  labos: selectlabos(),
  city: selectCity(),
  region: selectReg(),
  printPharma: selectPrintPharma(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(Statistiques);
