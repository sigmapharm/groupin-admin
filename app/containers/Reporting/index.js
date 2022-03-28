import { Divider, Typography, withStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import authenticated from '../HOC/authenticated/authenticated';
import { getReporting } from './actions';
import { selectReporting } from './selectors';
import { selectRegions, makeSelectLaboratoires, makeSelectPharmacies } from '../App/selectors';
import * as _ from 'lodash';
import FilterInputsList from './inputsList/FilterInputsList';
import ReportingTable from './tables/Table';
import { usePDF, Document, Page, Text, Image, View } from '@react-pdf/renderer';
import { Table, TableCell, TableHeader, DataTableCell, TableBody } from '@david.kucsai/react-pdf-table';
import LogoImage from '../../images/logo-color.png';

const Reporting = props => {
  // props
  const { classes, dispatch, laboratoires, regions, pharmacies, reporting = [] } = props;
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState('8 276 982');

  const MyDoc = (
    <Document>
      <Page size="A4" style={{ padding: 10 }}>
        <div style={{ display: 'flex' }}>
          <View>
            <Text style={{ width: '100%', height: 50, textAlign: 'center', paddingTop: 10 }}>
              chiffre d'affaires Total / 28 laboratoires : {total} MAD
            </Text>
          </View>
        </div>
        <Table data={[]}>
          <TableHeader textAlign="center" style={{ backgroundColor: 'green' }}>
            <TableCell style={{ backgroundColor: '#034CD5', color: '#fff' }}>Laboratoire</TableCell>
            <TableCell style={{ backgroundColor: '#034CD5', color: '#fff' }}>total Offers</TableCell>
            <TableCell style={{ backgroundColor: '#034CD5', color: '#fff' }}>commandes</TableCell>
            <TableCell style={{ backgroundColor: '#034CD5', color: '#fff' }}>articles commandés</TableCell>
            <TableCell style={{ backgroundColor: '#034CD5', color: '#fff' }}>Chiffre d'affaires</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell textAlign="center" style={{ minHeight: 20 }} getContent={r => r.laboName} />
            <DataTableCell textAlign="center" getContent={r => r.totalOffers} />
            <DataTableCell textAlign="center" getContent={r => r.totalCommandes} />
            <DataTableCell textAlign="center" getContent={r => r.totalArticalesCommandes} />
            <DataTableCell textAlign="center" getContent={r => r.ca} />
          </TableBody>
        </Table>
      </Page>
    </Document>
  );

  const [instance, updateInstance] = usePDF({ document: MyDoc });

  console.log(instance.error);

  // total chiffre d'affaire

  const tableRef = useRef();

  console.log('reporting', reporting);
  useEffect(() => {
    dispatch(getReporting(() => {}));
  }, []);

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h4" className={classes.typography}>
        Reporting
      </Typography>
      <Divider variant="fullWidth" className={classes.divider} />
      <FilterInputsList
        laboratoires={laboratoires}
        regions={regions}
        pharmacies={pharmacies}
        setRows={setRows}
        rows={reporting}
        tableRef={tableRef}
        pdf={instance}
      />
      <Divider variant="middle" className={classes.divider} />
      <div />
      <div ref={tableRef}>
        <Typography component="h1" variant="h5" className={classes.title}>
          chiffre d'affaires Total / 28 laboratoires : {total} MAD
        </Typography>
        <Divider variant="middle" className={classes.divider} />
        <ReportingTable rows={reporting} />
      </div>

      <div className={classes.space} />
    </div>
  );
};

// styles

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    maxWidth: '1200px',
    width: '100%',
    margin: '20px auto',
    overflow: 'hidden',
  },
  divider: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  typography: {
    paddingLeft: 30,
  },
  title: {
    textAlign: 'center',
  },
  space: {
    marginTop: 100,
  },
});

// redux

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  reporting: selectReporting(),
  regions: selectRegions(),
  laboratoires: makeSelectLaboratoires(),
  pharmacies: makeSelectPharmacies(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(Reporting);
