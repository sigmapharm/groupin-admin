import { Typography, withStyles } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import React, { useState } from 'react';
import Dialog from '../../components/Dialog';
import ResetPasswordForm from './ResetPasswordForm';

const handleValidation = values => {
  let errors = { newPassword: '', oldPassword: '', newPasswordConfirm: '' };
  let isError = false;
  const { newPassword, oldPassword, newPasswordConfirm } = values;
  if (!oldPassword) {
    errors.oldPassword = 'votre mot passe est obligatoir';
    isError = true;
  }
  if (!newPassword) {
    errors.newPassword = 'le nouveau mot passe est obligatoir';
    isError = true;
  }
  if (!newPasswordConfirm) {
    errors.newPasswordConfirm =
      'la confirmation de nouveau mot passe est obligatoir';
    isError = true;
  } else if (newPassword !== newPasswordConfirm) {
    errors.newPasswordConfirm =
      'la confirmation de nouveau mot passe est difirente';
    isError = true;
  }
  return [isError, errors];
};

const Raccoucis = ({ classes, handleRestPassword }) => {
  const [resetPasswordFormState, setResetPasswordFormState] = useState({
    newPassword: '',
    oldPassword: '',
    newPasswordConfirm: '',
  });
  const [open, setOpen] = useState();
  const [error, setError] = useState({});
  const toggleRestModal = () => setOpen(!open);
  const handleRestPasswordFormChange = (name, value) =>
    setResetPasswordFormState({ ...resetPasswordFormState, [name]: value });

  const handleRestPasswordSubmit = () => {
    const [isError, errors] = handleValidation(resetPasswordFormState);
    if (isError) {
      setError(errors);
      return;
    }
    handleRestPassword(resetPasswordFormState, toggleRestModal);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h5" style={{ color: 'white' }}>
            Raccourcis
          </Typography>
        </div>
        <div className={classes.row} onClick={toggleRestModal}>
          <Typography className={classes.text}>
            Réinitialiser le mot de passe
          </Typography>
          <ChevronRight className={classes.text} />
        </div>
      </div>

      <Dialog
        title="Réinitialiser le mot de passe"
        cancelTitle="Annuler"
        submitTitle="Réinitialiser"
        onSubmit={handleRestPasswordSubmit}
        open={open}
        onClose={toggleRestModal}
        style={{ minWidth: '400px', maxWidth: '96%', margin: '0 auto' }}
      >
        <ResetPasswordForm
          handleChange={handleRestPasswordFormChange}
          errors={error}
        />
      </Dialog>
    </>
  );
};

const styles = theme => ({
  container: {
    boxShadow: '0 16px 30px 0 rgba(0,0,0,0.07)',
    borderRadius: '6px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: '#276955',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 20px',
    cursor: 'pointer',
  },
  text: {
    fontWeight: '500',
    color: 'blue',
    opacity: 0.7,
  },
});

export default withStyles(styles)(Raccoucis);
