import React, { useState } from 'react';
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
import SwipeableTextMobileStepper from '../LoginSlide/slider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  main: {
    width: '100%',
    border: '1px solid black',
    height: '100%',
    padding: '0px 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    [theme.breakpoints.up('md')]: {
      height: 'calc(100vh - 70px)',
      paddingTop: 0,
      padding: '0px 70px',
    },
  },
  paper: {
    width: '1250px',
    // padding: 50,
    display: 'flex',
    minHeight: 450,

    // maxHeight: 500,
    flexDirection: 'column-reverse',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    backgroundColor: theme.palette.background.default,
    borderRadius: 20,
  },

  formContainer: {
    width: '100%',
    textAlign: 'center',
    padding: '0px 30px',
    paddingTop: 40,
    [theme.breakpoints.up('md')]: {
      width: 450,
    },
    // border: '1px solid black',
  },
  slides: {
    // border: '1px solid black',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 400px)',
    },
  },
  resetPassword: {
    display: 'flex',
    marginBottom: 5,
  },
  resetLink: {
    color: '#19317e',
    textDecoration: 'none',
  },
});

export function LoginForm(props) {
  const {
    classes,
    username,
    password,
    handleChange,
    onSubmit,
    error,
    handlePasswordReset,
    isOpen,
    handleClose,
    handleOpen,
    errorMessage,
  } = props;

  const [email, setEmail] = useState('');

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper} elevation={4}>
        <div className={classes.formContainer}>
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
              noValidate
              autoComplete="off"
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Mot de passe</InputLabel>
            <Input name="password" value={password} type="password" onChange={handleChange} error={error} />
          </FormControl>
          <div className={classes.resetPassword}>
            <a href="#" className={classes.resetLink} onClick={handleOpen}>
              mot passe oublié ?
            </a>
          </div>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={onSubmit}>
            {"S'authentifier"}
          </Button>
          <br />
        </div>
        <div className={classes.slides}>
          <SwipeableTextMobileStepper />
        </div>
      </Paper>
      {error && <ErrorBar />}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText style={{ width: 500 }}>Reset Your Passwword</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={email}
            onChange={e => setEmail(e.target.value)}
            label="Email Address"
            type="email"
            fullWidth
          />
          {errorMessage && <Typography style={{ color: 'red' }}>{errorMessage}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePasswordReset(email)} color="primary">
            send Link
          </Button>
        </DialogActions>
      </Dialog>
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

{
  /* <button
          type="button"
          onClick={() => {
            alert('Pas encore implémeté !'); // eslint-disable-line  no-alert
          }}
        >
          Mot de passe oublié ?
        </button>
       */
}

// [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]
