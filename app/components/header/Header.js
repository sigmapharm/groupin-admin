import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../../images/logo-white.png";
import Fab from '@material-ui/core/Fab';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import MonMenu from './MonMenu';
import AuthHelperMethods from "../../containers/Login/AuthHelperMethods";

class Header extends Component {

  Auth = new AuthHelperMethods();

  state = {
    connected: false,
    role: null
  };

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
    this.setState({
      connected: false,
      role: null
    });
  }

  componentDidMount() {
    if(this.Auth.loggedIn()) {
      this.setState({
        connected: true,
        role: this.Auth.getConfirm().user.role
      });
    }
  }

  render(){
    return (
      <AppBar position={this.props.position}>
        <Toolbar>
          <div>
            <img alt="logo" src={logo} style={{ width: "90px" }} />
          </div>
          <MonMenu role={this.state.role} />
          <Fab color="primary" size="small" aria-label="Edit" onClick={this._handleLogout} >
            <LogoutIcon />
          </Fab>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = theme => ({
  container: {
    height: "60px",
    justifyContent: "center",
    flexGrow: 1
  }
});

export default withStyles(styles)(Header);
