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
import Login from 'containers/Login/index.js';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "../themes/theme";
import Header from '../../components/header/Header';
import history from 'utils/history';

export default function App() {
  return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Header position="static" history={history}/>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route component={NotFoundPage} />
          </Switch>
          <GlobalStyle />
        </div>
      </MuiThemeProvider>
  );
}
