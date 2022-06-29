import { Button, Typography } from '@material-ui/core';
import React, { forwardRef, useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Update from './Update';
import Pagination from './Pagination';
import CommandArticlesList from './CommandArticlesList';
import { Done, Receipt, Settings } from '@material-ui/icons';
import Tippy from '@tippyjs/react';

const DETAILS_MODEL = 'details';
const ORDER_MODEL = 'commande';

const RowComponent = forwardRef((props, ref) => {
  return (
    <IconButton buttonRef={ref}>
      <PrintIcon color="primary" />
    </IconButton>
  );
});

const CommandListCards = ({
  commandsList,
  totalElements,
  handleChangeRowsPerPage,
  page,
  rowsPerPage,
  handleChangePage,
  printCommand,
  isAdmin,
  canDelete,
  disableClientEditCommand,
  deleteCommand,
  updateCommand,
  onRowChange,
  clearCommandArticles,
  isMember,
  dispatchQuantity,

  printFacture,
  printBL,
}) => {
  // console.log('commandsList', commandsList);
  const [modelsState, setModelsState] = useState({ name: '', data: null });

  const handleModel = (name = '', data = null) =>
    setModelsState({
      data,
      name,
    });
  const allowOrderButton = ({ dateFin, dateDebut }) =>
    moment(new Date()).isBetween(new Date(dateDebut), new Date(dateFin), null, 'day');
  return (
    <>
      <div style={styles.conatiner}>
        {commandsList.map(command => {
          const startDate = new Date(command.dateDebut);
          const endDate = new Date(command.dateFin);

          const totalDays = moment(endDate).diff(startDate, 'days');
          const elapsedDays = moment(new Date()).diff(startDate, 'days');
          let progress = _.round((elapsedDays / totalDays) * 100, 2);
          progress = progress > 100 || totalDays == 0 ? 100 : progress;

          return (
            <div key={command.commandId} style={styles.card}>
              <Typography variant="h5" style={{ marginBottom: '15px' }}>
                {command.offerName}
              </Typography>

              <div>
                <div style={{ display: 'flex' }}>
                  <Typography variant="h6" color="textSecondary" style={{ marginRight: '13px' }}>
                    laboratoire :
                  </Typography>
                  <Typography variant="h6">{command.laboratoryName}</Typography>
                </div>

                <div style={{ display: 'flex' }}>
                  <Typography variant="h6" color="textSecondary" style={{ marginRight: '13px' }}>
                    Date de debut :
                  </Typography>
                  <Typography variant="h6">{moment(command.dateDebut).format('DD/MM/YYYY')}</Typography>
                </div>

                <div style={{ display: 'flex' }}>
                  <Typography variant="h6" color="textSecondary" style={{ marginRight: '13px' }}>
                    Montant command :
                  </Typography>
                  <Typography variant="h6">{Number(command.totalAmount).toFixed(2)}</Typography>
                </div>
                <div style={{ display: 'flex' }}>
                  <Typography variant="h6" color="textSecondary" style={{ marginRight: '13px' }}>
                    Montant remise :
                  </Typography>
                  <Typography variant="h6">{Number(command.totalAmountDiscount).toFixed(2)}</Typography>
                </div>
              </div>
              <div style={styles.actions}>
                <IconButton onClick={() => handleModel(DETAILS_MODEL, command)} style={{ padding: 5 }}>
                  <Search color="secondary" />
                </IconButton>
                <Tippy
                  theme="light"
                  // visible={isTippyOpen}
                  // onClickOutside={handleTippyToggle}
                  trigger="click"
                  interactive
                  content={
                    <div>
                      <Button onClick={printCommand(command)}>Imprimer BC </Button> <br />
                      <Button onClick={printFacture(command)}>Imprimer facture </Button> <br />
                      <Button onClick={printBL(command)}>Imprimer BL </Button>
                    </div>
                  }
                >
                  <RowComponent />
                </Tippy>

                <IconButton
                  disabled={(!isAdmin && !command.canDelete) || disableClientEditCommand}
                  style={{ padding: 5 }}
                  onClick={() => handleModel(ORDER_MODEL, command)}
                >
                  <EditIcon color={(!isAdmin && !command.canDelete) || disableClientEditCommand ? 'disabled' : 'primary'} />
                </IconButton>

                {canDelete && (
                  <IconButton
                    disabled={!isAdmin && !command.canDelete}
                    onClick={deleteCommand({
                      ..._.pick(command, ['commandId', 'canDelete']),
                    })}
                    style={{ padding: 5 }}
                  >
                    <HighlightOff color={!isAdmin && !command.canDelete ? 'disabled' : 'error'} />
                  </IconButton>
                )}

                {isMember ? (
                  <IconButton onClick={dispatchQuantity(command)} disabled={command.deliveredAt ? true : false}>
                    <Done color={command.deliveredAt ? '' : 'primary'} />
                  </IconButton>
                ) : null}
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
              Détails command
              <IconButton onClick={handleModel}>
                <CloseIcon />
              </IconButton>
            </Typography>
          </MuiDialogTitle>
          <MuiDialogContent style={{ padding: '0' }}>
            <CommandArticlesList command={modelsState.data} />
          </MuiDialogContent>
        </Dialog>
      )}
      {modelsState.name === ORDER_MODEL && (
        <Dialog maxWidth="lg" onClose={handleModel} open fullWidth fullScreen>
          <MuiDialogTitle disableTypography>
            <Typography variant="h5" color="primary" style={{ display: 'flex', justifyContent: 'space-between' }}>
              Modifier command
              <IconButton onClick={handleModel}>
                <CloseIcon />
              </IconButton>
            </Typography>
          </MuiDialogTitle>
          <MuiDialogContent style={{ padding: '0' }}>
            <Update
              command={modelsState.data}
              updateCommand={updateCommand}
              onRowChange={onRowChange}
              toggleModal={handleModel}
              clearCommandArticles={clearCommandArticles}
            />
          </MuiDialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CommandListCards;

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
