import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import Fab from '@material-ui/core/Fab/Fab';
import SearchIcon from '@material-ui/icons/Search';

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
  filtersSection: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textField: {
    marginRight: theme.spacing.unit * 3,
    width: 200,
  },
  button: {
    //  margin: theme.spacing.unit,
  },
  select: {
    marginTop: theme.spacing.unit * 2,
    width: 250,
  },
});

export default withStyles(styles)(({ classes, fields = [], onSearch, isGrouped }) => (
  <div className={classes.root}>
    <Typography component="h1" variant="h6">
      Recherche
    </Typography>
    <div className={classes.filtersSection}>
      {isGrouped
        ? fields
            .filter((field, index) => (field.isGrouped ? field : null))
            .map((field, index) => (
              <TextField
                key={index}
                name={field.name}
                label={field.label}
                type={field.type}
                onChange={field.onChange}
                className={classes.textField}
                margin="normal"
              />
            ))
        : fields.map((field, index) => (
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
