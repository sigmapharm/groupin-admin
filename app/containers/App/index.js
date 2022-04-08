/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import history from 'utils/history';
import Dialog from '../../components/Dialog';
// import GlobalStyle from '../../global-styles';

import Header from '../AppHeader/Header';

const RegisterPage = React.lazy(() => import('../RegisterPage'));
const InternalApp = React.lazy(() => import('./InternalApp'));
const SignIn = React.lazy(() => import('containers/Login'));

export default function App() {
  return (
    <React.Suspense
      fallback={
        <div style={styles.center}>
          <CircularProgress size={100} color="primary" />
        </div>
      }
    >
      <div>
        <Header position="static" history={history} />
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register/:username/:token" component={RegisterPage} />
          <Route component={InternalApp} />
        </Switch>
        {/* <GlobalStyle /> */}
      </div>
    </React.Suspense>
  );
}

const styles = {
  center: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
  },
};
