import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Snackbar from '@material-ui/core/Snackbar';
import logocolor from '../../images/logo-color.png';
import Link from '@material-ui/core/Link';
import AuthHelperMethods from "./AuthHelperMethods";


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
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          isAuthenticated: false,
          open: false
        };
      }
    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClose = event => {
        this.setState({ open: false });
    };

    Auth = new AuthHelperMethods();

    login = () => {
      this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        if (res === false) {
          this.setState({ open: true });
        } else {
          this.props.history.replace("/");
        }
      })
      .catch(err => {
        this.setState({ open: true });
      });
    };

    render() {
        const { classes } = this.props;
        if (this.state.isAuthenticated === true) {
            return (
                <main className={classes.main}>
                <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Bienvenue dans GroupIN... plateforme intégrée de gestion des Achats Groupés !
                        </Typography>
                    </Paper>
                </main>
            )
        } else {
            return (
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <div className={classes.imgHolder}>
                          <img alt="logo" src={logocolor} style={{ width: "200px" }} />
                        </div>
                        <Typography component="h1" variant="h5">
                          <br/>Authentification<br/>
                        </Typography>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">Adresse Email</InputLabel>
                            <Input name="username" autoComplete="username" autoFocus onChange={this.handleChange} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Mot de passe</InputLabel>
                            <Input name="password" type="password" autoComplete="current-password" onChange={this.handleChange} />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.login}
                        >
                            S'authentifier
                        </Button>
                        <br/>
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => {
                            alert("Pas encore implémeté !");
                          }}
                        >
                          Mot de passe oublié
                        </Link>
                        
                        <Snackbar
                            open={this.state.open}
                            onClose={this.handleClose}
                            autoHideDuration={5000}
                            message="Adresse Email ou mot de passe incorrect(s)"
                        />
                    </Paper>
                </main>
            );
        }
    }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);


