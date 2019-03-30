/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import SignIn from 'containers/Login';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import history from 'utils/history';
import GlobalStyle from '../../global-styles';

import Header from '../AppHeader/Header';

export default function App() {
  return (
    <div>
      <Header position="static" history={history} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={SignIn} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
