import { Grid, Snackbar, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import authenticated from '../HOC/authenticated/authenticated';
import { getProfile, resetPassword } from '../Users/actions';
import { makeSelectUserProfile } from '../Users/selectors';
import ProfileCard from './ProfileCard';
import Raccoucis from './Raccoucis';

const Profile = ({ classes, userProfil, dispatch }) => {
  const [restPasswordMessage, setRestPasswordMessage] = useState({
    title: '',
    visibale: false,
  });
  useEffect(() => {
    dispatch(getProfile(() => {}));
  }, []);
  const toggleShowBar = (title = '', visibale = false) =>
    setRestPasswordMessage({
      title,
      visibale,
    });
  const handleRestPassword = (payload, closeModal) => {
    dispatch(
      resetPassword(payload, err => {
        if (err)
          setRestPasswordMessage({
            visibale: true,
            title: 'error',
          });
        else {
          setRestPasswordMessage({
            visibale: true,
            title: 'mot de passe réinitialisée avec sucsse',
          });
          closeModal();
        }
      }),
    );
  };
  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid lg={8} md={12} sm={12} xs={12} item>
            <ProfileCard user={userProfil} />
          </Grid>
          <Grid lg={4} md={12} sm={12} xs={12} item>
            <Raccoucis handleRestPassword={handleRestPassword} />
          </Grid>
        </Grid>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={restPasswordMessage.visibale}
        autoHideDuration={6000}
        onClose={() => toggleShowBar()}
        ContentProps={{ 'aria-describedby': 'message-id' }}
        message={<span id="message-id">{restPasswordMessage.title}</span>}
      />
    </div>
  );
};

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1200px',
    width: '100%',
    padding: '30px 17px',
  },
});
const mapDispatchToProps = dispatch => ({
  dispatch,
});
const mapStateToProps = createStructuredSelector({
  userProfil: makeSelectUserProfile(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(Profile);
