import 'chart.js/auto';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import authenticated from '../HOC/authenticated/authenticated';
import { makeSelectUser } from '../App/selectors';
import Member from './Member';
import Admin from './Admin';

const Dashboard = ({ user }) => {
  if (!user) return null;
  return user.role === 'MEMBRE' ? <Member userRole="MEMBRE" /> : <Admin userRole="ADMIN" />;
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});
const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  authenticated,
  withConnect,
)(Dashboard);
