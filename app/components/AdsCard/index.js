import { withStyles } from '@material-ui/core';
import React from 'react';
import { compose } from 'redux';

const AdsCard = ({ classes }) => {
  return (
    <div className={classes.card}>
      <div className={classes.ads}>ads</div>
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
    padding: '0 17px',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,1fr)',
    gap: '20px',
    padding: '20px 0',
    [theme.breakpoints.down(780)]: {
      gridTemplateColumns: 'repeat(2,1fr)',
    },
    [theme.breakpoints.down(480)]: {
      gridTemplateColumns: 'repeat(1,1fr)',
    },
  },
  card: {
    padding: '20px 25px ',
    backgroundColor: 'white',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.03)',
    borderRadius: '6px',
    cursor: 'pointer',
    position: 'relative',
    textAlign: 'center',
    transition: '0.3s all ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  ads: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 5,
    border: '1px solid black',
  },
});

export default compose(withStyles(styles))(AdsCard);
