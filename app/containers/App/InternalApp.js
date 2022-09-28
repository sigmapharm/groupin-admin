import React from 'react';
import * as PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getConfiguration, getRegions } from './actions';
import { selectRegions } from './selectors';
import { createStructuredSelector } from 'reselect';

const ListArticles = React.lazy(() => import('../Articles/ListArticles'));
const AddArticle = React.lazy(() => import('../Articles/add/index'));
const AddUser = React.lazy(() => import('../Users/add'));
const AddOffre = React.lazy(() => import('../Offres/add/index'));
const OffresList = React.lazy(() => import('../Offres'));
const UsersList = React.lazy(() => import('../Users'));
const Commands = React.lazy(() => import('../Command'));
const Grouping = React.lazy(() => import('../Grouping'));
const statistiques = React.lazy(() => import('../statistiques'));
const Reporting = React.lazy(() => import('../Reporting'));
const OffersHome = React.lazy(() => import('../OffersHome'));
const Profile = React.lazy(() => import('../Profile'));
const Dashboard = React.lazy(() => import('../Dashboards'));
const AddPharmacie = React.lazy(() => import('../Pharmacies/add/index'));
const ListPharmacies = React.lazy(() => import('../Pharmacies/ListPharmacies'));
const ListProviders = React.lazy(() => import('../Providers/ListProviders'));
const AddProvider = React.lazy(() => import('../Providers/add/index'));
const ListLaboratoires = React.lazy(() => import('../Laboratoires/ListLaboratoires'));
const AddLaboratoire = React.lazy(() => import('../Laboratoires/add/index'));

class InternalApp extends React.PureComponent {
  componentWillMount() {
    this.props.dispatch(getConfiguration());
  }

  render() {
    return (
      <React.Suspense
        fallback={
          <div style={styles.center}>
            <CircularProgress size={100} color="primary" />
          </div>
        }
      >
        <Switch>
          <Route exact path="/" component={OffersHome} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/articles" component={ListArticles} />
          <Route exact path="/offres" component={OffresList} />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/articles/add" component={AddArticle} />
          <Route exact path="/articles/edit/:articleId" component={AddArticle} />
          <Route exact path="/offres/add" component={AddOffre} />
          <Route exact path="/offres/edit/:offerId" component={AddOffre} />
          <Route exact path="/commands" component={Commands} />
          <Route exact path="/statistiques" component={statistiques} />
          <Route exact path="/reporting" component={Reporting} />
          {/* <Route exact path="/pharmacies/add" component={AddPharmacie} /> */}
          <Route exact path="/pharmacies/edit/:pharmacyId" component={AddPharmacie} />
          <Route exact path="/pharmacies" component={ListPharmacies} />
          <Route exact path="/provider" component={ListProviders} />
          <Route exact path="/providers/add" component={AddProvider} />
          <Route exact path="/providers/edit/:providerId" component={AddProvider} />
          <Route exact path="/laboratoires" component={ListLaboratoires} />
          <Route exact path="/laboratoires/add" component={AddLaboratoire} />
          <Route exact path="/laboratoires/edit/:laboratoryId" component={AddLaboratoire} />

          <Route
            exact
            path="/offres/:offerId/commands"
            render={props => <Commands {...props} key={props.match.params.offerId} />}
          />
          <Route exact path="/grouping/:offerId" component={Grouping} />
          <Route exact path="/profile" component={Profile} />
          <Route component={NotFoundPage} />
        </Switch>
      </React.Suspense>
    );
  }
}

const styles = {
  center: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
  },
};

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
