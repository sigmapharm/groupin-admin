import React from 'react';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import Fade from '@material-ui/core/Fade/Fade';
import Button from '@material-ui/core/Button/Button';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default ({ title, open, onClose, onSuccess, onSuccessTitle }) =>
  open && (
    <div>
      <Snackbar
        open={open}
        TransitionComponent={Fade}
        onClose={onClose}
        message={<span id="message-id">{title}</span>}
        action={[
          onSuccessTitle ? (
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={onSuccess}
            >
              {onSuccessTitle}
            </Button>
          ) : (
            <></>
          ),
          <IconButton key="close" color="secondary" onClick={onClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
