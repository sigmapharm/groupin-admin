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

import { makeSelectProvidersList } from './selectors';
import { deleteProvider, getProvidersList } from './actions';
import authenticated from '../HOC/authenticated/authenticated';
import ProviderListTableRow from './list/ProviderListTableRow';
import ProviderListTableFooter from './list/ProviderListTableFooter';
import ProviderListSearch from './list/ProviderListSearch';
import ProviderListTableHeader from './list/ProviderListTableHeader';
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
  addProvidersButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class ListeProviders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      fullName: '',
      phone: '',
      fax: '',
      email: '',
      city: '',
      showInfoBar: false,
      infoBarParams: {},
      showPopConfirmation: false,
      popConfirmationParams: {},
      cols: [
        {
          label: 'Nom et Prenom',
          colName: 'fullName',
          selected: false,
          order: 'asc',
        },
        {
          label: 'Telephone',
          selected: false,
          colName: 'phone',
          order: 'asc',
        },
        {
          label: 'Fax',
          colName: 'fax',
          selected: false,
          order: 'asc',
        },
        {
          label: 'Email',
          colName: 'email',
          selected: false,
          order: 'asc',
        },
        {
          label: 'Ville',
          colName: 'cityName',
          selected: false,
          order: 'asc',
        },
      ],
    };
  }

  componentDidMount() {
    this.loadProviders();
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

  performDeleteCommand = provider => () => {
    this.openPopConfirmation({
      title: 'Suppression',
      textContent: 'Êtes-vous sûr de supprimer cette provider ? ',
      onClose: this.closePopConfirmation,
      onSubmit: this.deleteProvider(provider),
    });
  };

  closePopConfirmation = () => {
    this.setState({
      showPopConfirmation: false,
      popConfirmationParams: {},
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page }, () => this.loadProviders());
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) }, () => this.loadProviders());
  };

  deleteProvider = provider => () => {
    this.props.dispatch(
      deleteProvider(provider.id, err => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title: 'La suppression de la provider a echoue  ',
            },
          });
        } else {
          // eslint-disable-next-line no-unused-expressions
          this.handleSearchProviders();
        }
        this.closePopConfirmation();
      }),
    );
  };

  handleSearchProviders = () => {
    this.loadProviders();
  };

  loadProviders() {
    this.props.dispatch(
      getProvidersList(this.state, err => {
        if (err) {
          this.setState({
            showPopConfirmation: false,
            showInfoBar: true,
            infoBarParams: {
              title: "Le chargement des providers à échoué merci de contacter l'administrateur ",
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
      this.loadProviders,
    );
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleProvidersAddClick = () => {
    history.push('/providers/add');
  };

  closeInfoBar = () => this.setState({ showInfoBar: false, infoBarParams: {} });

  render() {
    const { rowsPerPage, page, showInfoBar, infoBarParams, showPopConfirmation, popConfirmationParams, cols } = this.state;
    // eslint-disable-next-line react/prop-types
    console.log(this.props);
    const { classes, providersList } = this.props;
    const totalElements = providersList.totalElements ? providersList.totalElements : 0;
    const rows = providersList.content;
    const deleteProvider = providersList.content;
    return (
      <div>
        <Typography component="h1" variant="h4" className={classes.root} style={{ overflow: 'hidden' }}>
          Liste des Grossistes
        </Typography>
        <Divider variant="middle" className={classes.root} />
        <ProviderListSearch handleChange={this.handleChange} handleSearchProvider={this.handleSearchProviders} />

        <Divider variant="middle" className={classes.root} />

        <Typography component="h1" variant="h6" className={classes.root}>
          {totalElements} Grossistes trouvés
        </Typography>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <ProviderListTableHeader cols={cols} changeHandler={this.changeColumnSort()} />
            </TableHead>

            <TableBody>
              {rows &&
                rows.map(row => <ProviderListTableRow key={row.id} row={row} deleteProvider={this.performDeleteCommand(row)} />)}
            </TableBody>
            <ProviderListTableFooter
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
        <Fab color="primary" className={classes.addProvidersButton} onClick={this.handleProvidersAddClick}>
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
  providersList: makeSelectProvidersList(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

ListeProviders.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(ListeProviders);
