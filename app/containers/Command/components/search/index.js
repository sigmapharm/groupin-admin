import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import Fab from '@material-ui/core/Fab/Fab';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: '10%',
  },
  filtersSection: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  select: {
    marginTop: theme.spacing.unit * 2,
    width: 250,
  },
});

export default withStyles(styles)(({ classes, fields = [], onSearch }) => (
  <div className={classes.root}>
    <Typography component="h1" variant="h6">
      Recherche
    </Typography>
    <div className={classes.filtersSection}>
      {fields.map((field, index) => (
        <TextField
          key={index}
          name={field.name}
          label={field.label}
          type={field.type}
          onChange={field.onChange}
          className={classes.textField}
          margin="normal"
        />
      ))}

      <Fab onClick={onSearch} color="primary" className={classes.button}>
        <SearchIcon />
      </Fab>
    </div>
  </div>
));
