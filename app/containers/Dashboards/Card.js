import { Typography, withStyles } from '@material-ui/core';
import React from 'react';

const Card = ({ title, items, backgroundColor, classes }) => {
  return (
    <div style={{ backgroundColor }} className={classes.card}>
      <Typography className={classes.title}>{title}</Typography>
      {items &&
        items.map(({ label, value }) => (
          <div className={classes.item} key={label}>
            <Typography
            //style={{ marginRight: '10px' }}
            >{`${label}`}</Typography>
            <Typography>{value}</Typography>
          </div>
        ))}
    </div>
  );
};

const styles = {
  card: {
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
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px 0',
    '&>*': {
      color: 'white',
      fontSize: '16px',
      fontWeight: '500',
    },
  },
};
export default withStyles(styles)(Card);
