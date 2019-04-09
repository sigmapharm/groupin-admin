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
import AddIcon from '@material-ui/icons/Add';
import history from 'utils/history';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectUsersList,
  makeSelectPage,
  makeSelectRowsPerPage,
  makeSelectPrenom,
  makeSelectNom,
  makeSelectPharmacie,
} from './selectors';
import { getUsersList } from './actions';
import authenticated from '../HOC/authenticated/authenticated';
import Toggle from '../../components/Toggle/Toggle';
import {formatPharmacieToLabelValue} from "./add/utils";

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
  addUserButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
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

class ListeUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      prenom: '',
      nom: '',
      pharmacie: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(getUsersList(this.state));
  }

  handleChangePage = (event, page) => {
    this.setState({ page }, () =>
      this.props.dispatch(getUsersList(this.state)),
    );
  };

  handleChangeRowsPerPage = event => {
    this.setState(
      { page: 0, rowsPerPage: parseInt(event.target.value, 10) },
      () => this.props.dispatch(getUsersList(this.state)),
    );
  };

  handleSearchUsers = () => {
    this.props.dispatch(getUsersList(this.state));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleUserAddClick = () => {
    history.push('/users/add');
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const { classes, usersList, pharmacies } = this.props;
    const totalElements = usersList.totalElements ? usersList.totalElements : 0;
    const rows = usersList.content;
    return (
      <div>
        <Typography component="h1" variant="h4" className={classes.root}>
          Liste des utilisateurs
        </Typography>
        <Divider variant="middle" className={classes.root} />
        <form className={classes.root}>
          <Typography component="h1" variant="h6">
            Recherche
          </Typography>
          <TextField
            name="prenom"
            label="Prénom"
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange}
          />
          <TextField
            name="nom"
            label="Nom"
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange}
          />
          <TextField
            name="pharmacie"
            label="Pharmacie"
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange}
          />
          <Fab
            color="primary"
            className={classes.button}
            onClick={this.handleSearchUsers}
          >
            <SearchIcon />
          </Fab>
        </form>

        <Divider variant="middle" className={classes.root} />

        <Typography component="h1" variant="h6" className={classes.root}>
          {totalElements} utilisateurs trouvés
        </Typography>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Utilisateur</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Pharmacie</TableCell>
                <TableCell>Rôle</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.firstName} {row.lastName}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      {row.pharmacie && row.pharmacie.denomination}
                    </TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>
                      <EditIcon color="primary" />
                      <Toggle />
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
                  labelRowsPerPage="Nombre d'utilisateurs par page : "
                  labelDisplayedRows={({ from, to, count }) =>
                    `De ${from} à ${to} sur ${count} utilisateurs`
                  }
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
        <Fab
          color="primary"
          className={classes.addUserButton}
          onClick={this.handleUserAddClick}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  usersList: makeSelectUsersList(),
  page: makeSelectPage(),
  rowsPerPage: makeSelectRowsPerPage(),
  prenom: makeSelectPrenom(),
  nom: makeSelectNom(),
  pharmacie: makeSelectPharmacie(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });

ListeUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  authenticated,
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(ListeUsers);
