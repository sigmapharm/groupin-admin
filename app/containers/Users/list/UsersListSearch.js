import React from 'react';
import * as PropTypes from 'prop-types';

import { compose } from 'redux';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AllInbox from '@material-ui/icons/PrintOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginLeft: '10%',
  },
  textField: {
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

export class UsersListSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, handleChange, handleSearchUsers, handleExportCsv } = this.props; // eslint-disable-line
    return (
      <form className={classes.root}>
        <Typography component="h1" variant="h6">
          Recherche
        </Typography>
        <TextField name="prenom" label="Prénom" className={classes.textField} margin="normal" onChange={handleChange} />
        <TextField name="nom" label="Nom" className={classes.textField} margin="normal" onChange={handleChange} />
        <TextField name="pharmacie" label="Pharmacie" className={classes.textField} margin="normal" onChange={handleChange} />
        <TextField name="region" label="Region" className={classes.textField} margin="normal" onChange={handleChange} />
        <Fab color="primary" className={classes.button} onClick={handleSearchUsers}>
          <SearchIcon />
        </Fab>

        <a onClick={handleExportCsv}>
          <Fab color="primary" className={classes.button}>
            <AllInbox />
          </Fab>
        </a>
      </form>
    );
  }
}

UsersListSearch.defaultProps = {};

UsersListSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearchUsers: PropTypes.func.isRequired,
  handleExportCsv: PropTypes.func.isRequired,
};

export default compose(withStyles(styles))(UsersListSearch);
