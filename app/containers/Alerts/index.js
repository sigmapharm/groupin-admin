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
import AddIcon from '@material-ui/icons/Add';
import history from 'utils/history';
import { makeSelectList } from './selectors';
import { useEffect } from 'react';
import { getALertsList } from './actions';
import moment from 'moment';
import { Settings } from '@material-ui/icons';

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

const cols = [
  {
    label: 'Alert Type',
    colName: 'alert_type',
    selected: false,
    order: 'asc',
  },
  {
    label: 'status',
    selected: false,
    colName: '_active',
    order: 'asc',
  },
  {
    label: 'message',
    colName: 'message',
    selected: false,
    order: 'asc',
  },
  {
    label: 'date début',
    colName: 'date_start',
    selected: false,
    order: 'asc',
  },
  {
    label: 'date fin',
    colName: 'date_end',
    selected: false,
    order: 'asc',
  },
  {
    label: 'Lien',
    colName: 'link',
    selected: false,
    order: 'asc',
  },
];

class AddAlert extends React.Component {
  handleAddPageChange = id => {
    history.push(`/alerts/${id}`);
  };

  componentDidMount() {
    this.props.dispatch(getALertsList());
  }

  render() {
    const { classes, list } = this.props;

    return (
      <div>
        <Typography component="h1" variant="h4" className={classes.root} style={{ overflow: 'hidden' }}>
          Liste des Alerts
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
              {this.props.list &&
                this.props.list.map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.alert_type}</TableCell>
                      <TableCell>{row._active ? 'active' : 'inactive'}</TableCell>
                      <TableCell>{row.message}</TableCell>
                      <TableCell>{moment(row.date_start).format('DD-MM-YYYY')}</TableCell>
                      <TableCell>{moment(row.date_end).format('DD-MM-YYYY')}</TableCell>
                      <TableCell>{row.link}</TableCell>
                      <TableCell onClick={() => this.handleAddPageChange(row.id)}>
                        <Settings />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  list: makeSelectList(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(AddAlert);
