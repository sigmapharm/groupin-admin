import { TextField, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { changeOfferArticle, clearOffer, loadArticleOffer, submitClientCommand } from '../actions';
import { selectOfferArticleList } from '../selectors';
import _ from 'lodash';
import history from 'utils/history';

const Demande = ({ offer, offerArticles, dispatch, totalGain, totalWidthGlobalDiscount, ...props }) => {
  console.log('offerArticles', offer);
  const [error, setError] = useState('');
  useEffect(() => {
    dispatch(loadArticleOffer({ id: offer.id }));
  }, []);

  const handleQuantityChange = (article, quantity) => {
    dispatch(
      changeOfferArticle({
        id: article.id,
        quantity: +quantity,
        hasError: quantity && +quantity < article.minQuantity,
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
  // const allowCommandSubmit = () => {
  //   return offerArticles.filter(({ quantity, minQuantity }) => quantity >= minQuantity).length > 0 &&
  //     offerArticles.filter(({ quantity }) => quantity > 0).every(({ hasError }) => hasError === false)
  //     ? true
  //     : false;
  // };

  const allowCommandSubmit = () => {
    const { totalRemise, row } = props;
    const isAllowed =
      offerArticles.filter(({ quantity, minQuantity }) => quantity >= minQuantity).length > 0 &&
      offerArticles.filter(({ quantity }) => quantity > 0).every(({ hasError }) => hasError === false)
        ? true
        : false;

    console.log('row.minToOrder', row.minToOrder);

    const isEqual = totalRemise === parseInt(row.minToOrder) ? true : false;

    const isGreater = totalRemise > parseInt(row.minToOrder) ? true : false;

    if (!row.minToOrder) {
      return isAllowed;
    }

    if (isAllowed && (isEqual || isGreater)) {
      return false;
    }

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
              <Typography color="textSecondary">Designation</Typography>
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
                {offer.globalDiscount}
              </Typography>
            </div>
          </div>
          {total > 0 && (
            <>
              <div style={{ ...styles.row }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography color="textSecondary" variant="h6" style={{ marginRight: '10px' }}>
                    Total remisé:
                  </Typography>
                  <Typography variant="h6">
                    {/* {total} */}
                    {totalWidthGlobalDiscount}
                  </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography color="textSecondary" variant="h6" style={{ marginRight: '10px' }}>
                    Total gain:
                  </Typography>
                  <Typography variant="h6">{totalGain}</Typography>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography color="textSecondary" variant="h6" style={{ marginRight: '10px' }}>
                  Min à commander:
                </Typography>
                <Typography variant="h6">{offerArticles.minToOrder}</Typography>
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" color="textSecondary" style={{ marginRight: '10px' }}>
                    PPH Remise:
                  </Typography>
                  <Typography variant="h6">{Number(article.computedPPH).toFixed(2)}</Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" color="textSecondary" style={{ marginRight: '10px' }}>
                    Remise(%):
                  </Typography>
                  <Typography variant="h6">{article.discount}</Typography>
                </div>
              </div>
              <div style={styles.row}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" color="textSecondary" style={{ marginRight: '10px' }}>
                    Quantité Minimal:
                  </Typography>
                  <Typography variant="h6">{article.minQuantity}</Typography>
                </div>
              </div>

              <div style={{ marginTop: 10 }}>
                <TextField
                  type="number"
                  onChange={e => handleQuantityChange(article, e.target.value)}
                  placeholder="Entrer quantity"
                  fullWidth
                />
              </div>
            </div>
          ))}

        {allowCommandSubmit() && (
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
