import React from 'react';
import * as PropTypes from 'prop-types';

import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';

import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import authenticated from '../HOC/authenticated/authenticated';
import { makeSelectGetAnalyticsList } from './selectors';
import { getPharmaciesAnalytics, printPharmaciesAnalytics } from './actions';

import ReactExport from 'react-data-export';

import { ExportToExcel } from './ExelExportPrintButton';
import TableList from './TableList';
import { makeSelectLaboratoires } from '../App/selectors';
import { Button, TextField } from '@material-ui/core';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

/* istanbul ignore next */
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
    height: 500,
    overflow: 'auto',
  },
  addUserButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
  },
});

export class UsersList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      printData: [],
      from: '2022-01-01',
      to: '2022-12-30',
      laboName: '',
      pharmacyName: '',
      cols: [
        {
          label: 'Pharmacies',
          colName: 'firstName',
          selected: false,
        },
        {
          label: 'janvier',
          selected: false,
          colName: 'janvier',
        },
        {
          label: 'février',
          colName: 'pharmacy',
          selected: false,
        },

        {
          label: 'mars',
          colName: 'role',
          selected: false,
        },
        {
          label: 'avril',
          colName: 'quantityCmd',
          selected: false,
        },
        {
          label: 'mai',
          colName: 'quantityCmd',
          selected: false,
        },
        {
          label: 'juin',
          colName: 'totalAmount',
          selected: false,
        },
        {
          label: 'juillet',
          colName: 'totalAmount',
          selected: false,
        },
        {
          label: 'août',
          colName: 'totalAmount',
          selected: false,
        },
        {
          label: 'septembre',
          colName: 'totalAmount',
          selected: false,
        },
        {
          label: 'octobre',
          colName: 'totalAmount',
          selected: false,
        },
        {
          label: 'novembre',
          colName: 'totalAmount',
          selected: false,
        },
        {
          label: 'décembre',
          colName: 'totalAmount',
          selected: false,
        },
        {
          label: 'total',
          colName: 'Total',
          selected: false,
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(
      getPharmaciesAnalytics({ page: 0, from: '2022-01-01', to: '2022-12-30', pharmacyName: this.state.pharmacyName }),
    );
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
    this.props.dispatch(getPharmaciesAnalytics({ page }));
  };

  handleChangeRowsPerPage = event => {};

  handlePrint = event => {
    this.props.dispatch(
      printPharmaciesAnalytics({
        callback: (res, err) => {
          this.setState({ printData: res });
        },
      }),
    );
  };

  handleInputChange = e => {
    setTimeout(() => {
      this.props.dispatch(
        getPharmaciesAnalytics({
          page: 0,
          from: this.state.from,
          to: this.state.to,
          laboName: this.state.laboName,
          pharmacyName: this.state.pharmacyName,
        }),
      );
    }, 1000);
  };

  render() {
    const { classes, list } = this.props;
    const { cols } = this.state;

    return (
      <div>
        <Typography component="h1" variant="h4" className={classes.root} style={{ overflow: 'hidden' }}>
          pharmacie analytique
        </Typography>
        <Divider variant="middle" className={classes.root} />

        <div style={{ marginLeft: 30 }}>
          <ExportToExcel
            dispatch={this.props.dispatch}
            apiData={this.state.printData}
            fileName={`${Date.now()}-pharmacies-statique`}
          />

          <select
            value={`${this.state.from}/${this.state.to}`}
            name=""
            id=""
            style={{ border: '1px solid black', width: 200, padding: 10, borderRadius: 11, marginLeft: 20 }}
            onChange={e => {
              const dates = e.target.value.split('/');
              this.setState({ from: dates[0], to: dates[1] });
              this.props.dispatch(
                getPharmaciesAnalytics({
                  page: 0,
                  from: dates[0],
                  to: dates[1],
                  laboName: this.state.laboName,
                  pharmacyName: this.state.pharmacyName,
                }),
              );
            }}
          >
            <option value="2020-01-01/2020-12-30">2020</option>
            <option value="2021-01-01/2021-12-30">2021</option>
            <option value="2022-01-01/2022-12-30">2022</option>
            <option value="2023-01-01/2023-12-30">2023</option>
          </select>
          <select
            value={this.state.laboName}
            name=""
            id=""
            style={{ border: '1px solid black', width: 200, padding: 10, borderRadius: 11, marginLeft: 20 }}
            onChange={e => {
              const labo = e.target.value;
              this.setState({ laboName: labo });
              this.props.dispatch(
                getPharmaciesAnalytics({
                  page: 0,
                  laboName: labo,
                  from: this.state.from,
                  to: this.state.to,
                  pharmacyName: this.state.pharmacyName,
                }),
              );
            }}
          >
            <option value=""> TOUS LES LABO</option>;
            {this.props.labos.map(item => {
              return <option value={item.nom}> {item.nom} </option>;
            })}
          </select>
          <div
            style={{
              marginLeft: 10,
              display: 'inline-block',
            }}
          >
            <TextField
              placeholder="Pharmacy Name"
              value={this.state.pharmacyName}
              onChange={e => {
                this.setState({ pharmacyName: e.target.value });
              }}
            />
            <Button variant="contained" style={{ marginLeft: 20 }} onClick={this.handleInputChange}>
              search
            </Button>
          </div>
        </div>
        <Divider variant="middle" className={classes.root} />
        <TableList cols={cols} list={this.props.list} classes={classes} />
      </div>
    );
  }
}

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  list: makeSelectGetAnalyticsList(),
  labos: makeSelectLaboratoires(),
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
