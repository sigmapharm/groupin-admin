import React from 'react';
import * as PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectGlobalLoaderStatus } from '../App/selectors';

/* istanbul ignore next */
const styles = () => ({
  dialogRoot: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
});

export function GlobalLoadingDialog(props) {
  const { open, classes } = props;
  return (
    <Dialog
      className={classes.dialogRoot}
      PaperProps={{
        classes: {
          root: classes.paper,
        },
      }}
      open={open}
      fullWidth
    >
      <CircularProgress size={100} color="primary" />
    </Dialog>
  );
}

GlobalLoadingDialog.defaultProps = {
  open: false,
};

GlobalLoadingDialog.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  open: makeSelectGlobalLoaderStatus(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  withStyles(styles),
)(GlobalLoadingDialog);
