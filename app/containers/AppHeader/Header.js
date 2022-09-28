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
import logo from '../../images/groupinLogos/Logo_Blanc2.png';
import MyMenu from './MyMenu';
import { makeSelectUser } from '../App/selectors';
import { logout } from '../App/actions';
import MenuIcon from '@material-ui/icons/Menu';
import { Divider, IconButton, Typography } from '@material-ui/core';
import SideBar from './SideBar';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import history from 'utils/history';

//anchorEl: null,
class Header extends React.Component {
  state = { darwerVisible: false, profileMenu: false, open: false };

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
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };
  handleLogout = () => {
    this.props.dispatch(logout());
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  // toogle button

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { user, classes, position, width } = this.props;
    const { username, role, region } = user || {};
    const { open } = this.state;
    const isSmallDevice = isWidthDown('md', width);

    return (
      <AppBar className={classes.container} position={position}>
        <Toolbar className={classes.toolbar}>
          <div>
            {isSmallDevice && user.username ? (
              <IconButton className={classes.menuButton} color="inherit" onClick={this.toggleDrawer}>
                <MenuIcon />
              </IconButton>
            ) : null}
            <img alt="logo" src={logo} style={{ width: '90px', cursor: 'pointer' }} onClick={() => history.push('/')} />
          </div>

          {isSmallDevice ? <SideBar visibale={this.state.darwerVisible} toggle={this.toggleDrawer} /> : <MyMenu user={user} />}

          {user.username && (
            <>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                color="inherit"
                style={{ marginLeft: 'auto' }}
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                onClick={this.handleToggle}
              >
                <AccountCircle height={32} width={32} />
              </IconButton>
              <Popper open={open} anchorEl={this.anchorEl} transition placement="bottom-end">
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper className={classes.menuContainer} style={{ zIndex: 100 }}>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList>
                          <Typography className={classes.textMenu}>{username}</Typography>
                          <Divider />
                          <Typography className={classes.textMenu} style={{ textTransform: 'lowercase' }}>
                            {role}
                          </Typography>
                          <Divider />
                          <MenuItem onClick={this.handleProfileLinkClick}>
                            <ListItemIcon>
                              <Person />
                            </ListItemIcon>
                            <Typography>Profile</Typography>
                          </MenuItem>
                          <MenuItem onClick={this.handleLogout}>
                            <ListItemIcon>
                              <LogoutIcon />
                            </ListItemIcon>
                            <Typography> Deconnecter </Typography>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
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
    maxWidth: '1400px',
    width: '100%',
    padding: '0 17px',
  },
  menuButton: {
    marginRight: 10,
  },
  textMenu: {
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'none',
    textAlign: 'center',
    padding: 5,
  },
  menuContainer: {
    borderRadius: 10,
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

//     <Menu
//   anchorEl={this.state.anchorEl}
//   anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//   transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//   open={this.state.profileMenu}
//   onClose={this.toggleProfileMenu}
//   style={{ paddingTop: 0 }}
// >
//   <MenuItem
//     style={{
//       borderBottom: '0.5px solid #4c4c4c',
//       padding: '20px 11px',
//     }}
//   >
//     <div style={{ textAlign: 'center' }}>
//       <Typography className={classes.textMenu}>{username}</Typography>
//       <Typography className={classes.textMenu}>{region}</Typography>
//       <Typography className={classes.textMenu}>{role}</Typography>
//     </div>
//   </MenuItem>
//   <MenuItem onClick={this.handleProfileLinkClick}>
//     <Person style={{ marginRight: '10px' }} />
//     Profil
//   </MenuItem>
//   <MenuItem onClick={this.handleLogout}>
//     <LogoutIcon style={{ marginRight: '10px' }} />
//     Deconnecter
//   </MenuItem>
// </Menu>
