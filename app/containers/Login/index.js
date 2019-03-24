import React from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm';
import { submitLogin } from './actions';

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
        />
      </form>
    );
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

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default compose(withConnect)(SignIn);
