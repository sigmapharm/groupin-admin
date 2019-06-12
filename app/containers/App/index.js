/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from 'containers/Login';
import history from 'utils/history';
import GlobalStyle from '../../global-styles';

import Header from '../AppHeader/Header';
import InternalApp from './InternalApp';

export default function App() {
  return (
    <div>
      <Header position="static" history={history} />
      <Switch>
        <Route exact path="/login" component={SignIn} />
        <Route component={InternalApp} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
