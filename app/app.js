/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';
import GlobalLoadingDialog from './containers/GlobalLoadingDialog';
import theme from './themes/theme';
import { CircularProgress } from '@material-ui/core';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

Sentry.init({
  dsn: 'https://8ffc99b2b4fb46ec86917e6acf527d14@o1299865.ingest.sentry.io/6536275',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <App />
            <GlobalLoadingDialog />
          </MuiThemeProvider>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// // Install ServiceWorker and AppCache in the end since
// // it's not most important operation and if main code fails,
// // we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   window.console.log = () => {};
//   require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }
