import React from 'react';
import { compose } from 'redux';
import authenticated from '../HOC/authenticated/authenticated';
import {
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
  withStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import history from 'utils/history';
import { makeSelectAdsList } from './selectors';
import { getAdsList } from './actions';
import moment from 'moment';
import { Settings } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';

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
  tableHead: {
    backgroundColor: theme.palette.primary.main,
  },
});

const SectionTraduction = {
  OFFRES_FIRST: 'premières annonces en offres',
  OFFRES_SECONDE: 'deuxièmes annonces dans les offres',
  DASH_LEFT: 'section gauche du tableau de bord ',
  DASH_RIGHT: 'section droite du tableau de bord',
};

const cols = [
  {
    label: 'Contenu',
    colName: 'content',
    selected: false,
    order: 'asc',
  },
  {
    label: 'Date début',
    selected: false,
    colName: 'start_from',
    order: 'asc',
  },
  {
    label: 'Date fin',
    colName: 'end_to',
    selected: false,
    order: 'asc',
  },
  {
    label: 'lien',
    colName: 'link',
    selected: false,
    order: 'asc',
  },
  {
    label: 'Vues au total',
    colName: 'total_views',
    selected: false,
    order: 'asc',
  },
  {
    label: 'Section',
    colName: 'addSection',
    selected: false,
    order: 'asc',
  },
];

class AdsList extends React.Component {
  handleAddPageChange = id => {
    history.push(`/alerts/${id}`);
  };

  componentDidMount() {
    this.props.dispatch(getAdsList());
  }

  handleAdsAddClick = () => {
    history.push('/ads/add');
  };

  updateAdsClick = id => () => {
    history.push(`/ads/${id}`);
  };

  render() {
    const { classes, list } = this.props;
    const rows = list.content;
    return (
      <div>
        <Typography component="h1" variant="h4" className={classes.root} style={{ overflow: 'hidden' }}>
          Liste des annonces
        </Typography>

        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow className={classes.tableHead}>
                {cols.map(({ colName, label, order }, index) => (
                  <TableCell key={colName}>
                    <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                      <TableSortLabel style={{ color: '#fff' }} active direction={order}>
                        {label}
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                ))}
                <TableCell style={{ color: '#fff' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.list.content &&
                rows.map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.content}</TableCell>
                      <TableCell>{moment(row.start_from).format('DD-MM-YYYY')}</TableCell>
                      <TableCell>{moment(row.end_to).format('DD-MM-YYYY')}</TableCell>
                      <TableCell>{row.link}</TableCell>
                      <TableCell>{row.total_views}</TableCell>
                      <TableCell>{SectionTraduction[row.addSection]}</TableCell>
                      <TableCell onClick={this.updateAdsClick(row.id)}>
                        <Settings />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Paper>
        {/* <Fab color="primary" className={classes.addLaboratoiresButton} onClick={this.handleAdsAddClick}>
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
  list: makeSelectAdsList(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(AdsList);
