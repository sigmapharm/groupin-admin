import React from 'react';
import * as PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import AddUser from '../Users/add';
import { getConfiguration } from './actions';
import reducer from './reducer';
import ListArticles from '../Articles/ListArticles';
import  AddArticle from '../Articles/add/index';
import  OffresList  from '../Offres';
import  AddOffre  from '../Offres/add/index';

class InternalApp extends React.PureComponent {
  componentWillMount() {
    this.props.dispatch(getConfiguration());
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/articles" component={ListArticles} />
        <Route exact path="/offres" component={OffresList} />
        <Route exact path="/users/add" component={AddUser} />
        <Route exact path="/articles/add" component={AddArticle} />
        <Route exact path="/offres/add" component={AddOffre} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

InternalApp.defaultProps = {};

InternalApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'global', reducer });

export default compose(
  withReducer,
  withConnect,
)(InternalApp);
