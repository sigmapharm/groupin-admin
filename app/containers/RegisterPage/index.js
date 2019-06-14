import React from 'react';
import * as PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { createStructuredSelector } from 'reselect';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { verifyToken, registerUser } from './actions';

/* istanbul ignore next */
const styles = theme => ({
  inputs: {
    maxWidth: '350px',
  },
  submit: {
    maxWidth: '350px',
  },
  container: {
    paddingLeft: '30%',
    paddingRight: '30%',
    paddingTop: '10%',
    textAlign: 'center',
  },
  paper: {
    paddingBottom: '10%',
    paddingTop: '10%',
    textAlign: 'center',
  },
  form: {
    '& > *': {
      marginTop: theme.spacing.unit,
    },
  },
});

export class RegisterPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tokenValidated: false,
      tokenValid: false,
      password: '',
      passwordConfirmation: '',
    };
  }

  componentWillMount() {
    const { params } = this.props.match;
    if (params) {
      const { token } = params;
      this.props.dispatch(verifyToken(token, this.setTokenValid));
    }
  }

  setTokenValid = tokenValid => {
    this.setState({
      tokenValid,
      tokenValidated: true,
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = e => {
    e.preventDefault();
    const { params } = this.props.match;
    if (params) {
      const { token } = params;
      const { password, passwordConfirmation } = this.state;
      this.props.dispatch(registerUser(token, password, passwordConfirmation));
    }
  };

  render() {
    const { classes } = this.props;
    const {
      tokenValid,
      tokenValidated,
      password,
      passwordConfirmation,
    } = this.state;
    const isError = password !== passwordConfirmation;
    return (
      <div className={classes.container}>
        {!tokenValidated && 'Token en cours de validation...'}
        {tokenValidated && (
          <Paper className={classes.paper}>
            {!tokenValid && <div>Token Invalide</div>}
            {tokenValid && (
              <form className={classes.form} onSubmit={this.submit}>
                <Typography component="h1" variant="h5">
                  Merci de saisir le mot de passe pour votre compte
                </Typography>
                <TextField
                  name="password"
                  type="password"
                  label="Mot de passe"
                  value={password}
                  onChange={this.onChange}
                  className={classes.inputs}
                  inputProps={{
                    maxLength: 50,
                  }}
                  fullWidth
                />
                <TextField
                  type="password"
                  name="passwordConfirmation"
                  label="Confirmation du Mot de passe"
                  value={passwordConfirmation}
                  error={isError}
                  onChange={this.onChange}
                  className={classes.inputs}
                  inputProps={{
                    maxLength: 50,
                  }}
                  helperText="Les mots de passes doivent être les mêmes"
                  fullWidth
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.submit}
                >
                  Valider
                </Button>
              </form>
            )}
          </Paper>
        )}
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(RegisterPage);
