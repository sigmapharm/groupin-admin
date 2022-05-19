import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import Progressbar from '../consultlistoffre/Progress';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import WithRoles from '../../WithRoles';
import { MEMBRE } from '../../AppHeader/Roles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import OfferList from './OfferList';
import Demande from './Demande';
import { getOffreList } from '../actions';
import { connect } from 'react-redux';
import { makeSelectOffresList } from '../selectors';
import Pagination from './Pagination';
import { createStructuredSelector } from 'reselect';

const DETAILS_MODEL = 'details';
const ORDER_MODEL = 'commande';

const OffresListCards = ({
  offerArticles,
  totalElements,
  handleChangeRowsPerPage,
  page,
  rowsPerPage,
  handleChangePage,
  offresList,
}) => {
  //
  const [modelsState, setModelsState] = useState({ name: '', data: null });

  const [selectedOffre, setSelectedOffre] = useState(null);

  const handleModel = (name = '', data = null) => {
    setModelsState({
      data,
      name,
    });

    setSelectedOffre(data);
  };
  const allowOrderButton = ({ dateFin, dateDebut }) =>
    moment(new Date()).isBetween(new Date(dateDebut), new Date(dateFin), null, 'day');

  const totalRemise = _.sumBy(offerArticles, ({ quantity, computedPPH, tva }) => {
    const RemiseCalc = computedPPH * quantity;

    const calcTva = (tva / 100) * RemiseCalc;

    return parseFloat(calcTva) + parseFloat(RemiseCalc) || 0;
  });

  let total = _.sumBy(offerArticles, ({ quantity, pph, tva }) => pph * quantity + pph * quantity * (tva / 100) || 0);

  const GLobalDiscount = parseFloat(totalRemise) * (parseFloat(selectedOffre ? selectedOffre.globalDiscount : 0) / 100);

  let totalWidthGlobalDiscount = totalRemise - GLobalDiscount;
  const totalGain = (total - totalWidthGlobalDiscount).toFixed(2);

  //arrondir les valeurs
  totalWidthGlobalDiscount = totalWidthGlobalDiscount.toFixed(2);
  total = total.toFixed(2);

  return (
    <>
      <div style={styles.conatiner}>
        {offresList.map(offre => {
          const startDate = new Date(offre.dateDebut);
          const endDate = new Date(offre.dateFin);
          const hasStarted = moment(new Date()).isSameOrAfter(startDate, 'day');
          const totalDays = moment(endDate).diff(startDate, 'days');
          const elapsedDays = moment(new Date()).diff(startDate, 'days');
          let progress = _.round((elapsedDays / totalDays) * 100, 2);
          progress = progress > 100 || totalDays == 0 ? 100 : progress;
          const remainingDays = totalDays - elapsedDays;
          const dayLabel = remainingDays === 1 ? 'jour' : 'jours';

          return (
            <div key={offre.id} style={styles.card}>
              <Typography variant="h5" style={{ marginBottom: '15px' }}>
                {offre.designation}
              </Typography>

              <div>
                <div style={{ display: 'flex' }}>
                  <Typography variant="h6" color="textSecondary" style={{ marginRight: '13px' }}>
                    laboratoire :
                  </Typography>
                  <Typography variant="h6">{offre.laboratoryName}</Typography>
                </div>

                <div style={{ display: 'flex' }}>
                  <Typography variant="h6" color="textSecondary" style={{ marginRight: '13px' }}>
                    Date de debut :
                  </Typography>
                  <Typography variant="h6">{moment(offre.dateDebut).format('DD/MM/YYYY')}</Typography>
                </div>

                <div style={{ display: 'flex' }}>
                  <Typography variant="h6" color="textSecondary" style={{ marginRight: '13px' }}>
                    Date de fin :
                  </Typography>
                  <Typography variant="h6">
                    <Progressbar progress={hasStarted ? progress : 0} />

                    {moment(endDate).format('DD/MM/YYYY')}
                    <br />
                    {remainingDays > 0
                      ? hasStarted
                        ? `Il reste ${remainingDays} ${dayLabel}`
                        : `L'offre n'a pas encore commencé`
                      : 'Offre clôturée !'}
                  </Typography>
                </div>
              </div>
              <div style={styles.actions}>
                <IconButton onClick={() => handleModel(DETAILS_MODEL, offre)} style={{ padding: 5 }}>
                  <Search color="secondary" />
                </IconButton>
                <WithRoles roles={[MEMBRE]}>
                  <IconButton
                    disabled={!allowOrderButton(offre)}
                    onClick={() => handleModel(ORDER_MODEL, offre)}
                    style={{ padding: 5 }}
                  >
                    <ShoppingCart color={!allowOrderButton(offre) ? 'disabled' : 'secondary'} />
                  </IconButton>
                </WithRoles>
              </div>
            </div>
          );
        })}

        <div>
          <Pagination
            totalElements={totalElements}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      </div>

      {modelsState.name === DETAILS_MODEL && (
        <Dialog maxWidth="lg" onClose={handleModel} open fullWidth fullScreen>
          <MuiDialogTitle disableTypography>
            <Typography variant="h5" color="primary" style={{ display: 'flex', justifyContent: 'space-between' }}>
              Détails offre
              <IconButton onClick={handleModel}>
                <CloseIcon />
              </IconButton>
            </Typography>
          </MuiDialogTitle>
          <MuiDialogContent style={{ padding: '0' }}>
            <OfferList offer={modelsState.data} />
          </MuiDialogContent>
        </Dialog>
      )}
      {modelsState.name === ORDER_MODEL && (
        <Dialog maxWidth="lg" onClose={handleModel} open fullWidth fullScreen>
          <MuiDialogTitle disableTypography>
            <Typography variant="h5" color="primary" style={{ display: 'flex', justifyContent: 'space-between' }}>
              Demande offre
              <IconButton onClick={handleModel}>
                <CloseIcon />
              </IconButton>
            </Typography>
          </MuiDialogTitle>
          <MuiDialogContent style={{ padding: '0' }}>
            <Demande
              offer={modelsState.data}
              totalRemise={totalRemise}
              row={selectedOffre}
              totalWidthGlobalDiscount={totalWidthGlobalDiscount}
              totalGain={totalGain}
            />
          </MuiDialogContent>
        </Dialog>
      )}
    </>
  );
};

export default OffresListCards;

const styles = {
  conatiner: {
    display: 'grid',
    gridTemplateCoulmn: '1fr',
    gap: '20px',
  },
  card: {
    padding: '15px 17px',
    // border: '0.5px solid #ccc',
    borderRadius: '6px',
    backgroundColor: 'white',
    boxShadow: '0 10px 18px 0  rgba(0,0,0,.0.3)',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '6px',
  },
};
