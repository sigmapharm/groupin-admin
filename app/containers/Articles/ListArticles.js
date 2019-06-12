import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import Divider from '@material-ui/core/Divider';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import history from 'utils/history';
import AddIcon from '@material-ui/icons/Add';

import { makeSelectArticlesList } from './selectors';
import { getArticlesList } from './actions';
import authenticated from '../HOC/authenticated/authenticated';
import ArticlesListTableRow from './list/ArticlesListTableRow';
import ArticlesListTableFooter from './list/ArticlesListTableFooter';
import ArticlesListSearch from './list/ArticlesListSearch';
import ArticlesListTableHeader from './list/ArticlesListTableHeader';

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginLeft: '10%',
  },
  table: {
    minWidth: 700,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  addArticlesButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class ListeArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      categorie: '',
      nom: '',
      pph: '',
      ppv: '',
      tva: '',
      laboratoire: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(getArticlesList(this.state));
  }

  handleChangePage = (event, page) => {
    this.setState({ page }, () =>
      this.props.dispatch(getArticlesList(this.state)),
    );
  };

  handleChangeRowsPerPage = event => {
    this.setState(
      { page: 0, rowsPerPage: parseInt(event.target.value, 10) },
      () => this.props.dispatch(getArticlesList(this.state)),
    );
  };

  handleSearchArticles = () => {
    this.props.dispatch(getArticlesList(this.state));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleArticlesAddClick = () => {
    history.push('/articles/add');
  };

  render() {
    const { rowsPerPage, page } = this.state;
    // eslint-disable-next-line react/prop-types
    const { classes, articlesList } = this.props;
    const totalElements = articlesList.totalElements
      ? articlesList.totalElements
      : 0;
    const rows = articlesList.content;
    const deletearticle = articlesList.content;
    return (
      <div>
        <Typography component="h1" variant="h4" className={classes.root}>
          Liste des articles
        </Typography>
        <Divider variant="middle" className={classes.root} />
        <ArticlesListSearch
          handleChange={this.handleChange}
          handleSearchArticle={this.handleSearchArticles}
        />

        <Divider variant="middle" className={classes.root} />

        <Typography component="h1" variant="h6" className={classes.root}>
          {totalElements} Articles trouvés
        </Typography>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <ArticlesListTableHeader />
            </TableHead>

            <TableBody>
              {rows &&
                rows.map(row => (
                  <ArticlesListTableRow
                    key={row.id}
                    row={row}
                    deletearticle={deletearticle}
                  />
                ))}
            </TableBody>
            <ArticlesListTableFooter
              totalElements={totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              handleChangePage={this.handleChangePage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Table>
        </Paper>
        <Fab
          color="primary"
          className={classes.addArticlesButton}
          onClick={this.handleArticlesAddClick}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  articlesList: makeSelectArticlesList(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

ListeArticles.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(ListeArticles);
