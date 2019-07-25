import React from 'react';
import * as PropTypes from 'prop-types';

import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import AddIcon from '@material-ui/icons/Add';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import history from 'utils/history';
import Typography from '@material-ui/core/Typography';
import { getUsersList, resetUser, toggleUser, updateUser } from './actions';
import UsersListTableRow from './list/UsersListTableRow';
import UsersListSearch from './list/UsersListSearch';
import {
  makeSelectNom,
  makeSelectPage,
  makeSelectPharmacie,
  makeSelectPrenom,
  makeSelectRowsPerPage,
  makeSelectUsersList,
} from './selectors';
import authenticated from '../HOC/authenticated/authenticated';
import UsersListTableFooter from './list/UsersListTableFooter';
import { selectCities } from '../App/selectors';
import { formatCityToLabelValue } from './add/utils';
import InfoBar from '../../components/Snackbar/InfoBar';

/* istanbul ignore next */
const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginLeft: '10%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  addUserButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

export class UsersList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      prenom: '',
      nom: '',
      pharmacie: '',
      showInfoBar: false,
      infoBarParams: {},
    };
  }

  componentDidMount() {
    this.props.dispatch(
      getUsersList(this.state, err => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title:
                "le chargement des utilisateur à échoué merci de contacter l'administrateur ",
            },
          });
        }
      }),
    );
  }

  handleChangePage = (event, page) => {
    this.setState({ page }, () =>
      this.props.dispatch(
        getUsersList(this.state, err => {
          if (err) {
            this.setState({
              showInfoBar: true,
              infoBarParams: {
                title:
                  "le chargement des utilisateur à échoué merci de contacter l'administrateur ",
              },
            });
          }
        }),
      ),
    );
  };

  handleChangeRowsPerPage = event => {
    this.setState(
      { page: 0, rowsPerPage: parseInt(event.target.value, 10) },
      () =>
        this.props.dispatch(
          getUsersList(this.state, err => {
            if (err) {
              this.setState({
                showInfoBar: true,
                infoBarParams: {
                  title:
                    "le chargement des utilisateur  à échoué merci de contacter l'administrateur ",
                },
              });
            }
          }),
        ),
    );
  };

  handleSearchUsers = () => {
    this.props.dispatch(
      getUsersList(this.state, err => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title:
                "le chargement des utilisateur  à échoué merci de contacter l'administrateur ",
            },
          });
        }
      }),
    );
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleUserAddClick = () => {
    history.push('/users/add');
  };

  toggleUser = user => value => {
    this.props.dispatch(
      toggleUser(user.id, value, err => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title:
                "La activation / desactivation  d'un utilisateur  à échoué merci de contacter l'administrateur ",
            },
          });
        } else {
          this.handleSearchUsers();
        }
      }),
    );
  };

  updateUser = user => (values, successCallback) => {
    this.props.dispatch(
      updateUser(user.id, values, err => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title:
                "La modification d'un utilisateur  à échoué merci de contacter l'administrateur ",
            },
          });
        } else {
          successCallback && successCallback();
          this.handleSearchUsers();
        }
      }),
    );
  };

  resetUser = user => () => {
    this.props.dispatch(
      resetUser(user.id, err => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title:
                "La renitialisation d'un utilisateur  à échoué merci de contacter l'administrateur ",
            },
          });
        } else {
          this.handleSearchUsers();
        }
      }),
    );
  };

  closeInfoBar = () => this.setState({ showInfoBar: false, infoBarParams: {} });

  render() {
    const { rowsPerPage, page, showInfoBar, infoBarParams } = this.state;
    const { classes, usersList, cities } = this.props;
    const totalElements = usersList.totalElements ? usersList.totalElements : 0;
    const rows = usersList.content;
    const formatedCities = cities.map(formatCityToLabelValue);
    return (
      <div>
        <Typography component="h1" variant="h4" className={classes.root}>
          Liste des utilisateurs
        </Typography>
        <Divider variant="middle" className={classes.root} />
        <UsersListSearch
          handleChange={this.handleChange}
          handleSearchUsers={this.handleSearchUsers}
        />

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
                  <UsersListTableRow
                    cities={formatedCities}
                    row={row}
                    key={row.id}
                    toggleUser={this.toggleUser(row)}
                    updateUser={this.updateUser(row)}
                    resetUser={this.resetUser(row)}
                  />
                ))}
            </TableBody>
            <UsersListTableFooter
              totalElements={totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              handleChangePage={this.handleChangePage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Table>
          <InfoBar
            open={showInfoBar}
            onClose={this.closeInfoBar}
            {...infoBarParams}
          />
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
  pharmacies: makeSelectPharmacie(),
  cities: selectCities(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

UsersList.defaultProps = {};

UsersList.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  usersList: PropTypes.any,
  handledit: PropTypes.func,
};

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(UsersList);
