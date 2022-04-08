import { Divider, Typography, withStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import authenticated from '../HOC/authenticated/authenticated';
import { getReporting, getReportingCA } from './actions';
import { selectReporting, selectReportingCA } from './selectors';
import { selectRegions, makeSelectLaboratoires, makeSelectPharmacies } from '../App/selectors';
import * as _ from 'lodash';
import FilterInputsList from './inputsList/FilterInputsList';
import ReportingTable from './tables/Table';

const Reporting = props => {
  // props
  const { classes, dispatch, laboratoires, regions, pharmacies, reporting = [], reportingCa } = props;

  useEffect(() => {
    dispatch(getReporting());
    dispatch(getReportingCA());
  }, []);

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h4" className={classes.typography}>
        Reporting
      </Typography>
      <Divider variant="fullWidth" className={classes.divider} />
      <FilterInputsList
        laboratoires={laboratoires}
        regions={regions}
        pharmacies={pharmacies}
        rows={reporting}
        getReporting={getReporting}
      />
      <Divider variant="middle" className={classes.divider} />
      <div />
      <div>
        <Typography component="h1" variant="h5" className={classes.title}>
          chiffre d'affaires Total / {laboratoires.length} laboratoires :
          {typeof reportingCa === 'number' ? ` ${reportingCa.toFixed(2)}  MAD` : ' loading...'}
        </Typography>
        <Divider variant="middle" className={classes.divider} />
        <ReportingTable rows={reporting} />
      </div>

      <div className={classes.space} />
    </div>
  );
};

// styles

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
    marginTop: 100,
  },
});

// redux

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  reporting: selectReporting(),
  regions: selectRegions(),
  laboratoires: makeSelectLaboratoires(),
  pharmacies: makeSelectPharmacies(),
  reportingCa: selectReportingCA(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(Reporting);
