import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import history from 'utils/history';
import WithRoles from '../WithRoles';
import { MetaMenu } from './MetaMenu';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class SideBar extends React.Component {
  onMenuItemClick = href => () => {
    history.push(href);
    this.props.toggle();
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Drawer open={this.props.visibale} onClose={this.props.toggle}>
          <div tabIndex={0} role="button">
            <div className={classes.fullList}>
              <List>
                {MetaMenu.map(menu => (
                  <WithRoles key={menu.key} roles={menu.allowedRoles}>
                    {/* <Button
                      key={menu.key}
                      className={classes.button}
                      classes={{ label: classes.label }}
                      onClick={onMenuItemClick(menu.link)}
                    >
                      {menu.label}
                    </Button> */}
                    <ListItem button>
                      <ListItemText
                        primary={menu.label}
                        onClick={this.onMenuItemClick(menu.link)}
                      />
                    </ListItem>
                  </WithRoles>
                ))}
              </List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);
