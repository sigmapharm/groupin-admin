import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    backgroundColor: '#DB3B21',
    borderRadius: '0px',
    padding: theme.spacing.unit,
    color: '#ffffff',
  },
  text: {
    color: '#ffffff',
  },
});

const notEmpty = obj => Object.keys(obj).length > 0;

export function ErrorsArea(props) {
  const { errors, classes, prefix } = props;
  return (
    notEmpty(errors) && (
      <Paper className={classes.root}>
        <div>
          {prefix && (
            <Typography className={classes.text} variant="body1">
              {prefix}
            </Typography>
          )}
          <Typography className={classes.text} variant="body1" component="div">
            <ul>
              {Object.keys(errors).map(key => (
                <li key={key}>
                  {key} : {errors[key]}
                </li>
              ))}
            </ul>
          </Typography>
        </div>
      </Paper>
    )
  );
}

ErrorsArea.defaultProps = {};

ErrorsArea.propTypes = {
  prefix: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ErrorsArea);
