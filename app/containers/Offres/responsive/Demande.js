import { TextField, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { changeOfferArticle, clearOffer, loadArticleOffer, submitClientCommand } from '../actions';
import { selectOfferArticleList } from '../selectors';
import _ from 'lodash';
import history from 'utils/history';
import { formatNumber } from '../../../utils/formatNumber';

const Demande = ({ offer, offerArticles, dispatch, totalGain, totalWidthGlobalDiscount, ...props }) => {
  const [error, setError] = useState('');
  useEffect(() => {
    dispatch(loadArticleOffer({ id: offer.id }));
  }, []);

  const handleQuantityChange = (article, quantity) => {
    dispatch(
      changeOfferArticle({
        id: article.id,
        quantity: Number(quantity),
        hasError: quantity && Number(quantity) < article.minQuantity,
      }),
    );
  };

  const handleSubmitResponse = (err, response) => {
    if (_.isEmpty(err)) {
      dispatch(clearOffer());
      history.push('/commands');
    } else
      setError({
        showInfoBar: true,
        infoBarParams: { title: errors.error },
      });
  };

  const handleSubmit = () => {
    dispatch(submitClientCommand({ offerId: offer.id, offerArticles }, handleSubmitResponse));
  };
  const allowCommandSubmit = () => {
    return offerArticles.filter(({ quantity, minQuantity }) => quantity >= minQuantity).length > 0 &&
      offerArticles.filter(({ quantity }) => quantity > 0).every(({ hasError }) => hasError === false)
      ? true
      : false;
  };

  const isCommandNotAllowed = () => {
    const { totalRemise, row } = props;
    const isEqual = totalRemise === parseInt(row.minToOrder) ? true : false;
    const isGreater = totalRemise > parseInt(row.minToOrder) ? true : false;
    if (!row.minToOrder) return !allowCommandSubmit();
    if (allowCommandSubmit() && (isEqual || isGreater)) return false;
    return true;
  };
  const total = _.sumBy(offerArticles, ({ quantity, pph }) => pph * quantity || 0).toFixed(2);
  const discount = _.sumBy(
    offerArticles,
    ({ quantity, computedPPH, pph }) => (quantity ? quantity * pph - quantity * computedPPH : 0),
  ).toFixed(2);

  return (
    <div>
      <div style={styles.conatiner}>
        <div style={styles.offer}>
          <div style={styles.row}>
            <div>
              <Typography color="textSecondary">Désignation</Typography>
              <Typography variant="h6" component="h2">
                {offer.designation}
              </Typography>
            </div>
            <div>
              <Typography color="textSecondary">Laboratoire</Typography>
              <Typography variant="h6" component="h2">
                {offer.laboratoryName}
              </Typography>
            </div>
          </div>
          <div style={styles.row}>
            <div>
              <Typography color="textSecondary">Date Début</Typography>
              <Typography variant="h6" component="h2">
                {moment(offer.startDate).format('DD/MM/YYYY')}
              </Typography>
            </div>
            <div>
              <Typography color="textSecondary">Date fin</Typography>
              <Typography variant="h6" component="h2">
                {moment(offer.endDate).format('DD/MM/YYYY')}
              </Typography>
            </div>
          </div>
          <div style={styles.row}>
            <div>
              <Typography color="textSecondary">Status</Typography>
              <Typography variant="h6" component="h2">
                {offer.status}
              </Typography>
            </div>
            <div>
              <Typography color="textSecondary">Escompte</Typography>
              <Typography variant="h6" component="h2">
                {offer.globalDiscount} %
              </Typography>
            </div>
          </div>
          {total > 0 && (
            <>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', color: '#034CD5' }}>
                  <Typography color="textSecondary" variant="h6" style={{ marginRight: '10px', color: 'inherit' }}>
                    Total remisé:
                  </Typography>
                  <Typography variant="h6" style={{ color: 'inherit' }}>
                    {/* {total} */}
                    {formatNumber.format(totalWidthGlobalDiscount)}
                  </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: '#4FB491' }}>
                  <Typography color="textSecondary" variant="h6" style={{ marginRight: '10px', color: 'inherit' }}>
                    Total gain:
                  </Typography>
                  <Typography variant="h6" style={{ color: 'inherit' }}>
                    {formatNumber.format(totalGain)}
                  </Typography>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#FF7E7E' }}>
                <Typography color="textSecondary" variant="h6" style={{ marginRight: '10px', color: 'inherit' }}>
                  Min à commander:
                </Typography>
                <Typography variant="h6" style={{ color: 'inherit' }}>
                  {offer.minToOrder ? formatNumber.format(offer.minToOrder) : '-'}
                </Typography>
              </div>
            </>
          )}
        </div>
        {offerArticles &&
          offerArticles.map((article, i) => (
            <div
              key={article.id}
              style={{
                ...styles.card,
                backgroundColor: article.hasError ? '#ff000042' : i % 2 === 0 ? 'white' : '#f7f7f7',
              }}
            >
              {/*
               <div style={{ display: 'flex', marginBottom: '15px' }}>
                <Typography variant="h6" color="textSecondary">
                  Designation:
                </Typography> */}
              <Typography variant="h5" style={{ marginBottom: '11px' }}>
                {article.nom}
              </Typography>
              {/* </div> */}
              <div style={styles.row}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" color="textSecondary" style={{ marginRight: '10px' }}>
                    PPV:
                  </Typography>
                  <Typography variant="h6">{Number(article.ppv).toFixed(2)}</Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" color="textSecondary" style={{ marginRight: '10px' }}>
                    PPH:
                  </Typography>
                  <Typography variant="h6">{Number(article.pph).toFixed(2)}</Typography>
                </div>
              </div>
              <div style={styles.row}>
                <div style={{ display: 'flex', alignItems: 'center', color: '#4FB491' }}>
                  <Typography variant="body1" color="textSecondary" style={{ marginRight: '10px', color: 'inherit' }}>
                    PPH Remisé:
                  </Typography>
                  <Typography variant="h6" style={{ color: 'inherit' }}>
                    {Number(article.computedPPH).toFixed(2)}
                  </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: '#4FB491' }}>
                  <Typography variant="body1" color="textSecondary" style={{ marginRight: '10px', color: 'inherit' }}>
                    Remise:
                  </Typography>
                  <Typography variant="h6" style={{ color: 'inherit' }}>
                    {article.discount}%
                  </Typography>
                </div>
              </div>
              <div style={styles.row}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" color="textSecondary" style={{ marginRight: '10px' }}>
                    Quantité Minimale:
                  </Typography>
                  <Typography variant="h6">{article.minQuantity}</Typography>
                </div>
              </div>

              <div style={{ marginTop: 10 }}>
                <TextField
                  type="number"
                  onChange={e => handleQuantityChange(article, e.target.value)}
                  placeholder="Entrer quantité"
                  fullWidth
                  value={article.quantity}
                />
              </div>
            </div>
          ))}

        {!isCommandNotAllowed() && (
          <div style={styles.button}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
              Commander
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  createStructuredSelector({
    offerArticles: selectOfferArticleList(),
  }),
  mapDispatchToProps,
)(Demande);

const styles = {
  conatiner: {
    display: 'grid',
    gridTemplateCoulmn: '1fr',
    paddingBottom: '80px',
    // gap: '20px',
  },
  card: {
    padding: '17px 20px',
    // borderBottom: '1px solid #c4c4c4',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '6px',
  },
  offer: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 10px 16px rgba(0,0,0,0.03)',
    borderBottom: '1px solid #c4c4c4',
    backgroundColor: 'white',
    padding: '10px 20px',
  },
  button: {
    padding: '0 20px',
    position: 'fixed',
    bottom: '20px',
    left: 0,
    width: '100%',
  },
};
