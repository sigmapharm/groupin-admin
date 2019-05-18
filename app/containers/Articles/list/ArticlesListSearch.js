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
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginLeft: '10%',
  },
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

export class ArticlesListSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, handleChange, handleSearchArticle } = this.props;
    // eslint-disable-line
    return (
      <form className={classes.root}>
        <Typography component="h1" variant="h6">
          Recherche
        </Typography>
        <TextField
          name="laboratoire"
          label="Laboratoire"
          className={classes.textField}
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="categorie"
          label="Catégorie d'article"
          className={classes.textField}
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          name="nom"
          label="Désignation d'article"
          className={classes.textField}
          margin="normal"
          onChange={handleChange}
        />
        <Fab
          color="primary"
          className={classes.button}
          onClick={handleSearchArticle}
        >
          <SearchIcon/>
        </Fab>
      </form>
    );
  }
}

ArticlesListSearch.defaultProps = {};

ArticlesListSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  // handleSearchArticles: PropTypes.func.isRequired,
};

export default compose(withStyles(styles))(ArticlesListSearch);
