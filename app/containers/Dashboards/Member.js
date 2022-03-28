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

const Member = ({ classes, dispatch, statistics, userRole }) => {
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
              <SmallCard title="Nbr commande" backgroundColor="#FF92A5" value={statistics.totalCommande} />
              <div style={{ marginBottom: '10px' }} />
              <SmallCard title="Ca commande" backgroundColor="#4F51C0" value={Number(statistics.totalCACommande).toFixed(2)} />
              <div style={{ marginBottom: '10px' }} />
              <SmallCard title="Total remise" backgroundColor="#FED674" value={Number(statistics.totalRemise).toFixed(2)} />
              <div style={{ marginBottom: '10px' }} />
            </div>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <div className={classes.container}>
              <PieChart
                data={statistics.caparLabo ? statistics.caparLabo.map(v => v.value) : []}
                labels={statistics.caparLabo ? statistics.caparLabo.map(v => v.name) : []}
                label="Chiffre d'affaire par laboratoire(%)"
              />
            </div>
            <div style={{ marginBottom: '24px' }} />
            <div className={classes.container}>
              <PieChart
                data={statistics.caparArticle ? statistics.caparArticle.map(v => v.value) : []}
                labels={statistics.caparArticle ? statistics.caparArticle.map(v => v.name) : []}
                label="Chiffre d'affaire par article(%)"
              />
            </div>
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <div className={classes.container}>
              {/* <Typography variant="h6">Les statistics global</Typography>
              <div style={{ marginBottom: '20px' }} /> */}
              <Card
                title="Les statistics global"
                backgroundColor="#50DFB3"
                items={[
                  {
                    label: 'Nbr commande',
                    value: statistics.totalCommandeGlobal,
                  },
                  {
                    label: 'Nbr articales',
                    value: statistics.totalArticle,
                  },
                  {
                    label: 'Nbr fournisseur',
                    value: statistics.totalFournisseur,
                  },
                  {
                    label: 'Nbr pharmacies',
                    value: statistics.totalPharmcy,
                  },
                  {
                    label: 'Nbr laboratoires',
                    value: statistics.totalLabos,
                  },
                  {
                    label: 'CA commandée',
                    value: Number(statistics.totalCACommande).toFixed(2),
                  },
                ]}
              />
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
)(Member);
