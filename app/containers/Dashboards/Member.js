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
import BarChart from './charts/BarChart';
import SmallCard from './SmallCard';
import { formatNumber } from '../../utils/formatNumber';
import _ from 'lodash';
import AdsCard from '../../components/AdsCard';

const Member = ({ classes, dispatch, statistics, userRole }) => {
  useEffect(() => {
    dispatch(getStatistics(userRole));
  }, []);

  const sortedChars = _.sortBy(statistics.caparArticle ? statistics.caparArticle : [], ['value'], ['desc']);

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
              <SmallCard title="Nbr commandes" backgroundColor="#FF92A5" value={statistics.totalCommande} />
              <div style={{ marginBottom: '10px' }} />
              <SmallCard
                title="Total commandé"
                backgroundColor="#4F51C0"
                value={formatNumber.format(statistics.totalCACommande)}
              />
              <div style={{ marginBottom: '10px' }} />
              <SmallCard title="Total gain" backgroundColor="#FED674" value={formatNumber.format(statistics.totalRemise)} />
              <div style={{ marginBottom: '10px' }} />
              {/* <div style={{ marginTop: 10 }}>
                <AdsCard />
              </div> */}
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
              <BarChart
                data={sortedChars
                  .map(v => v.value)
                  .slice(0, 10)
                  .reverse()}
                labels={sortedChars
                  .map(v => v.name.slice(0, 10))
                  .slice(0, 10)
                  .reverse()}
                label="Top 10 articles commandés (MAD)"
              />
            </div>
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <div className={classes.container}>
              {/* <Typography variant="h6">Les statistics global</Typography>
              <div style={{ marginBottom: '20px' }} /> */}
              <Card
                title="Statistiques globaux"
                backgroundColor="#50DFB3"
                items={[
                  {
                    label: 'Nbr commandes',
                    value: statistics.totalCommandeGlobal,
                  },
                  {
                    label: 'Nbr articles',
                    value: statistics.totalArticle,
                  },
                  {
                    label: 'Nbr grossistes',
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
                  // {
                  //   label: 'CA commandée',
                  //   value: Number(statistics.totalCACommandeGlobal).toFixed(2),
                  // },
                ]}
              />
              {/* <div style={{ marginTop: 10 }}>
                <AdsCard />
              </div> */}
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
