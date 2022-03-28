import { Typography, withStyles } from '@material-ui/core';
import React from 'react';

const SmallCard = ({ title, value, backgroundColor, classes }) => {
  return (
    <div style={{ backgroundColor }} className={classes.SmallCard}>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.value}>{value}</Typography>
    </div>
  );
};

const styles = {
  SmallCard: {
    padding: '15px 17px',
    borderRadius: '6px',
    '&>*': {
      color: 'white',
    },
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '15px',
  },
  value: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: '20px',
  },
};
export default withStyles(styles)(SmallCard);
