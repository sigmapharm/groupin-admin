import React from 'react';
import * as PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Search from '@material-ui/icons/Search';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import 'react-sweet-progress/lib/style.css';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import OffreListConsultation from '../consultlistoffre/OffreListConsultation';
import Progressbar from '../consultlistoffre/Progress';
import WithRoles from '../../WithRoles';
import { ADMIN, SUPER_ADMIN } from '../../AppHeader/Roles';

const closeStyle = {
  float: 'right',
};
const tableCellsWidth = { width: `${100 / 5}%` };
const mSecondsPerDay = 86400 * 1000;

export class OffresListTableRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isShown: false };
  }

  setIsShown = isShown => {
    this.setState({
      isShown,
    });
  };

  showDetails = () => {
    this.setIsShown(true);
  };

  closeDetails = () => {
    this.setIsShown(false);
  };

  canEdit = offre => {
    const now = Date.now();
    return (
      // date de début < date d auj
      !moment(now).isSameOrAfter(offre.dateDebut) ||
      // active is true and date début < date auj
      (moment(now).isSameOrBefore(offre.dateDebut) && offre.active === true)
    );
  };

  edit = () => {
    const { row } = this.props;
    const canEdit = this.canEdit(row);
    if (!canEdit) {
      alert( // eslint-disable-line
        'Vous ne pouvez pas modifier une offre qui a commencé, terminée, ou qui a été annulée.',
      );
    } else {
      alert('Pas encore implémentée'); // eslint-disable-line
    }
  };

  cancel = () => {
    const { row } = this.props;
    const canEdit = this.canEdit(row);
    if (!canEdit) {
      alert( // eslint-disable-line
        'Vous ne pouvez pas annuler une offre qui a commencé, terminée, ou qui a été annulée.',
      );
    } else {
      alert('Pas encore implémentée'); // eslint-disable-line
    }
  };

  render() {
    const { row } = this.props;
    const { isShown } = this.state;
    const now = Date.now();
    const startDate = new Date(row.dateFin);
    const endDate = new Date(row.dateDebut);
    const hasStarted = moment(now).isSameOrAfter(startDate);
    const globalDuration = (startDate - endDate) / mSecondsPerDay;
    const elapsedDuration = (now - endDate) / mSecondsPerDay;
    const status = Math.min(elapsedDuration / globalDuration, 1) * 100;
    const remainingDays = Math.floor((startDate - now) / mSecondsPerDay) + 1;
    const dayLabel = remainingDays === 1 ? 'jour' : 'jours';
    return (
      <>
        <TableRow key={row.id}>
          <TableCell style={tableCellsWidth}>{row.designation}</TableCell>
          <TableCell style={tableCellsWidth}>
            {row.laboratoire && row.laboratoire.nom}
          </TableCell>
          <TableCell style={tableCellsWidth}>
            {moment(startDate).format('DD/MM/YYYY')}
          </TableCell>
          <TableCell style={tableCellsWidth}>
            <Progressbar progress={status} />
            {moment(endDate).format('DD/MM/YYYY')}
            <br />
            {remainingDays > 0 // eslint-disable-line
              ? hasStarted
                ? `Il reste ${remainingDays} ${dayLabel}`
                : `L'offre n'a pas encore commencé`
              : 'Offre clôturée !'}
          </TableCell>
          <TableCell style={{ ...tableCellsWidth, padding: 0, textAlign: 'center' }}>
            <Tooltip placement="top" title="Consulter">
              <IconButton onClick={this.showDetails} style={{ padding: 5 }}>
                <Search color="secondary" />
              </IconButton>
            </Tooltip>
            <WithRoles roles={[ADMIN, SUPER_ADMIN]}>
              <Tooltip placement="top" title="Modifier">
                <IconButton onClick={this.edit} style={{ padding: 5 }}>
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip placement="top" title="Annuler">
                <IconButton onClick={this.cancel} style={{ padding: 5 }}>
                  <HighlightOff color="error" />
                </IconButton>
              </Tooltip>
            </WithRoles>
          </TableCell>
        </TableRow>
        {isShown && (
          <Dialog
            maxWidth="lg"
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open
          >
            <MuiDialogTitle disableTypography>
              <Typography variant="h5" color="primary">
                {`Détails offre`}{' '}
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
              <OffreListConsultation row={row} avancement={status} />
            </MuiDialogContent>
          </Dialog>
        )}
      </>
    );
  }
}

OffresListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
};
export default OffresListTableRow;
