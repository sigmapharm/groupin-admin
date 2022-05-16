import { Typography, withStyles } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect } from 'react';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import authenticated from '../HOC/authenticated/authenticated';
import { getOffreList } from '../Offres/actions';
import { makeSelectOffresList } from '../Offres/selectors';
import image from '../../images/bayer.png';
import Countdown from 'react-countdown';

// images

import BAYER from '../../images/labos/BAYER.png';
import BLEDINA from '../../images/labos/BLEDINA.png';
import GALENICA from '../../images/labos/GALENICA.png';
import NESTLE from '../../images/labos/NESTLE.jpeg';
import GSKMAROC from '../../images/labos/GSK_MAROC.jpeg';
import IBERMA from '../../images/labos/IBERMA.png';
import NACTALIA from '../../images/labos/NACTALIA.jpeg';
import NOVOPHARMA from '../../images/labos/NOVOPHARMA.jpeg';
import PHARMA5 from '../../images/labos/PHARMA5.png';
import PHIMED from '../../images/labos/PHI MED.png';
import PHIPARA from '../../images/labos/PHI PARA.png';
import POLYMEDIC from '../../images/labos/POLYMEDIC.png';
import PROMOPHARM from '../../images/labos/PROMOPHARM.jpeg';
import SANOFI from '../../images/labos/SANOFI.jpeg';
import ZENITH from '../../images/labos/ZENITH.png';

import GROUPIN from '../../images/logo-color.png';

const LabosImg = {
  BAYER,
  BLEDINA,
  NESTLE,
  GALENICA,
  GSKMAROC,
  IBERMA,
  NACTALIA,
  NOVOPHARMA,
  PHARMA5,
  PHIMED,
  PHIPARA,
  POLYMEDIC,
  PROMOPHARM,
  SANOFI,
  ZENITH,
};

const params = {
  page: 0,
  rowsPerPage: 1000,
  designation: '',
  dateDebut: '',
  dateFin: '',
  montant: '',
  quantiteMin: '',
  status: 'En cours',
  laboratoire: '',
  articledtos: '',
  showInfoBar: false,
  cols: [],
};
const OffersHome = ({ classes, dispatch, offresList, history }) => {
  useEffect(() => {
    dispatch(getOffreList(params, console.log));
  }, []);
  const handleClick = offre => {
    history.push(`/offres?designation=${offre.designation}`);
  };
  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h4">
        Offres en cours
      </Typography>
      <div className={classes.cards}>
        {offresList.content &&
          offresList.content.map(offre => (
            <div key={offre.id} className={classes.card} onClick={handleClick.bind(this, offre)}>
              <img
                src={
                  LabosImg[offre.laboratoryName.split(' ').join('')]
                    ? LabosImg[offre.laboratoryName.split(' ').join('')]
                    : GROUPIN
                }
                className={classes.image}
                alt={offre.laboratoryName}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h4 style={{ fontSize: '15px' }}>{offre.laboratoryName}</h4>
                <span style={{ margin: '0 5px', fontSize: '15px' }}>-</span>
                <span className={classes.date}>{moment(offre.dateDebut).format('YYYY MMMM')}</span>
              </div>
              <Countdown
                date={Date.now() + moment(offre.dateFin).diff(new Date())}
                intervalDelay={0}
                precision={3}
                renderer={({ days, hours, seconds, minutes }) => (
                  <div className={classes.timer_container}>
                    <div className={classes.timer_item}>
                      <h5 className={classes.timer_title}>Days</h5>
                      <h5 className={classes.timer_value}>{days}</h5>
                    </div>
                    <div className={classes.timer_item}>
                      <h5 className={classes.timer_title}>Hours</h5>
                      <h5 className={classes.timer_value}> {hours}</h5>
                    </div>
                    <div className={classes.timer_item}>
                      <h5 className={classes.timer_title}>Minutes</h5>
                      <h5 className={classes.timer_value}>{minutes}</h5>
                    </div>
                    <div className={classes.timer_item}>
                      <h5 className={classes.timer_title}>Seconds</h5>
                      <h5 className={classes.timer_value}>{seconds}</h5>
                    </div>
                  </div>
                )}
              />
            </div>
          ))}
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
    padding: '0 17px',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,1fr)',
    gap: '20px',
    padding: '20px 0',
    [theme.breakpoints.down(780)]: {
      gridTemplateColumns: 'repeat(2,1fr)',
    },
    [theme.breakpoints.down(480)]: {
      gridTemplateColumns: 'repeat(1,1fr)',
    },
  },
  card: {
    padding: '20px 25px ',
    backgroundColor: 'white',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.03)',
    borderRadius: '6px',
    cursor: 'pointer',
    position: 'relative',
    textAlign: 'center',
    transition: '0.3s all ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  date: {
    opacity: 0.75,
    fontSize: '15px',
  },
  image: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '110px',
    margin: '0 auto',
    padding: '0',
    // marginTop: '15px',
  },
  timer_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  timer_item: {},
  timer_title: {
    fontWeight: '500',
    marginBottom: '6px',
  },
  timer_value: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#276955',
  },
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  offresList: makeSelectOffresList(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  authenticated,
  withConnect,
)(OffersHome);
