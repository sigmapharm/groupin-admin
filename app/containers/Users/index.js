import React from 'react';
import * as PropTypes from 'prop-types';

import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import AddIcon from '@material-ui/icons/Add';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import history from 'utils/history';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import { deleteUser, getUsersList, resetUser, toggleUser, updateUser } from './actions';
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
import GeneriqueDialog from '../../components/Alert';

/* istanbul ignore next */
const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  tableWrapper: {
    overflowX: 'auto',
    padding: '0px 70px',
  },
  addUserButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
  },
  table: {
    width: '100%',
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
      showPopConfirmation: false,
      popConfirmationParams: {},
      cols: [
        {
          label: 'Utilisateur',
          colName: 'firstName',
          selected: false,
          order: 'asc',
        },
        {
          label: 'Email',
          selected: false,
          colName: 'email',
          order: 'asc',
        },
        {
          label: 'Pharmacie',
          colName: 'pharmacy',
          selected: false,
          order: 'asc',
        },
        {
          label: 'Role',
          colName: 'role',
          selected: false,
          order: 'asc',
        },
        {
          label: 'dernière commande',
          colName: 'lastCommand',
          selected: false,
          order: 'asc',
        },
      ],
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  handleChangePage = (event, page) => {
    this.setState({ page }, () => this.loadUsers());
  };

  loadUsers() {
    this.props.dispatch(
      getUsersList(this.state, err => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title: "le chargement des utilisateur à échoué merci de contacter l'administrateur ",
            },
          });
        }
      }),
    );
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) }, () => this.loadUsers());
  };

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

  performDeleteUser = user => () => {
    this.openPopConfirmation({
      title: 'Suppression',
      textContent: 'Êtes-vous sûr de supprimer cet user ? ',
      onClose: this.closePopConfirmation,
      onSubmit: this.deleteUser(user),
    });
  };

  closePopConfirmation = () => {
    this.setState({
      showPopConfirmation: false,
      popConfirmationParams: {},
    });
  };

  handleSearchUsers = () => {
    this.loadUsers();
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
              title: "La activation / desactivation  d'un utilisateur  à échoué merci de contacter l'administrateur ",
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
              title: "La modification d'un utilisateur  à échoué merci de contacter l'administrateur ",
            },
          });
        } else {
          // eslint-disable-next-line no-unused-expressions
          successCallback && successCallback();
          this.handleSearchUsers();
        }
      }),
    );
  };

  deleteUser = user => () => {
    this.props.dispatch(
      deleteUser(user.id, err => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title: _.get(err, 'errors.error', "La suppression de l'utilisteur a echoue  "),
            },
          });
        } else {
          // eslint-disable-next-line no-unused-expressions
          this.handleSearchUsers();
        }
        this.closePopConfirmation();
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
              title: "La renitialisation d'un utilisateur  à échoué merci de contacter l'administrateur ",
            },
          });
        } else {
          this.handleSearchUsers();
        }
      }),
    );
  };

  closeInfoBar = () => this.setState({ showInfoBar: false, infoBarParams: {} });

  changeColumnSort = index => () => {
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
          [index]: {
            order: col.order === 'desc' ? 'asc' : 'desc',
            selected: true,
          },
        }),
      },
      this.loadUsers,
    );
  };

  render() {
    const { rowsPerPage, page, showInfoBar, infoBarParams, showPopConfirmation, popConfirmationParams, cols } = this.state;
    const { classes, usersList, cities } = this.props;
    const totalElements = usersList.totalElements ? usersList.totalElements : 0;
    const rows = usersList.content;
    const formatedCities = cities.map(formatCityToLabelValue);
    return (
      <div>
        <Typography component="h1" variant="h4" style={{ marginLeft: 100, marginTop: 20 }}>
          Liste des utilisateurs
        </Typography>
        <Divider variant="middle" className={classes.root} />
        <UsersListSearch handleChange={this.handleChange} handleSearchUsers={this.handleSearchUsers} />

        <Divider variant="middle" className={classes.root} />

        <Typography component="h1" variant="h6" className={classes.root}>
          {totalElements} utilisateurs trouvés
        </Typography>

        <Paper className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                {cols.map(({ colName, label, order }, index) => (
                  <TableCell key={colName}>
                    <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                      <TableSortLabel style={{ color: '#fff' }} active direction={order} onClick={this.changeColumnSort(index)}>
                        {label}
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                ))}
                <TableCell style={{ color: '#fff' }}>Actions</TableCell>
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
                    deleteUser={this.performDeleteUser(row)}
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
          <InfoBar open={showInfoBar} onClose={this.closeInfoBar} {...infoBarParams} />
          <GeneriqueDialog open={showPopConfirmation} {...popConfirmationParams} />
        </Paper>
        <Fab color="primary" className={classes.addUserButton} style={{}} onClick={this.handleUserAddClick}>
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
