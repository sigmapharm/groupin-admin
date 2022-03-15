import {
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

const ResetPasswordForm = ({ handleChange, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? 'text' : 'password';
  return (
    <div style={{ maxWidth: '470px' }}>
      <TextField
        name="oldPassword"
        label="Votre mot passe*"
        type={inputType}
        onChange={({ target: { name, value } }) => handleChange(name, value)}
        fullWidth
        error={!!errors.oldPassword}
      />
      {errors.oldPassword && (
        <FormHelperText error>{errors.oldPassword}</FormHelperText>
      )}
      <div style={{ height: '17px' }} />
      <TextField
        name="newPassword"
        label="Nouveau mot de passe*"
        type={inputType}
        onChange={({ target: { name, value } }) => handleChange(name, value)}
        fullWidth
        error={!!errors.newPassword}
      />
      {errors.newPassword && (
        <FormHelperText error>{errors.newPassword}</FormHelperText>
      )}
      <div style={{ height: '17px' }} />
      <TextField
        name="newPasswordConfirm"
        label="Confirmer le nouveau mot de passe*"
        type={inputType}
        onChange={({ target: { name, value } }) => handleChange(name, value)}
        fullWidth
        error={!!errors.newPasswordConfirm}
      />
      {errors.newPasswordConfirm && (
        <FormHelperText error>{errors.newPasswordConfirm}</FormHelperText>
      )}
      <div style={{ height: '27px' }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={showPassword}
          onChange={(e, v) => setShowPassword(v)}
          name="showPassword"
          style={{ marginRight: '10px', padding: 0 }}
        />
        <Typography htmlFor="showPassword" component="label">
          Afficher le mot de passe
        </Typography>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
