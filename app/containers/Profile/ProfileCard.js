import { Typography, withStyles } from '@material-ui/core';
import React from 'react';

const ProfileCard = ({ user, classes }) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h5" style={{ color: 'white' }}>
          Mon Profile
        </Typography>
      </div>
      <div className={classes.row}>
        <Typography className={classes.text}>Nom et prenom</Typography>
        <Typography className={classes.text}>{`${user.lastName} ${user.firstName}`}</Typography>
      </div>
      <div className={classes.row}>
        <Typography className={classes.text}>Titre</Typography>
        <Typography className={classes.text}>{user.role}</Typography>
      </div>
      <div className={classes.row}>
        <Typography className={classes.text}>CIN</Typography>
        <Typography className={classes.text}>{user.cin}</Typography>
      </div>
      <div className={classes.row}>
        <Typography className={classes.text}>Date de creation</Typography>
        <Typography className={classes.text}>{new Date(user.dateCreation).toLocaleDateString('fr')}</Typography>
      </div>
      <div className={classes.row}>
        <Typography className={classes.text}>Adresse email</Typography>
        <Typography className={classes.text}>{user.email}</Typography>
      </div>
      <div className={classes.row}>
        <Typography className={classes.text}>Telephone</Typography>
        <Typography className={classes.text}>{user.tel}</Typography>
      </div>
      <div className={classes.row}>
        <Typography className={classes.text}>GSM</Typography>
        <Typography className={classes.text}>{user.gsm}</Typography>
      </div>
      <div className={classes.row}>
        <Typography className={classes.text}>Adresse</Typography>
        <Typography className={classes.text}>{user.adresse}</Typography>
      </div>
      <div className={classes.row}>
        <Typography className={classes.text}>Ville</Typography>
        <Typography className={classes.text}>{user.ville ? user.ville.name : ''}</Typography>
      </div>
      <div className={classes.row}>
        <Typography className={classes.text}>Code postal</Typography>
        <Typography className={classes.text}>{user.codePostal}</Typography>
      </div>
      <div className={classes.row}>
        <Typography className={classes.text}>Region</Typography>
        <Typography className={classes.text}>{user.region ? user.region.name : ''}</Typography>
      </div>
    </div>
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
    backgroundColor: theme.palette.primary.main,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    '&:nth-child(even)': {
      backgroundColor: '#f7f7f7',
    },
    '&>*': {
      flex: 1,
    },
  },
  text: {
    fontWeight: '500',
    fontSize: '18px',
    '&:nth-child(odd)': {
      opacity: 0.7,
    },
    [theme.breakpoints.down(430)]: {
      fontSize: '15px',
    },
  },
});

export default withStyles(styles)(ProfileCard);
