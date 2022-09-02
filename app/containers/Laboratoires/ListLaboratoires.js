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

import { makeSelectLaboratoiresList } from './selectors';
import { deleteLaboratoire, getLaboratoiresList } from './actions';
import authenticated from '../HOC/authenticated/authenticated';
import LaboratoireListTableRow from './list/LaboratoireListTableRow';
import LaboratoireListTableFooter from './list/LaboratoireListTableFooter';
import LaboratoireListSearch from './list/LaboratoireListSearch';
import LaboratoireListTableHeader from './list/LaboratoireListTableHeader';
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
  addLaboratoiresButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class ListeLaboratoires extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      nom: '',
      email: '',
      website: '',
      description: '',
      adresse: '',
      showInfoBar: false,
      infoBarParams: {},
      showPopConfirmation: false,
      popConfirmationParams: {},
      cols: [
        {
          label: 'Nom ',
          colName: 'nom',
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
          label: 'Web site',
          colName: 'website',
          selected: false,
          order: 'asc',
        },
        {
          label: 'Description',
          colName: 'description',
          selected: false,
          order: 'asc',
        },
        {
          label: 'Adresse',
          colName: 'adresse',
          selected: false,
          order: 'asc',
        },
      ],
    };
  }

  componentDidMount() {
    this.loadLaboratoires();
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

  performDeleteCommand = laboratory => () => {
    console.log('laboratory', laboratory);
    this.openPopConfirmation({
      title: 'Suppression',
      textContent: 'Êtes-vous sûr de supprimer cette laboratoire ? ',
      onClose: this.closePopConfirmation,
      onSubmit: this.deleteLaboratoire(laboratory),
    });
  };

  closePopConfirmation = () => {
    this.setState({
      showPopConfirmation: false,
      popConfirmationParams: {},
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page }, () => this.loadLaboratoires());
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) }, () => this.loadLaboratoires());
  };

  deleteLaboratoire = laboratory => () => {
    this.props.dispatch(
      deleteLaboratoire(laboratory.id, err => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title: 'La suppression de la Laboratoire a echoue  ',
            },
          });
        } else {
          // eslint-disable-next-line no-unused-expressions
          this.handleSearchLaboratoires();
        }
        this.closePopConfirmation();
      }),
    );
  };

  handleSearchLaboratoires = () => {
    this.loadLaboratoires();
  };

  loadLaboratoires() {
    this.props.dispatch(
      getLaboratoiresList(this.state, err => {
        if (err) {
          this.setState({
            showPopConfirmation: false,
            showInfoBar: true,
            infoBarParams: {
              title: "Le chargement des Laboratoires à échoué merci de contacter l'administrateur ",
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
      this.loadLaboratoires,
    );
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLaboratoiresAddClick = () => {
    history.push('/laboratoires/add');
  };

  closeInfoBar = () => this.setState({ showInfoBar: false, infoBarParams: {} });

  render() {
    const { rowsPerPage, page, showInfoBar, infoBarParams, showPopConfirmation, popConfirmationParams, cols } = this.state;
    // eslint-disable-next-line react/prop-types
    console.log(this.props);
    const { classes, laboratoiresList } = this.props;
    const totalElements = laboratoiresList.totalElements ? laboratoiresList.totalElements : 0;
    const rows = laboratoiresList.content;
    const deleteLaboratoire = laboratoiresList.content;
    return (
      <div>
        <Typography component="h1" variant="h4" className={classes.root} style={{ overflow: 'hidden' }}>
          Liste des Laboratoires
        </Typography>
        <Divider variant="middle" className={classes.root} />
        <LaboratoireListSearch handleChange={this.handleChange} handleSearchLaboratoire={this.handleSearchLaboratoires} />

        <Divider variant="middle" className={classes.root} />

        <Typography component="h1" variant="h6" className={classes.root}>
          {totalElements} Grossistes trouvés
        </Typography>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <LaboratoireListTableHeader cols={cols} changeHandler={this.changeColumnSort()} />
            </TableHead>

            <TableBody>
              {rows &&
                rows.map(row => (
                  <LaboratoireListTableRow key={row.id} row={row} deleteLaboratoire={this.performDeleteCommand(row)} />
                ))}
            </TableBody>
            <LaboratoireListTableFooter
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
        <Fab color="primary" className={classes.addLaboratoiresButton} onClick={this.handleLaboratoiresAddClick}>
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
  laboratoiresList: makeSelectLaboratoiresList(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

ListeLaboratoires.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(ListeLaboratoires);
