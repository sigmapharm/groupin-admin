import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

class FadeSnackbar extends React.Component {
  render() {
    return (
      <div>
        <Snackbar
          open
          onClose={this.handleClose}
          TransitionComponent={Fade}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id">Email ou mot de passe incorrect(s) !</span>
          }
        />
      </div>
    );
  }
}

export default FadeSnackbar;
