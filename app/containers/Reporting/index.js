import { withStyles } from '@material-ui/core';
import 'chart.js/auto';
import React, { useEffect } from 'react';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import authenticated from '../HOC/authenticated/authenticated';
import { getReporting } from './actions';
import { selectReporting } from './selectors';

const Reporting = ({ reporting, dispatch, classes }) => {
  useEffect(() => {
    dispatch(getReporting(() => {}));
  }, []);
  console.log('reporting', reporting);
  return (
    <div className={classes.root}>
      <h1>Reporting</h1>
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
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});
const mapStateToProps = createStructuredSelector({
  reporting: selectReporting(),
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
