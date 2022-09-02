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

import { makeSelectPharmaciesList } from './selectors';
import { deletePharmacie, getPharmaciesList } from './actions';
import authenticated from '../HOC/authenticated/authenticated';
import PharmacieListTableRow from './list/PharmacieListTableRow';
import PharmacieListTableFooter from './list/PharmacieListTableFooter';
import PharmacieListSearch from './list/PharmacieListSearch';
import PharmacieListTableHeader from './list/PharmacieListTableHeader';
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
  //     addPharmaciesButton: {
  //     position: 'fixed',
  //     bottom: theme.spacing.unit * 2,
  //     right: theme.spacing.unit * 2,
  //   },
});

class ListePharmacies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      denomination: '',
      adresse: '',
      tel: '',
      gsm: '',
      patente: '',
      numRC: '',
      interlocuteur: '',
      fonction: '',
      formeJuridique: '',
      banque: '',
      dateDemarrage: '',
      dateCreation: '',
      ice: '',

      showInfoBar: false,
      infoBarParams: {},
      showPopConfirmation: false,
      popConfirmationParams: {},
      cols: [
        {
          label: 'Denomination ',
          colName: 'denomination',
          selected: false,
          order: 'asc',
        },
        {
          label: 'Adresse',
          selected: false,
          colName: 'adresse',
          order: 'asc',
        },
        {
          label: 'Banque',
          colName: 'banque',
          selected: false,
          order: 'asc',
        },
        {
          label: 'numRC',
          colName: 'numRC',
          selected: false,
          order: 'asc',
        },
        {
          label: 'Forme Juridique',
          colName: 'formeJuridique',
          selected: false,
          order: 'asc',
        },
        {
          label: 'Patente',
          colName: 'patente',
          selected: false,
          order: 'asc',
        },
      ],
    };
  }

  componentDidMount() {
    this.loadPharmacies();
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

  performDeleteCommand = pharmacie => () => {
    this.openPopConfirmation({
      title: 'Suppression',
      textContent: 'Êtes-vous sûr de supprimer cette Pharmacie ? ',
      onClose: this.closePopConfirmation,
      onSubmit: this.deletePharmacie(pharmacie),
    });
  };

  closePopConfirmation = () => {
    this.setState({
      showPopConfirmation: false,
      popConfirmationParams: {},
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page }, () => this.loadPharmacies());
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) }, () => this.loadPharmacies());
  };

  deletePharmacie = pharmacie => () => {
    this.props.dispatch(
      deletePharmacie(pharmacie.id, err => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title: 'La suppression de la Pharmacie a echoue  ',
            },
          });
        } else {
          // eslint-disable-next-line no-unused-expressions
          this.handleSearchPharmacies();
        }
        this.closePopConfirmation();
      }),
    );
  };

  handleSearchPharmacies = () => {
    this.loadPharmacies();
  };

  loadPharmacies() {
    this.props.dispatch(
      getPharmaciesList(this.state, err => {
        if (err) {
          this.setState({
            showPopConfirmation: false,
            showInfoBar: true,
            infoBarParams: {
              title: "Le chargement des Pharmacies à échoué merci de contacter l'administrateur ",
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
      this.loadPharmacies,
    );
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // handlePharmaciesAddClick = () => {
  //   history.push('/pharmacies/add');
  // };

  closeInfoBar = () => this.setState({ showInfoBar: false, infoBarParams: {} });

  render() {
    const { rowsPerPage, page, showInfoBar, infoBarParams, showPopConfirmation, popConfirmationParams, cols } = this.state;
    // eslint-disable-next-line react/prop-types
    console.log(this.props);
    const { classes, pharmaciesList } = this.props;
    const totalElements = pharmaciesList.totalElements ? pharmaciesList.totalElements : 0;
    const rows = pharmaciesList.content;
    const deletePharmacie = pharmaciesList.content;
    return (
      <div>
        <Typography component="h1" variant="h4" className={classes.root} style={{ overflow: 'hidden' }}>
          Liste des Pharmacies
        </Typography>
        <Divider variant="middle" className={classes.root} />
        <PharmacieListSearch handleChange={this.handleChange} handleSearchPharmacie={this.handleSearchPharmacies} />

        <Divider variant="middle" className={classes.root} />

        <Typography component="h1" variant="h6" className={classes.root}>
          {totalElements} Pharmacies trouvés
        </Typography>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <PharmacieListTableHeader cols={cols} changeHandler={this.changeColumnSort()} />
            </TableHead>

            <TableBody>
              {rows &&
                rows.map(row => (
                  <PharmacieListTableRow key={row.id} row={row} deletePharmacie={this.performDeleteCommand(row)} />
                ))}
            </TableBody>
            <PharmacieListTableFooter
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
        {/* <Fab color="primary" className={classes.addPharmaciesButton} onClick={this.handlePharmaciesAddClick}> 
          <AddIcon />
        </Fab> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  pharmaciesList: makeSelectPharmaciesList(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

ListePharmacies.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(ListePharmacies);
