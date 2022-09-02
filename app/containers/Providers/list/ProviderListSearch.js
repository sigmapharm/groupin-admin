import React from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
    overflowX: 'auto',
    marginLeft: '15%',
  },
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    width: 400,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

export class ProviderListSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, handleChange, handleSearchProvider } = this.props;
    // eslint-disable-line
    return (
      <form className={classes.root}>
        <Typography component="h1" variant="h6">
          Recherche
        </Typography>
        <TextField
          name="fullName"
          label="fullName"
          noValidate
          autoComplete="off"
          className={classes.textField}
          margin="normal"
          onChange={handleChange}
        />

        <Fab color="primary" className={classes.button} onClick={handleSearchProvider}>
          <SearchIcon />
        </Fab>
      </form>
    );
  }
}

ProviderListSearch.defaultProps = {};

ProviderListSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default compose(withStyles(styles))(ProviderListSearch);
