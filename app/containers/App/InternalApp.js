import React from 'react';
import * as PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AddUser from '../Users/add';
import { getConfiguration } from './actions';
import ListArticles from '../Articles/ListArticles';
import AddArticle from '../Articles/add/index';
import OffresList from '../Offres';
import AddOffre from '../Offres/add/index';
import UsersList from '../Users';

class InternalApp extends React.PureComponent {
  componentWillMount() {
    this.props.dispatch(getConfiguration());
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={OffresList} />
        <Route exact path="/articles" component={ListArticles} />
        <Route exact path="/offres" component={OffresList} />
        <Route exact path="/users" component={UsersList} />
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

export default compose(withConnect)(InternalApp);
