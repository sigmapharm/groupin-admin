import React from 'react';
import * as PropTypes from 'prop-types';
import history from 'utils/history';
import { connect } from 'react-redux';
import AuthUtils from '../../../services/security/AuthUtils';
import { setUserInStore } from '../../App/actions';

const authenticated = WrappedComponent => {
  class Authenticated extends React.Component {
    static WrappedComponent = WrappedComponent;

    componentWillMount = () => {
      if (!AuthUtils.isAuthenticated()) {
        history.push('/login');
      } else {
        this.props.dispatch(setUserInStore());
      }
    };

    render() {
      if (AuthUtils.isAuthenticated()) {
        return <WrappedComponent {...this.props} />;
      }
      return null;
    }
  }

  /* istanbul ignore next */
  const mapDispatchToProps = dispatch => ({
    dispatch,
  });

  const withConnect = connect(
    null,
    mapDispatchToProps,
  );

  Authenticated.propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  return withConnect(Authenticated);
};

export default authenticated;
