import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';
import moment from 'moment';
import _ from "lodash";

const style = () => ({
  metaContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    margin: '25px 10px',
  },
  metaItems: {
    padding: '0em 3em',
    display: 'inline-block',
    '&:first-child': {
      paddingLeft: 0,
    },
  },
});

export default withStyles(style)(({ classes, offer }) => (
  <>
    <div className={classes.metaContainer}>
      <div className={classes.metaItems}>
        <Typography color="textSecondary">Designation de l'offre</Typography>
        <Typography variant="h6" component="h2">
          {offer.designation}
        </Typography>
      </div>
      <div className={classes.metaItems}>
        <Typography color="textSecondary">Laboratoire</Typography>
        <Typography variant="h6" component="h2">
          {offer.laboratoryName}
        </Typography>
      </div>
      <div className={classes.metaItems}>
        <Typography color="textSecondary">Date début</Typography>
        <Typography variant="h6" component="h2">
          {moment(offer.dateDebut).format('DD/MM/YYYY')}
        </Typography>
      </div>
      <div className={classes.metaItems}>
        <Typography color="textSecondary">Date Fin</Typography>
        <Typography variant="h6" component="h2">
          {moment(offer.dateFin).format('DD/MM/YYYY')}
        </Typography>
      </div>
      <div className={classes.metaItems}>
        <Typography color="textSecondary">Montant Maximal</Typography>
        <Typography variant="h6" component="h2">
          {offer.montantMax}
        </Typography>
      </div>
    </div>
    <div className={classes.metaContainer} style={{ justifyContent: 'center' }}>
      <div className={classes.metaItems}>
        <Typography color="textSecondary">Montant Objectif</Typography>
        <Typography variant="h6" component="h2">
          {offer.objectiveAmount}
        </Typography>
      </div>
      <div className={classes.metaItems}>
        <Typography color="textSecondary">Montant objectif atteint</Typography>
        <Typography variant="h6" component="h2">
          {(_.get(offer, 'commandsTotalAmount') || 0).toFixed(2)}
        </Typography>
      </div>
      <div className={classes.metaItems}>
        <Typography color="textSecondary">Objectif atteint %</Typography>
        <Typography variant="h6" component="h2">
          {(
            ((_.get(offer, 'commandsTotalAmount') || 0).toFixed(2) /
              offer.objectiveAmount) *
              100 || 0
          ).toFixed(2)}
        </Typography>
      </div>
    </div>
  </>
));
