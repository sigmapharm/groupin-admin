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
import _ from 'lodash';

import { makeSelectArticlesList } from './selectors';
import { deleteArticle, getArticlesList } from './actions';
import authenticated from '../HOC/authenticated/authenticated';
import ArticlesListTableRow from './list/ArticlesListTableRow';
import ArticlesListTableFooter from './list/ArticlesListTableFooter';
import ArticlesListSearch from './list/ArticlesListSearch';
import ArticlesListTableHeader from './list/ArticlesListTableHeader';
import InfoBar from '../../components/Snackbar/InfoBar';
import GeneriqueDialog from '../../components/Alert';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    maxWidth: '1200px',
    width: '100%',
    margin: '20px auto',
    overflow: 'auto',
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
      showInfoBar: false,
      infoBarParams: {},
      showPopConfirmation: false,
      popConfirmationParams: {},
      cols: [
        {
          label: 'Laboratoire',
          colName: 'laboratory.nom',
          selected: false,
          order: 'asc',
        },
        {
          label: 'Catégorie',
          selected: false,
          colName: 'categorie',
          order: 'asc',
        },
        {
          label: 'Désignation',
          colName: 'nom',
          selected: false,
          order: 'asc',
        },
        {
          label: 'PPH',
          colName: 'PPH',
          selected: false,
          order: 'asc',
        },
        {
          label: 'PPV',
          colName: 'PPV',
          selected: false,
          order: 'asc',
        },
        {
          label: 'TVA',
          colName: 'TVA',
          selected: false,
          order: 'asc',
        },
      ],
    };
  }

  componentDidMount() {
    this.loadArticles();
  }

  openPopConfirmation = ({ title, textContent, onClose, onSubmit }) => {
    this.setState({
      showPopConfirmation: true,
      popConfirmationParams: {
        title,
        textContent,
        onClose,
        onSubmit,
      },
    });
  };

  performDeleteCommand = article => () => {
    this.openPopConfirmation({
      title: 'Suppression',
      textContent: 'Êtes-vous sûr de supprimer cet article ? ',
      onClose: this.closePopConfirmation,
      onSubmit: this.deleteArticle(article),
    });
  };

  closePopConfirmation = () => {
    this.setState({
      showPopConfirmation: false,
      popConfirmationParams: {},
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page }, () => this.loadArticles());
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) }, () => this.loadArticles());
  };

  deleteArticle = article => () => {
    this.props.dispatch(
      deleteArticle(article.id, err => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title: "La suppression de l'article a echoue  ",
            },
          });
        } else {
          // eslint-disable-next-line no-unused-expressions
          this.handleSearchArticles();
        }
        this.closePopConfirmation();
      }),
    );
  };

  handleSearchArticles = () => {
    this.loadArticles();
  };

  loadArticles() {
    this.props.dispatch(
      getArticlesList(this.state, err => {
        if (err) {
          this.setState({
            showPopConfirmation: false,
            showInfoBar: true,
            infoBarParams: {
              title: "Le chargement des articles à échoué merci de contacter l'administrateur ",
            },
          });
        }
      }),
    );
  }

  changeColumnSort = () => index => () => {
    let { cols } = this.state;
    const { [index]: col } = cols;
    cols = cols.map((a, i) => ({
      ...a,
      selected: false,
      order: i === index ? a.order : 'asc',
    }));
    this.setState(
      {
        ...this.state,
        cols: _.merge([], cols, {
          [index]: { order: col.order === 'desc' ? 'asc' : 'desc', selected: true },
        }),
      },
      this.loadArticles,
    );
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleArticlesAddClick = () => {
    history.push('/articles/add');
  };

  closeInfoBar = () => this.setState({ showInfoBar: false, infoBarParams: {} });

  render() {
    const { rowsPerPage, page, showInfoBar, infoBarParams, showPopConfirmation, popConfirmationParams, cols } = this.state;
    // eslint-disable-next-line react/prop-types
    console.log(this.props);
    const { classes, articlesList } = this.props;
    const totalElements = articlesList.totalElements ? articlesList.totalElements : 0;
    const rows = articlesList.content;
    const deletearticle = articlesList.content;
    return (
      <div>
        <Typography component="h1" variant="h4" className={classes.root} style={{ overflow: 'hidden' }}>
          Liste des articles
        </Typography>
        <Divider variant="middle" className={classes.root} />
        <ArticlesListSearch handleChange={this.handleChange} handleSearchArticle={this.handleSearchArticles} />

        <Divider variant="middle" className={classes.root} />

        <Typography component="h1" variant="h6" className={classes.root}>
          {totalElements} Articles trouvés
        </Typography>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <ArticlesListTableHeader cols={cols} changeHandler={this.changeColumnSort()} />
            </TableHead>

            <TableBody>
              {rows &&
                rows.map(row => <ArticlesListTableRow key={row.id} row={row} deleteArticle={this.performDeleteCommand(row)} />)}
            </TableBody>
            <ArticlesListTableFooter
              totalElements={totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              handleChangePage={this.handleChangePage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Table>
          <InfoBar open={showInfoBar} onClose={this.closeInfoBar} {...infoBarParams} />
          <GeneriqueDialog open={showPopConfirmation} {...popConfirmationParams} />
        </Paper>
        <Fab color="primary" className={classes.addArticlesButton} onClick={this.handleArticlesAddClick}>
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
