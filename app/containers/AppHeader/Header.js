import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Person from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import logo from '../../images/logo-white.png';
import MyMenu from './MyMenu';
import { makeSelectUser } from '../App/selectors';
import { logout } from '../App/actions';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Typography } from '@material-ui/core';
import SideBar from './SideBar';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
class Header extends React.Component {
  state = { darwerVisible: false, profileMenu: false, anchorEl: null };

  toggleDrawer = () => {
    this.setState({
      ...this.state,
      darwerVisible: !this.state.darwerVisible,
    });
  };
  toggleProfileMenu = e => {
    this.setState({
      ...this.state,
      profileMenu: !this.state.profileMenu,
      anchorEl: e.currentTarget,
    });
  };
  handleProfileLinkClick = () => {
    this.props.history.push('profile');
  };
  handleLogout = () => {
    this.props.dispatch(logout());
  };
  render() {
    const { user, classes, position, width } = this.props;
    const { username, role, region } = user || {};
    const isSmallDevice = isWidthDown('md', width);
    return (
      <AppBar className={classes.container} position={position}>
        <Toolbar className={classes.toolbar}>
          <div>
            {isSmallDevice && user.username ? (
              <IconButton
                className={classes.menuButton}
                color="inherit"
                onClick={this.toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
            <img alt="logo" src={logo} style={{ width: '90px' }} />
          </div>

          {isSmallDevice ? (
            <SideBar
              visibale={this.state.darwerVisible}
              toggle={this.toggleDrawer}
            />
          ) : (
            <MyMenu user={user} />
          )}

          {user.username && (
            <>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.toggleProfileMenu}
                color="inherit"
                style={{ marginLeft: 'auto' }}
              >
                <AccountCircle height={32} width={32} />
              </IconButton>
              <Menu
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={this.state.profileMenu}
                onClose={this.toggleProfileMenu}
                style={{ paddingTop: 0 }}
              >
                <MenuItem
                  style={{
                    borderBottom: '0.5px solid #4c4c4c',
                    padding: '20px 11px',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <Typography className={classes.textMenu}>
                      {username}
                    </Typography>
                    <Typography className={classes.textMenu}>
                      {region}
                    </Typography>
                    <Typography className={classes.textMenu}>{role}</Typography>
                  </div>
                </MenuItem>
                <MenuItem onClick={this.handleProfileLinkClick}>
                  <Person style={{ marginRight: '10px' }} />
                  Profil
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>
                  <LogoutIcon style={{ marginRight: '10px' }} />
                  Deconnecter
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  position: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const styles = () => ({
  container: {
    height: '70px',
    justifyContent: 'center',
    flexGrow: 1,
    boxShadow: 'none',
  },
  toolbar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1200px',
    width: '100%',
    padding: '0 17px',
  },
  menuButton: {
    marginRight: 20,
  },
  textMenu: {
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});
const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
  withWidth(),
)(Header);
