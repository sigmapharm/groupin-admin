import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadCommandArticles } from '../../store/actions.creators';
import { getCommandArticles } from '../../store/selectors';

const CommandArticlesList = ({ command, commandArticles, dispatch }) => {
  useEffect(() => {
    dispatch(loadCommandArticles({ commandId: command.commandId }));
  }, []);

  return (
    <div>
      <div style={styles.conatiner}>
        <div style={styles.command}>
          <div style={styles.row}>
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
          </div>
        </div>
        {commandArticles &&
          commandArticles.map((article, i) => (
            <div
              key={article.id}
              style={{
                ...styles.card,
                backgroundColor: i % 2 === 0 ? 'white' : '#f7f7f7',
              }}
            >
              {/* <div style={{ display: 'flex', marginBottom: '15px' }}>
                <Typography variant="h6" color="textSecondary">
                  Designation:
                </Typography> */}
              <Typography variant="h5" style={{ marginBottom: '11px' }}>
                {article.nom}
              </Typography>
              {/* </div> */}
              <div style={styles.row}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    style={{ marginRight: '10px' }}
                  >
                    PPV:
                  </Typography>
                  <Typography variant="h6">
                    {Number(article.ppv).toFixed(2)}
                  </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    style={{ marginRight: '10px' }}
                  >
                    PPH:
                  </Typography>
                  <Typography variant="h6">
                    {Number(article.pph).toFixed(2)}
                  </Typography>
                </div>
              </div>
              <div style={styles.row}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    style={{ marginRight: '10px' }}
                  >
                    PPH Remise:
                  </Typography>
                  <Typography variant="h6">
                    {Number(article.computedPPH).toFixed(2)}
                  </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    style={{ marginRight: '10px' }}
                  >
                    Remise(%):
                  </Typography>
                  <Typography variant="h6">{article.discount}</Typography>
                </div>
              </div>
              <div style={styles.row}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    style={{ marginRight: '10px' }}
                  >
                    Quantité demandée:
                  </Typography>
                  <Typography variant="h6">{article.quantity}</Typography>
                </div>
              </div>
            </div>
          ))}
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
)(CommandArticlesList);

const styles = {
  conatiner: {
    display: 'grid',
    gridTemplateCoulmn: '1fr',
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
    boxShadow: '0 10px 16px rgba(0,0,0,0.02)',
    borderBottom: '1px solid #c4c4c4',
    backgroundColor: 'white',
    padding: '10px 20px',
  },
};
