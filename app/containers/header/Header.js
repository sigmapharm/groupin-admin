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
import MonMenu from './MonMenu';
import { makeSelectUser } from '../App/selectors';
import { logout } from '../App/actions';

class Header extends React.PureComponent {
  handleLogout = () => {
    this.props.dispatch(logout());
  };

  render() {
    const { user, classes, position } = this.props;
    return (
      <AppBar className={classes.container} position={position}>
        <Toolbar>
          <div>
            <img alt="logo" src={logo} style={{ width: '90px' }} />
          </div>
          <MonMenu user={user} />
          {!!user && (
            <Fab
              color="primary"
              size="small"
              aria-label="Edit"
              onClick={this.handleLogout}
            >
              <LogoutIcon />
            </Fab>
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
