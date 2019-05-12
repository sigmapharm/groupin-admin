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
import { getOffreList } from './actions';
import history from 'utils/history';
import {
  makeSelectPage,
  makeSelectRowsPerPage,
  makeSelectOffresList,
  makeSelectdesignation,
  makeSelectdateDebut,
  makeSelectdateFin,
  makeSelectmontantObjectif,
  makeSelectquantiteMinimale,
  makeSelectstatus, makeSelectlaboratoire,


} from './selectors';
import saga from './saga';
import authenticated from '../HOC/authenticated/authenticated';
import injectSaga from '../../utils/injectSaga';
import OffresListTableHeader from './list/OffresListTableHeader';
import OffresListTableRow from './list/OffresListTableRow';
import OffresListTableFooter from './list/OffresListTableFooter';
import OffresListSearch from './list/OffresListSearch';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


/* istanbul ignore next */
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


});




export class OffresList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      designation:'',
      dateDebut:'',
      dateFin:'',
      montant:'',
      quantiteMin:'',
      status:'',
      laboratoire:'',
    };
  }

  componentDidMount() {
    this.props.dispatch(getOffreList(this.state));
  }

  handleChangePage = (event, page) => {
    this.setState({ page }, () =>
      this.props.dispatch(getOffreList(this.state)),
    );
  };
   handleOffresAddClick = () => {
    history.push('/offres/add');
  };

  handleChangeRowsPerPage = event => {
    this.setState(
      { page:0,rowsPerPage:parseInt(event.target.value, 10) },
      () => this.props.dispatch(getOffreList(this.state)),
    );
  };
  handleSelctChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  handleSearchOffres = () => {
    this.props.dispatch(getOffreList(this.state));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };



  render() {
    const { rowsPerPage, page } = this.state;
    const { classes,offresList } = this.props;
    const totalElements = offresList.totalElements ? offresList.totalElements : 0;
    const rows = offresList.content;
    console.log("totalElements");
    console.log("RENDER :", rows);

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
            <OffresListTableHeader />
            </TableHead>
            <TableBody>
              {rows &&
              rows.map(row => <OffresListTableRow key={row.id} row={row} />)}
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
        <Fab color="primary"  className={classes.addOffresButton}
             onClick={this.handleOffresAddClick}>
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
  offresList:makeSelectOffresList(),
  page: makeSelectPage(),
  rowsPerPage: makeSelectRowsPerPage(),
  designation:makeSelectdesignation(),
   dateDebut:makeSelectdateDebut(),
   dateFin:makeSelectdateFin(),
  montantObjectif:makeSelectmontantObjectif(),
  quantiteMinimale:makeSelectquantiteMinimale(),
  status: makeSelectstatus(),
  laboratoire:makeSelectlaboratoire() ,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key:'offres', saga });

OffresList.defaultProps = {};

OffresList.propTypes = {
  classes: PropTypes.object,
  dispatch: PropTypes.func,
  offresList: PropTypes.any,

};

export default compose(
  authenticated,
  withSaga,
  withConnect,
  withStyles(styles),
)(OffresList);
