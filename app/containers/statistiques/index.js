import { Divider, Typography, withStyles, Fab } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Search } from '@material-ui/icons';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import authenticated from '../HOC/authenticated/authenticated';
import DateInput from '../../components/DateInput';
import ArticleChart from './charts/ArticlesChart';
import RegionChart from './charts/RegionChart';
import PharmaciesChart from './charts/PharmaciesChart';
import LaboChart from './charts/LaboratoireChart';
import moment from 'moment';
import _ from 'lodash';
import { useFecth } from '../../hooks/useFetch';
// test data
import testdata1 from './data/testdata1';
import testdata2 from './data/testdata2';
import testdata3 from './data/testdata3';
import testdata4 from './data/testdata4';

const Dashboard = ({ classes }) => {
  // get date of the last month

  // prepare date

  const day = moment().get('date');
  const year = moment().get('year');
  const month = moment().get('month');

  const lastMonthDate = new Date(`${month}/${day}/${year}`);

  // set the start date last month by default

  const [startDate, setStartDate] = useState(lastMonthDate);
  const [endDate, setEndDate] = useState(new Date());

  const articles = useFecth('/statistics/article', { method: 'GET' });
  const cities = useFecth('/statistics/city', { method: 'GET' });
  const labos = useFecth('/statistics/laboratory', { method: 'GET' });
  const pharmas = useFecth('/statistics/pharmacy', { method: 'GET' });

  console.log(pharmas.data);

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h4" className={classes.typography}>
        Statistiques
      </Typography>
      <Divider variant="middle" className={classes.divider} />
      <div className={classes.inputContainer}>
        <DateInput value={startDate} onChange={e => setStartDate(e)} label="De" />
        <DateInput value={endDate} onChange={e => setEndDate(e)} label="A" />
        <Fab color="primary" className={classes.button}>
          <Search />
        </Fab>

        <Divider variant="middle" className={classes.divider} />

        <div className={classes.container}>
          <ArticleChart rows={testdata1} />
          <LaboChart rows={testdata4} />
          <RegionChart rows={testdata2} />
          <PharmaciesChart rows={testdata3} />
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

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(Dashboard);
