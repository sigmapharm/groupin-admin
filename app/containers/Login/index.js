import React from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import LoginForm from '../../components/LoginForm';
import { submitLogin } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectLoginErrors } from './selectors';

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.login();
  };

  login = () => {
    this.props.dispatch(submitLogin(this.state));
  };

  render() {
    return (
      <form>
        <LoginForm
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleChange}
          onSubmit={this.handleSubmit}
          error={this.props.error}
        />
      </form>
    );
  }
}

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  error: makeSelectLoginErrors(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignIn);
