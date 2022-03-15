import React from 'react';
import * as PropTypes from 'prop-types';
import _ from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOff from '@material-ui/icons/HighlightOff';
import ListIcon from '@material-ui/icons/List';
import Search from '@material-ui/icons/Search';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import 'react-sweet-progress/lib/style.css';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CloneIcon from '@material-ui/icons/FileCopy';
import DealOffIcon from '@material-ui/icons/CalendarToday';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import history from 'utils/history';
import OffreListConsultation from '../consultlistoffre/OffreListConsultation';
import Progressbar from '../consultlistoffre/Progress';
import WithRoles from '../../WithRoles';
import { ADMIN, MEMBRE, SUPER_ADMIN } from '../../AppHeader/Roles';
import {
  clearOffer,
  cloneOffer,
  closeOffer,
  deleteOffer,
  selectOffer,
} from '../actions';
import GeneriqueDialog from '../../../components/Alert';
import InfoBar from '../../../components/Snackbar/InfoBar';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const closeStyle = {
  float: 'right',
};
const tableCellsWidth = { width: `${100 / 5}%` };
const mSecondsPerDay = 86400 * 1000;

export class OffresListTableRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      showPopConfirmation: false,
      popConfirmationParams: {},
      showInfoBar: false,
      infoBarParams: {},
    };
  }
  openPopConfirmation = ({ title, textContent, onClose, onSubmit }) => {
    this.setState({
      showPopConfirmation: true,
      popConfirmationParams: {
        title,
        textContent,
        onClose,
        onSubmit,
      },
    });
  };

  closePopConfirmation = () => {
    this.setState({
      showPopConfirmation: false,
      popConfirmationParams: {},
    });
  };

  setIsShown = isShown => {
    this.setState({ isShown });
  };

  showDetails = () => {
    this.setState({ isShown: true, commandMode: false });
  };

  command = () => {
    this.allowOrderButton &&
      this.setState({
        isShown: true,
        commandMode: true,
      });
  };

  closeDetails = () => {
    this.setIsShown(false);
    this.props.dispatch(clearOffer());
  };

  canEdit = offre => {
    const now = Date.now();
    return moment(now).isBefore(offre.dateFin);
  };

  edit = () => {
    const { row } = this.props;
    const canEdit = this.canEdit(row);
    if (canEdit) {
      history.push(`/offres/edit/${row.id}`);
    }
  };

  canDelete = row => {
    const { dateDebut } = row;
    return moment(new Date()).isBefore(dateDebut);
  };

  deleteRow = () => {
    const { row, filters } = this.props;
    if (this.canDelete(row)) {
      this.props.dispatch(
        deleteOffer({
          id: row.id,
          filters,
          callback: err => {
            if (err) {
              this.setState({
                showPopConfirmation: false,
                showInfoBar: true,
                infoBarParams: {
                  title:
                    "La supression des offres à échoué merci de contacter l'administrateur ",
                },
              });
            }
            this.closePopConfirmation();
          },
        }),
      );
    }
  };

  get canCloseOffer() {
    const {
      row: { dateDebut, dateFin },
    } = this.props;
    return moment(new Date()).isBetween(new Date(dateDebut), new Date(dateFin));
  }

  closeOffer = () => {
    const {
      dispatch,
      row: { id, dateDebut, dateFin },
      filters,
    } = this.props;
    if (this.canCloseOffer)
      dispatch(
        closeOffer(id, filters, err => {
          if (err) {
            this.setState({
              showPopConfirmation: false,
              showInfoBar: true,
              infoBarParams: {
                title:
                  "La supression des offres à échoué merci de contacter l'administrateur ",
              },
            });
          }
          this.closePopConfirmation();
        }),
      );
  };

  duplicateOffer = () => {
    const {
      row: { id },
      dispatch,
      filters,
    } = this.props;
    dispatch(
      cloneOffer(id, filters, err => {
        if (err) {
          this.setState({
            showPopConfirmation: false,
            showInfoBar: true,
            infoBarParams: {
              title:
                "La duplication de l'offre à échoué merci de contacter l'administrateur ",
            },
          });
        }
        this.closePopConfirmation();
      }),
    );
  };

  get allowOrderButton() {
    const {
      row: { dateFin, dateDebut },
    } = this.props;
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    return moment(new Date()).isBetween(startDate, endDate, null, 'day');
  }

  closeInfoBar = () =>
    this.setState({
      showInfoBar: false,
      infoBarParams: {},
    });
  render() {
    const { row, width, offerArticles } = this.props;
    const {
      isShown,
      showPopConfirmation,
      popConfirmationParams,
      commandMode,
      showInfoBar,
      infoBarParams,
    } = this.state;
    const startDate = new Date(row.dateDebut);
    const endDate = new Date(row.dateFin);
    const hasStarted = moment(new Date()).isSameOrAfter(startDate, 'day');
    // const globalDuration = (startDate - endDate) / mSecondsPerDay;
    // const elapsedDuration = (now - endDate) / mSecondsPerDay;

    const totalDays = moment(endDate).diff(startDate, 'days');
    const elapsedDays = moment(new Date()).diff(startDate, 'days');
    let progress = _.round((elapsedDays / totalDays) * 100, 2);
    progress = progress > 100 || totalDays == 0 ? 100 : progress;
    const remainingDays = totalDays - elapsedDays;

    // const status = Math.min(elapsedDuration / globalDuration, 1) * 100 || 0;
    // const remainingDays = Math.floor((startDate - now) / mSecondsPerDay) + 1;
    const dayLabel = remainingDays === 1 ? 'jour' : 'jours';
    const total = _.sumBy(
      offerArticles,
      ({ quantity, pph }) => pph * quantity || 0,
    ).toFixed(2);

    const discount = _.sumBy(
      offerArticles,
      ({ quantity, computedPPH, pph }) =>
        quantity ? quantity * pph - quantity * computedPPH : 0,
    ).toFixed(2);
    return (
      <>
        <TableRow key={row.id}>
          <TableCell style={tableCellsWidth}>{row.designation}</TableCell>
          <TableCell style={tableCellsWidth}>{row.laboratoryName}</TableCell>
          <TableCell style={tableCellsWidth}>
            {moment(startDate).format('DD/MM/YYYY')}
          </TableCell>
          <TableCell style={tableCellsWidth}>
            <Progressbar progress={hasStarted ? progress : 0} />
            {moment(endDate).format('DD/MM/YYYY')}
            <br />
            {remainingDays > 0
              ? hasStarted
                ? `Il reste ${
                    remainingDays // eslint-disable-line
                  } ${dayLabel}`
                : `L'offre n'a pas encore commencé`
              : 'Offre clôturée !'}
          </TableCell>
          <TableCell
            style={{ ...tableCellsWidth, padding: 0, textAlign: 'center' }}
          >
            <Tooltip placement="top" title="Consulter">
              <IconButton onClick={this.showDetails} style={{ padding: 5 }}>
                <Search color="secondary" />
              </IconButton>
            </Tooltip>
            <WithRoles roles={[MEMBRE]}>
              <Tooltip placement="top" title="Commander">
                <IconButton
                  disabled={!this.allowOrderButton}
                  onClick={this.command}
                  style={{ padding: 5 }}
                >
                  <ShoppingCart
                    color={!this.allowOrderButton ? 'disabled' : 'secondary'}
                  />
                </IconButton>
              </Tooltip>
            </WithRoles>
            <WithRoles roles={[ADMIN, SUPER_ADMIN]}>
              <Tooltip placement="top" title="Modifier">
                <IconButton
                  disabled={!this.canEdit(row)}
                  onClick={this.edit}
                  style={{ padding: 5 }}
                >
                  <EditIcon
                    color={this.canEdit(row) ? 'primary' : 'disabled'}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip placement="top" title="Annuler">
                <IconButton
                  disabled={!this.canDelete(row)}
                  onClick={this.performDelete}
                  style={{ padding: 5 }}
                >
                  <HighlightOff
                    color={this.canDelete(row) ? 'error' : 'disabled'}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip placement="top" title="Clôturer l'offre">
                <IconButton
                  disabled={!this.canCloseOffer}
                  onClick={this.performCloseOffer}
                  style={{ padding: 5 }}
                >
                  <DealOffIcon
                    color={this.canCloseOffer ? 'primary' : 'disabled'}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip placement="top" title="List des commands">
                <IconButton
                  onClick={this.goToSubCommands(row)}
                  style={{ padding: 5 }}
                >
                  <ListIcon color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip placement="top" title="Dupliquer une offre">
                <IconButton
                  onClick={this.performCloneOffer}
                  style={{ padding: 5 }}
                >
                  <CloneIcon color="primary" />
                </IconButton>
              </Tooltip>
            </WithRoles>
          </TableCell>
        </TableRow>
        <GeneriqueDialog
          open={showPopConfirmation}
          {...popConfirmationParams}
        />
        <InfoBar
          open={showInfoBar}
          onClose={this.closeInfoBar}
          {...infoBarParams}
        />
        {isShown && (
          <Dialog
            maxWidth="lg"
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open
          >
            <MuiDialogTitle disableTypography>
              <Typography variant="h5" color="primary">
                Détails offre
                <IconButton
                  color="primary"
                  aria-label="Close"
                  onClick={this.closeDetails}
                  style={closeStyle}
                >
                  <CloseIcon />
                </IconButton>
              </Typography>
            </MuiDialogTitle>

            <MuiDialogContent>
              {total > 0 && (
                <div
                  style={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    paddingBottom: '20px',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ display: 'flex', marginRight: '30px' }}>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      style={{ marginRight: 10 }}
                    >
                      Total:
                    </Typography>
                    <Typography variant="h6">{total}</Typography>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      style={{ marginRight: 10 }}
                    >
                      Total remise:
                    </Typography>
                    <Typography variant="h6">{discount}</Typography>
                  </div>
                  <div />
                </div>
              )}

              <OffreListConsultation
                dismiss={this.closeDetails}
                hasStarted={hasStarted}
                commandMode={commandMode}
                row={row}
                remainingDays={remainingDays}
                progress={progress}
              />
            </MuiDialogContent>
          </Dialog>
        )}
      </>
    );
  }

  performDelete = () => {
    this.openPopConfirmation({
      title: 'Suppression',
      textContent: 'Êtes-vous sûr de supprimer cette offre ? ',
      onClose: this.closePopConfirmation,
      onSubmit: this.deleteRow,
    });
  };

  performCloseOffer = () => {
    this.openPopConfirmation({
      title: 'Clôturer',
      textContent: 'Êtes-vous sûr de clôturer cette offre ? ',
      onClose: this.closePopConfirmation,
      onSubmit: this.closeOffer,
    });
  };

  performCloneOffer = () => {
    this.openPopConfirmation({
      title: 'Dupliquer',
      textContent: 'Êtes-vous sûr de dépliquer cette offre ? ',
      onClose: this.closePopConfirmation,
      onSubmit: this.duplicateOffer,
    });
  };

  goToSubCommands = row => () => {
    const { dispatch } = this.props;
    dispatch(selectOffer(row));
    history.push(`/offres/${row.id}/commands`);
  };
}

OffresListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  filters: PropTypes.any,
};
export default withWidth()(OffresListTableRow);
