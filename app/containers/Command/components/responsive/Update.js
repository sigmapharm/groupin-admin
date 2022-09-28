import { TextField, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadCommandArticles, changeCommandArticle, updateCommandDetail } from '../../store/actions.creators';
import { getCommandArticles } from '../../store/selectors';
import _ from 'lodash';
import history from 'utils/history';

const Demande = ({ command, commandArticles, dispatch, clearCommandArticles, onRowChange, toggleModal }) => {
  const [error, setError] = useState('');
  useEffect(() => {
    dispatch(loadCommandArticles({ commandId: command.commandId }));
  }, []);

  const handleSubmitResponse = (err, response) => {
    clearCommandArticles();
    toggleModal();
  };

  const handleSubmit = () => {
    dispatch(
      updateCommandDetail({
        commandId: command.commandId,
        commandArticles,
        callback: handleSubmitResponse,
      }),
    );
  };

  const total = _.sumBy(commandArticles, ({ quantity, computedPPH }) => (quantity || 0) * computedPPH || 0).toFixed(2) || 0;

  const discount =
    _.sumBy(commandArticles, ({ quantity, computedPPH, pph }) => quantity * pph - quantity * computedPPH).toFixed(2) || 0;
  return (
    <div>
      <div style={styles.conatiner}>
        <div style={styles.command}>
          {/* <div style={styles.row}>
            <div>
              <Typography color="textSecondary">Designation</Typography>
              <Typography variant="h6" component="h2">
                {command.designation}
              </Typography>
            </div>
            <div>
              <Typography color="textSecondary">Laboratoire</Typography>
              <Typography variant="h6" component="h2">
                {command.laboratoryName}
              </Typography>
            </div>
          </div>
          <div style={styles.row}>
            <div>
              <Typography color="textSecondary">Date Début</Typography>
              <Typography variant="h6" component="h2">
                {moment(command.startDate).format('DD/MM/YYYY')}
              </Typography>
            </div>
            <div>
              <Typography color="textSecondary">Date fin</Typography>
              <Typography variant="h6" component="h2">
                {moment(command.endDate).format('DD/MM/YYYY')}
              </Typography>
            </div>
          </div>
          <div style={styles.row}>
            <div>
              <Typography color="textSecondary">Status</Typography>
              <Typography variant="h6" component="h2">
                {command.status}
              </Typography>
            </div>
            <div>
              <Typography color="textSecondary">Escompte</Typography>
              <Typography variant="h6" component="h2">
                {command.globalDiscount}
              </Typography>
            </div>
          </div> */}
          {total > 0 && (
            <div style={{ ...styles.row }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography color="textSecondary" variant="h6" style={{ marginRight: '10px' }}>
                  Total:
                </Typography>
                <Typography variant="h6">{total}</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography color="textSecondary" variant="h6" style={{ marginRight: '10px' }}>
                  Total remise:
                </Typography>
                <Typography variant="h6">{discount}</Typography>
              </div>
            </div>
          )}
        </div>
        {commandArticles &&
          commandArticles.map((article, i) => (
            <div
              key={article.id}
              style={{
                ...styles.card,
                backgroundColor: article.hasError ? '#ff000042' : i % 2 === 0 ? 'white' : '#f7f7f7',
              }}
            >
              <div style={{ display: 'flex', marginBottom: '15px' }}>
                <Typography variant="h6" color="textSecondary">
                  Designation:
                </Typography>
                <Typography variant="h6" style={{ marginBottom: '11px' }}>
                  {article.label}
                </Typography>
              </div>
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
                  onChange={e => onRowChange({ index: i, quantity: +e.target.value })}
                  placeholder="Entrer quantity"
                  fullWidth
                  defaultValue={article.quantity}
                />
              </div>
            </div>
          ))}

        <div style={styles.button}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Modifier
          </Button>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  createStructuredSelector({
    commandArticles: getCommandArticles(),
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
  command: {
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
