import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MembreMenu = ({ classes }) => (
  <div style={{ flexGrow: 1 }}>
    <Button
      href="#"
      className={classes.button}
      classes={{ label: classes.label }}
    >
      Offres
    </Button>
    <Button
      href="#"
      className={classes.button}
      classes={{ label: classes.label }}
    >
      Mes Commandes
    </Button>
  </div>
);

const AdminMenu = ({ classes }) => (
  <div style={{ flexGrow: 1 }}>
    <Button
      href="#"
      className={classes.button}
      classes={{ label: classes.label }}
    >
      Utilisateurs
    </Button>
    <Button
      href="#"
      className={classes.button}
      classes={{ label: classes.label }}
    >
      Offres
    </Button>
    <Button
      href="#"
      className={classes.button}
      classes={{ label: classes.label }}
    >
      Commandes
    </Button>
  </div>
);

const SuperAdminMenu = ({ classes }) => (
  <div style={{ flexGrow: 1 }}>
    <Button
      href="#"
      className={classes.button}
      classes={{ label: classes.label }}
    >
      Utilisateurs
    </Button>
    <Button
      href="#"
      className={classes.button}
      classes={{ label: classes.label }}
    >
      Référentiels
    </Button>
    <Button
      href="#"
      className={classes.button}
      classes={{ label: classes.label }}
    >
      Offres
    </Button>
    <Button
      href="#"
      className={classes.button}
      classes={{ label: classes.label }}
    >
      Commandes
    </Button>
  </div>
);

const MonMenu = props => {
  const { classes, user } = props;
  if (user) {
    switch (user.role) {
      case 'ADMIN': {
        return <AdminMenu classes={classes} />;
      }
      case 'SUPER_ADMIN': {
        return <SuperAdminMenu classes={classes} />;
      }
      case 'MEMBRE': {
        return <MembreMenu classes={classes} />;
      }
      default: {
        return null;
      }
    }
  }
  return null;
};

const styles = () => ({
  label: {
    color: 'white',
  },
  button: {
    marginLeft: '50px',
  },
});

export default withStyles(styles)(MonMenu);
