import 'chart.js/auto';
import { Grid, Typography, withStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import authenticated from '../HOC/authenticated/authenticated';
import { getStatistics } from './actions';
import Card from './Card';
import { selectStatistics } from './selectors';
import PieChart from './charts/PieChart';
import SmallCard from './SmallCard';
import { formatNumber } from '../../utils/formatNumber';

const Admin = ({ classes, dispatch, statistics, userRole }) => {
  useEffect(() => {
    dispatch(getStatistics(userRole));
  }, []);

  console.log('statistics', statistics);
  return (
    <div className={classes.root}>
      <div>
        {/* <Typography
          component="h1"
          variant="h4"
          style={{ marginBottom: '30px' }}
        >
          statistics
        </Typography> */}

        <Grid container spacing={24}>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <div className={classes.container}>
              <Card title="Utilisateurs" items={[{ label: 'Total', value: statistics.totalUsers }]} backgroundColor="#50DFB3" />
              <div style={{ marginBottom: '10px' }} />
              <Card title="Offres" items={[{ label: 'Total', value: statistics.totalOffre }]} backgroundColor="#FF8F67" />
              <div style={{ marginBottom: '10px' }} />
              <Card title="Laboratoires" items={[{ label: 'Total', value: statistics.totalLabos }]} backgroundColor="#793DFD" />
            </div>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <div className={classes.container}>
              <Typography className={classes.title}>Chiffre d'affaire par laboratoire(%)</Typography>
              <PieChart
                data={statistics.caparLabo ? statistics.caparLabo.map(v => v.value) : []}
                labels={statistics.caparLabo ? statistics.caparLabo.map(v => v.name) : []}
                // label="Chiffre d'affaire par laboratoire(%)"
              />
            </div>
            <div style={{ marginBottom: '24px' }} />
            <div className={classes.container}>
              <Typography className={classes.title}>Chiffre d'affaire par region(%)</Typography>
              <PieChart
                data={statistics.caparRegion ? statistics.caparRegion.map(v => v.value) : []}
                labels={statistics.caparRegion ? statistics.caparRegion.map(v => v.name) : []}
                // label="Chiffre d'affaire par region(%)"
              />
            </div>
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <div className={classes.container}>
              <Card title="Nbr Articles" items={[{ label: 'Total', value: statistics.totalArticle }]} backgroundColor="#FFCC3F" />
              <div style={{ marginBottom: '10px' }} />
              <SmallCard title="Nbr grossistes" backgroundColor="#FF92A5" value={statistics.totalFournisseur} />
              <div style={{ marginBottom: '10px' }} />
              <SmallCard title="Nbr commandes" backgroundColor="#4F51C0" value={statistics.totalCommande} />
              <div style={{ marginBottom: '10px' }} />
              <SmallCard
                title="Total commandé"
                backgroundColor="#BAA2F8"
                value={formatNumber.format(statistics.totalCACommande)}
              />
              <div style={{ marginBottom: '10px' }} />
              <SmallCard title="Total Livré" backgroundColor="#50DFB3" value={formatNumber.format(statistics.totalCALivré)} />
              {/* <div style={{ marginBottom: '10px' }} />
              <SmallCard
                title="CA livrée" statistics.totalCACommande
                backgroundColor="#FED674" formatNumber
                value={100}
              /> */}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1200px',
    width: '100%',
    padding: '20px 17px',
  },
  container: {
    backgroundColor: 'white',
    boxShadow: '0 10px 26px 0 rgba(0,0,0,0.02)',
    padding: '25px 20px',
    [theme.breakpoints.down(430)]: {
      fontSize: '15px',
    },
  },
  title: {
    textAlign: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});
const mapStateToProps = createStructuredSelector({
  statistics: selectStatistics(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withStyles(styles),
  authenticated,
  withConnect,
)(Admin);
