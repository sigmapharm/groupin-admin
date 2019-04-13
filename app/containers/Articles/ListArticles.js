import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import ResetIcon from '@material-ui/icons/SettingsBackupRestore';
import { compose } from 'redux';
import Divider from '@material-ui/core/Divider';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import SearchIcon from '@material-ui/icons/Search';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import reducer from './reducer';
import saga from './saga';
import{
  makeSelectArticlesList,
  makeSelectPage,
  makeSelectRowsPerPage,
  makeSelectNom,
  makeSelectcategorie,
  makeSelectPPH,
  makeSelectPPV,
  makeSelectTVA,
}from './selectors';
import { getArticlesList } from './actions';
import Toggle from '../../components/Toggle/Toggle';
import authenticated from '../HOC/authenticated/authenticated';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

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
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;
    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true,
})(TablePaginationActions);

class ListeArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      categorie:'',
      nom:'',
      PPH:0.00,
      PPV:0.00,
      TVA:'',

    };
  }

  componentDidMount() {
    this.props.dispatch(getArticlesList(this.state));
  }

  handleChangePage = (event, page) => {
    this.setState({ page },() =>
      this.props.dispatch(getArticlesList(this.state)),
    );
  };


  handleChangeRowsPerPage = event => {
    this.setState({page: 0, rowsPerPage: parseInt(event.target.value, 10) }, () =>
      this.props.dispatch(getArticlesList(this.state)),
    );
  };

  handleSearchArticles = () => {
    this.props.dispatch(getArticlesList(this.state));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const {rowsPerPage, page } = this.state;
    const {classes,articlesList} = this.props;
    const totalElements = articlesList.totalElements ? articlesList.totalElements : 0;
    const rows = articlesList.content;
    console.log("RENDER :", rows);
    return (
      <div>
        <Typography component="h1" variant="h4" className={classes.root}>
          Liste des articles
        </Typography>
        <Divider variant="middle" className={classes.root} />
        <form className={classes.root}>
          <Typography component="h1" variant="h6">
            Recherche
          </Typography>


          <TextField
            name=""
            label="Laboratoired'article "
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange}
          />
          <TextField
            name="categorie"
            label="Catégorie d'article"
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange}
          />
          <TextField
            name="nom"
            label="Désignation d'article"
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange}
          />


          <Fab
            color="primary"
            className={classes.button}
            onClick={this.handleSearchArticles}
          >
            <SearchIcon />
          </Fab>
        </form>

        <Divider variant="middle" className={classes.root} />

        <Typography component="h1" variant="h6" className={classes.root}>
          {totalElements} Articles trouvés
        </Typography>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Laboratoire</TableCell>
                <TableCell>Catégorie</TableCell>
                <TableCell>Désignation</TableCell>
                <TableCell>PPH</TableCell>
                <TableCell>PPV</TableCell>
                <TableCell>TVA</TableCell>
               <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {rows &&
                rows.map(row => (

                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {}</TableCell>
                    <TableCell>{row.categorie}</TableCell>
                    <TableCell>{row.nom}</TableCell>
                    <TableCell>{row.pph}</TableCell>
                    <TableCell>{row.ppv}</TableCell>
                    <TableCell >{row.tva}</TableCell>
                      <TableCell>
                      <EditIcon color="primary" />
                      <ResetIcon color="primary" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  colSpan={3}
                  count={totalElements}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  labelRowsPerPage="Nombre des articles par page : "
                  labelDisplayedRows={({ from, to, count }) =>
                    `De ${from} à ${to} sur ${count} articles`
                  }
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </div>
    );
  }
}

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  articlesList:makeSelectArticlesList(),
  page:makeSelectPage(),
  rowsPerPage:makeSelectRowsPerPage(),
  categorie:makeSelectcategorie(),
  nom:makeSelectNom(),
  PPH:makeSelectPPH(),
  PPV:makeSelectPPV(),
  TVA:makeSelectTVA(),

});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer =injectReducer({ key:'articles', reducer });
const withSaga = injectSaga({ key:'articles', saga });

ListeArticles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
 authenticated,
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(ListeArticles);
