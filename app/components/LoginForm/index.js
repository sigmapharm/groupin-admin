import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import logocolor from '../../images/logo-color.png';
import ErrorBar from '../Snackbar/ErrorBar';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

export function LoginForm(props) {
  const { classes, username, password, handleChange, onSubmit, error } = props;
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <div>
          <img alt="logo" src={logocolor} style={{ width: '200px' }} />
        </div>
        <Typography component="h1" variant="h5">
          <br />
          Authentification
          <br />
        </Typography>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="username">Adresse Email</InputLabel>
          <Input
            name="username"
            value={username}
            onChange={handleChange}
            autoFocus
            error={error}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Mot de passe</InputLabel>
          <Input
            name="password"
            value={password}
            type="password"
            onChange={handleChange}
            error={error}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onSubmit}
        >
          {"S'authentifier"}
        </Button>
        <br />
        <button
          type="button"
          onClick={() => {
            alert('Pas encore implémeté !'); // eslint-disable-line  no-alert
          }}
        >
          Mot de passe oublié ?
        </button>
      </Paper>
      {error && <ErrorBar />}
    </main>
  );
}

LoginForm.defaultProps = {};

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

export default withStyles(styles)(LoginForm);
