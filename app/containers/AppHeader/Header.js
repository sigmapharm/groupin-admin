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
import { makeSelectgetActiveAlert } from '../Alerts/selectors';
import { getActiveAlert } from '../Alerts/actions';

//anchorEl: null,

const InfoSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#fff"
    style={{ width: 30, height: 30 }}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
    />
  </svg>
);

const WArnningSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#fff"
    style={{ width: 30, height: 30 }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>
);

const DangerSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#fff"
    style={{ width: 30, height: 30 }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>
);

const AlertTheme = {
  WARNNING: { color: '#d97706', backgroundColor: '#fffbeb', svg: WArnningSvg },
  INFO: { color: '#0369a1', backgroundColor: '#f0f9ff', svg: InfoSvg },
  DANGER: { color: '#b91c1c', backgroundColor: '#fef2f2', svg: DangerSvg },
};

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

  componentDidMount() {
    this.props.dispatch(getActiveAlert());
  }

  render() {
    const { user, classes, position, width, activeAlert } = this.props;
    const { username, role, region } = user || {};
    const { open } = this.state;
    const isSmallDevice = isWidthDown('md', width);

    return (
      <>
        {activeAlert && activeAlert.is_active && role === 'MEMBRE' ? (
          <div
            style={{
              width: '100%',
              height: '40px',
              backgroundColor: AlertTheme[activeAlert.alert_type].backgroundColor,
              color: AlertTheme[activeAlert.alert_type].color,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '19px',
              borderBottom: '1.5px solid #0369a1',
            }}
          >
            {AlertTheme[activeAlert.alert_type].svg}

            <span style={{ marginLeft: 10 }}> {activeAlert.message} </span>
          </div>
        ) : null}

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
      </>
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
  activeAlert: makeSelectgetActiveAlert(),
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
