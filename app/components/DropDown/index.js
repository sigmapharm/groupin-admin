import { ClickAwayListener, Divider, Grow, ListItemIcon, MenuItem, MenuList, Paper, Popper, Typography } from '@material-ui/core';
import React from 'react';

export const DropDown = ({ anchorEl, open, handleClose, children }) => {
  return (
    <Popper open={open} anchorEl={anchorEl} transition placement="bottom-start">
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          id="menu-list-grow"
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper style={{ zIndex: 100, borderRadius: 10, backgroundColor: '#d4deeb' }}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList>{children}</MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
