import React from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default ({
  title,
  open,
  onClose,
  onSubmit,
  children,
  showBtns = true,
  submitTitle,
  cancelTitle,
}) => (open ?  (
    <Dialog
      open={open}
      maxWidth="lg"
      onClose={onClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
    >
      <DialogTitle disableTypography>
        <Typography
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          variant="h5"
          color="primary"
        >
          <span>{title}</span>
          <IconButton color="primary" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      {showBtns && (
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={onClose}
          >
            {cancelTitle}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            {submitTitle}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  ) : (
    <></>
  ))
