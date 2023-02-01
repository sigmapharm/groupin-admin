import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoginForm from '../../components/LoginForm';
import { submitLogin, getEmailAddress } from './actions';
import { makeSelectLoginErrors, makeSelectLoginEmail } from './selectors';
import history from 'utils/history';
class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isOpen: false,
      errorMessage: null,
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

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handlePasswordReset = email => () => {
    this.props.dispatch(
      getEmailAddress({
        email,
        callback: isSend => {
          if (!isSend) {
            this.setState({ errorMessage: 'cannot send password reset please check you email or contact admin' });
            return;
          }
          this.setState({ isOpen: false });
        },
      }),
    );
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
          handlePasswordReset={this.handlePasswordReset}
          isOpen={this.state.isOpen}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
          errorMessage={this.state.errorMessage}
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
  email: makeSelectLoginEmail(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

export default withConnect(SignIn);
