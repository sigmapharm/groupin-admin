import React from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import history from 'utils/history';
import _ from 'lodash';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';
import { deleteOffer, getOffreList } from './actions';
import {
  makeSelectPage,
  makeSelectRowsPerPage,
  makeSelectOffresList,
  makeSelectdesignation,
  makeSelectdateDebut,
  makeSelectdateFin,
  makeSelectmontantObjectif,
  makeSelectquantiteMinimale,
  makeSelectstatus,
  makeSelectlaboratoire,
} from './selectors';
import authenticated from '../HOC/authenticated/authenticated';
import OffresListTableFooter from './list/OffresListTableFooter';
import OffresListSearch from './list/OffresListSearch';
import OffresListTableRow from './list/OffresListTableRow';
import InfoBar from '../../components/Snackbar/InfoBar';
import OffresListTableHeaders from './list/OffresListTableHeader';
import WithRoles from '../WithRoles';
import { ADMIN, MEMBRE, SUPER_ADMIN } from '../AppHeader/Roles';
import { makeSelectUser } from '../App/selectors';
// import { makeSelectoffreArticledtos } from '../App/selectors';

/* istanbul ignore next */
// eslint-disable-next-line no-unused-vars
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
  addOffresButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  rowsEmpty: {
    textAlign: 'center',
    padding: `${theme.spacing.unit * 3}px  0px`,
  },
});

export class OffresList extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      user: { role },
    } = props;
    this.state = {
      page: 0,
      rowsPerPage: 10,
      designation: '',
      dateDebut: '',
      dateFin: '',
      montant: '',
      quantiteMin: '',
      status: role === MEMBRE ? 'En cours' : '',
      laboratoire: '',
      articledtos: '',
      showInfoBar: false,
      infoBarParams: {},
      cols: [
        {
          label: 'Titre',
          colName: 'designation',
          selected: false,
          order: 'asc',
        },
        {
          label: 'Laboratoire',
          selected: false,
          colName: 'laboratory.nom',
          order: 'asc',
        },
        {
          label: 'Date de début',
          colName: 'dateDebut',
          selected: false,
          order: 'asc',
        },
        {
          label: 'Date de fin',
          colName: 'dateFin',
          selected: false,
          order: 'asc',
        },
      ],
    };
  }

  componentDidMount() {
    this.loadOffers()
  }

  handleChangePage = (event, page) => {
    this.setState({ page }, this.loadOffers);
  };

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
          [index]: { order: col.order === 'desc' ? 'asc' : 'desc' ,  selected:true},
        }),
      },
      this.loadOffers,
    );
  };

  handleOffresAddClick = () => {
    history.push('/offres/add');
  };

  handleChangeRowsPerPage = event => {
    this.setState(
      { page: 0, rowsPerPage: parseInt(event.target.value, 10) },
      () => this.loadOffers(),
    );
  };

  loadOffers = () =>
    this.props.dispatch(
      getOffreList(this.state, err => {
        if (err) {
          this.setState({
            showPopConfirmation: false,
            showInfoBar: true,
            infoBarParams: {
              title:
                "Le chargement des articles à échoué merci de contacter l'administrateur ",
            },
          });
        }
      }),
    );

  handleSelctChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSearchOffres = () => {
    this.loadOffers()
  };

  handleChange = event => {
    this.setState({ [event.target.name]: _.trim(event.target.value) });
  };

  handleStatutChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  closeInfoBar = () => this.setState({ showInfoBar: false, infoBarParams: {} });

  render() {
    const { rowsPerPage, page, showInfoBar, infoBarParams,cols } = this.state;
    // eslint-disable-next-line react/prop-types
    const { classes, offresList, user } = this.props;
    const totalElements = offresList.totalElements
      ? offresList.totalElements
      : 0;
    const rows = offresList.content || [];

    return (
      <div>
        <Typography component="h1" variant="h4" className={classes.root}>
          Liste des offres
        </Typography>
        <Divider variant="middle" className={classes.root} />

        <OffresListSearch
          handleChange={this.handleChange}
          handleSelctChange={this.handleSelctChange}
          handleSearchOffres={this.handleSearchOffres}
        />
        <Divider variant="middle" className={classes.root} />

        <Typography component="h1" variant="h6" className={classes.root}>
          {totalElements} offres trouvés
        </Typography>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <OffresListTableHeaders
                cols={cols}
                changeHandler={this.changeColumnSort()}
              />
            </TableHead>
            <TableBody>
              {rows.length != 0 ? (
                rows.map(row => (
                  <OffresListTableRow
                    key={row.id}
                    filters={{
                      ..._.pick(this.state, [
                        'status',
                        'designation',
                        'laboratoire',
                        'rowsPerPage',
                        'page',
                      ]),
                    }}
                    dispatch={this.props.dispatch}
                    row={row}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell className={classes.rowsEmpty} colSpan={5}>
                    <span>Pas d'offres</span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <OffresListTableFooter
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
        <WithRoles user={user} roles={[ADMIN, SUPER_ADMIN]}>
          <Fab
            color="primary"
            className={classes.addOffresButton}
            onClick={this.handleOffresAddClick}
          >
            <AddIcon />
          </Fab>
        </WithRoles>
      </div>
    );
  }
}

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  offresList: makeSelectOffresList(),
  page: makeSelectPage(),
  rowsPerPage: makeSelectRowsPerPage(),
  designation: makeSelectdesignation(),
  dateDebut: makeSelectdateDebut(),
  dateFin: makeSelectdateFin(),
  montantObjectif: makeSelectmontantObjectif(),
  quantiteMinimale: makeSelectquantiteMinimale(),
  status: makeSelectstatus(),
  laboratoire: makeSelectlaboratoire(),
  user: makeSelectUser(),
  // offreArticledtos: makeSelectoffreArticledtos(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

OffresList.defaultProps = {};

OffresList.propTypes = {
  classes: PropTypes.object,
  dispatch: PropTypes.func,
  offresList: PropTypes.any,
};

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(OffresList);
