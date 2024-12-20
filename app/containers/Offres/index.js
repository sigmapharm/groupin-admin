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
import { deleteOffer, getDownloadOffresList, getOffreList } from './actions';
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
  selectOfferArticleList,
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
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import OffresListCards from './responsive/OffresListCards';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { saveAs } from 'file-saver';
import moment from 'moment';

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

const params = new URLSearchParams(history.location.search);
export class OffresList extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      user: { role },
      location,
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
      comment: '',
      laboratoire: '',
      articledtos: '',
      showInfoBar: false,
      infoBarParams: {},
      designation: params.get('designation'),
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
          label: 'Min à commander',
          selected: false,
          colName: 'minToOrder',
          order: 'asc',
        },
        {
          label: 'Date de début',
          colName: 'dateDebut',
          selected: true,
          order: 'desc',
        },
        {
          label: 'Date de fin',
          colName: 'dateFin',
          selected: false,
          order: 'asc',
        },
        // {
        //     label: 'Commentaire',
        //     colName: 'offerComment',
        //     selected: false,
        //     order: 'asc',
        //   },
      ],
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const designation = params.get('designation');

    if (designation) this.setState({ ...this.state, designation }, this.loadOffers);
    else this.loadOffers();
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
          [index]: {
            order: col.order === 'desc' ? 'asc' : 'desc',
            selected: true,
          },
        }),
      },
      this.loadOffers,
    );
  };

  get isMember() {
    const {
      user: { role },
    } = this.props;

    return role === MEMBRE;
  }

  handleOffresAddClick = () => {
    history.push('/offres/add');
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) }, () => this.loadOffers());
  };

  loadOffers = () =>
    this.props.dispatch(
      getOffreList(this.state, err => {
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

  handleSelctChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSearchOffres = () => {
    this.loadOffers();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: _.trim(event.target.value),
    });
  };

  handleStatutChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  closeInfoBar = () =>
    this.setState({
      showInfoBar: false,
      infoBarParams: {},
    });

  handleOffreListPrint = (offerId, laboratoryName) => () => {
    this.props.dispatch(
      getDownloadOffresList({
        offerId,
        laboratoryName,
        callback: (err, blob) => {
          if (err) {
            this.setState({
              showInfoBar: true,
              infoBarParams: {
                title: " La génération du pdf à échoué merci de contacter l'administrateur",
              },
            });
          } else {
            const pdfBlob = new Blob([blob], { type: blob.type });
            saveAs(pdfBlob, `offreArticlesList-${offerId}`);
          }
        },
      }),
    );
  };

  render() {
    const { rowsPerPage, page, showInfoBar, infoBarParams, cols } = this.state;
    // eslint-disable-next-line react/prop-types
    const { classes, offresList, user, width } = this.props;
    const totalElements = offresList.totalElements ? offresList.totalElements : 0;
    const rows = offresList.content || [];
    const isSmallDevice = isWidthDown('md', width);

    return (
      <div>
        <Typography component="h1" variant="h4" className={classes.root} style={{ overflow: 'hidden' }}>
          Liste des offres
        </Typography>

        <OffresListSearch
          handleChange={this.handleChange}
          handleSelctChange={this.handleSelctChange}
          handleSearchOffres={this.handleSearchOffres}
          designation={this.state.designation}
        />

        <Typography component="h1" variant="h6" className={classes.root}>
          {totalElements} offres trouvés
        </Typography>

        {isSmallDevice ? (
          <div className={classes.root}>
            <OffresListCards
              offresList={rows}
              totalElements={totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              handleChangePage={this.handleChangePage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              offerArticles={this.props.offerArticles}
            />
          </div>
        ) : (
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <OffresListTableHeaders cols={cols} changeHandler={this.changeColumnSort()} />
              </TableHead>
              <TableBody>
                {rows.length != 0 ? (
                  rows.map(row => (
                    <OffresListTableRow
                      key={row.id}
                      filters={{
                        ..._.pick(this.state, ['cols', 'status', 'designation', 'laboratoire', 'rowsPerPage', 'page']),
                      }}
                      dispatch={this.props.dispatch}
                      row={row}
                      offerArticles={this.props.offerArticles}
                      isMember={this.isMember}
                      offresList={rows}
                      handleOffreListPrint={this.handleOffreListPrint}
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
          </Paper>
        )}

        <InfoBar open={showInfoBar} onClose={this.closeInfoBar} {...infoBarParams} />
        <WithRoles user={user} roles={[ADMIN, SUPER_ADMIN]}>
          <Fab color="primary" className={classes.addOffresButton} onClick={this.handleOffresAddClick}>
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
  offerArticles: selectOfferArticleList(),
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
  withWidth(),
)(OffresList);
