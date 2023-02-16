import React, { useRef, useState } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import history from 'utils/history';
import { dropDownMenuList, MetaMenu } from './MetaMenu';
import WithRoles from '../WithRoles';
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { forwardRef } from 'react';
import { ADMIN, SUPER_ADMIN } from './Roles';

const onMenuItemClick = href => () => {
  if (href === '/offres' && history.location.search) {
    window.history.pushState({}, document.title, '/offres');
    window.history.go();
    return;
  }

  history.replace(href);
};

const MenuByRole = props => {
  const { classes } = props;
  return MetaMenu.map(menu => {
    return (
      <>
        <WithRoles key={menu.key} roles={menu.allowedRoles}>
          <Button
            key={menu.key}
            className={classes.button}
            classes={{ label: classes.label }}
            onClick={onMenuItemClick(menu.link)}
          >
            {menu.label}
          </Button>
        </WithRoles>
      </>
    );
  });
};

const RowComponent = forwardRef((props, ref) => {
  return (
    <Button buttonRef={ref} style={{ color: '#fff', textTransform: 'Capitalize', marginLeft: 20 }}>
      Référentiel
    </Button>
  );
});

const MyMenu = props => {
  const { classes, user } = props;
  const [open, setOpen] = useState(false);
  const anchorEl = useRef();
  const handleClose = () => {
    setOpen(false);
  };

  // console.log('user', user);
  return (
    <div style={{ flexGrow: 1 }}>
      {user && (
        <>
          <MenuByRole classes={classes} user={user} />
          <WithRoles roles={[ADMIN, SUPER_ADMIN]}>
            <Tippy
              theme="light"
              // visible={isTippyOpen}
              // onClickOutside={handleTippyToggle}
              trigger="click"
              interactive
              content={
                <div>
                  {dropDownMenuList.map(menu => {
                    return (
                      <>
                        <WithRoles key={menu.key} roles={menu.allowedRoles}>
                          <MenuItem>
                            <Button
                              key={menu.key}
                              // className={classes.button}
                              // classes={{ label: classes.label }}
                              onClick={onMenuItemClick(menu.link)}
                            >
                              {menu.label}
                            </Button>
                          </MenuItem>
                        </WithRoles>
                      </>
                    );
                  })}
                </div>
              }
            >
              <RowComponent />
            </Tippy>
          </WithRoles>
        </>
      )}
    </div>
  );
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
