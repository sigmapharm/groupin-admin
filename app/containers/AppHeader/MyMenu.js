import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import history from 'utils/history';
import { MetaMenu } from './MetaMenu';
import WithRoles from '../WithRoles';

const onMenuItemClick = href => () => {
  history.push(href);
};

const MenuByRole = props => {
  const { classes } = props;
  return MetaMenu.map(menu => (
    <WithRoles key={menu.key} roles={menu.allowedRoles}>
      <Button key={menu.key} className={classes.button} classes={{ label: classes.label }} onClick={onMenuItemClick(menu.link)}>
        {menu.label}
      </Button>
    </WithRoles>
  ));
};

const MyMenu = props => {
  const { classes, user } = props;
  // console.log('user', user);
  return <div style={{ flexGrow: 1 }}>{user && <MenuByRole classes={classes} user={user} />}</div>;
};

MyMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const styles = () => ({
  label: {
    color: 'white',
    textTransform: 'Capitalize',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  button: {
    marginLeft: '20px',
  },
});

export default withStyles(styles)(MyMenu);
