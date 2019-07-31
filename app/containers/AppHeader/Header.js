import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import logo from '../../images/logo-white.png';
import MyMenu from './MyMenu';
import { makeSelectUser } from '../App/selectors';
import { logout } from '../App/actions';
import WithRoles from '../WithRoles';

class Header extends React.PureComponent {
  handleLogout = () => {
    this.props.dispatch(logout());
  };

  render() {
    const { user, classes, position } = this.props;
    const { username, role } = user || {};
    return (
      <AppBar className={classes.container} position={position}>
        <Toolbar>
          <div>
            <img alt="logo" src={logo} style={{ width: '90px' }} />
          </div>
          <MyMenu user={user} />
          {!!user && (
            <>
              <span style={{ marginRight: '10px' }}>
                <i> {username || ''}</i>{ username && ' - '}
                <b>{(role || '').split('_').join(' ')}</b>{' '}
              </span>
              <Fab
                color="primary"
                size="small"
                aria-label="Logout"
                onClick={this.handleLogout}
              >
                <LogoutIcon />
              </Fab>
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
    height: '60px',
    justifyContent: 'center',
    flexGrow: 1,
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
)(Header);
