import React from 'react';
import * as PropTypes from 'prop-types';
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
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import history from 'utils/history';
import OffreListConsultation from '../consultlistoffre/OffreListConsultation';
import Progressbar from '../consultlistoffre/Progress';
import WithRoles from '../../WithRoles';
import { ADMIN, MEMBRE, SUPER_ADMIN } from '../../AppHeader/Roles';
import { clearOffer, deleteOffer } from '../actions';
import GeneriqueDialog from '../../../components/Alert';

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
      deleteDialogIsShown: false,
    };
  }

  setIsShown = isShown => {
    this.setState({
      isShown,
    });
  };

  showDetails = () => {
    this.setState({
      isShown: true,
      commandMode: false,
    });
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
    if (canEdit) {
      history.push(`/offres/edit/${row.id}`);
    }
  };

  deleteRow = () => {
    const { row, filters } = this.props;
    const canEdit = this.canEdit(row);
    if (canEdit) {
      this.props.dispatch(deleteOffer({ id: row.id, filters }));
      this.setState({ deleteDialogIsShown: false });
    }
  };

  get allowOrderButton() {
    const {
      row: { dateFin, dateDebut },
    } = this.props;
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    return moment(new Date()).isBetween(startDate, endDate, null, true);
  }

  render() {
    const { row } = this.props;
    const { isShown, deleteDialogIsShown, commandMode } = this.state;
    const now = Date.now();
    const startDate = new Date(row.dateDebut);
    const endDate = new Date(row.dateFin);
    const hasStarted = moment(now).isSameOrAfter(startDate);
    // const globalDuration = (startDate - endDate) / mSecondsPerDay;
    // const elapsedDuration = (now - endDate) / mSecondsPerDay;

    const totalDays = moment(endDate).diff(startDate, 'days');
    const elapsedDays = moment(new Date()).diff(startDate, 'days');
    const progress = _.round((elapsedDays / totalDays) * 100, 2);
    const remainingDays = totalDays - elapsedDays;

    // const status = Math.min(elapsedDuration / globalDuration, 1) * 100 || 0;
    // const remainingDays = Math.floor((startDate - now) / mSecondsPerDay) + 1;
    const dayLabel = remainingDays === 1 ? 'jour' : 'jours';
    return (
      <>
        <TableRow key={row.id}>
          <TableCell style={tableCellsWidth}>{row.designation}</TableCell>
          <TableCell style={tableCellsWidth}>{row.laboratoryName}</TableCell>
          <TableCell style={tableCellsWidth}>
            {moment(startDate).format('DD/MM/YYYY')}
          </TableCell>
          <TableCell style={tableCellsWidth}>
            <Progressbar progress={progress} />
            {moment(endDate).format('DD/MM/YYYY')}
            <br />
            {remainingDays > 0 // eslint-disable-line
              ? hasStarted
                ? `Il reste ${remainingDays} ${dayLabel}`
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
                  <ShoppingCart color="secondary" />
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
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip placement="top" title="Annuler">
                <IconButton
                  disabled={!this.canEdit(row)}
                  onClick={() => this.setState({ deleteDialogIsShown: true })}
                  style={{ padding: 5 }}
                >
                  <HighlightOff color="error" />
                </IconButton>
              </Tooltip>
              <Tooltip placement="top" title="List des commands">
                <IconButton
                  onClick={() => history.push(`/offres/${row.id}/commands`)}
                  style={{ padding: 5 }}
                >
                  <ListIcon color="primary" />
                </IconButton>
              </Tooltip>
            </WithRoles>
          </TableCell>
        </TableRow>
        {deleteDialogIsShown && (
          <GeneriqueDialog
            open={deleteDialogIsShown}
            title="Suppression"
            textContent="Êtes-vous sûr de supprimer cette offre ? "
            onClose={() => this.setState({ deleteDialogIsShown: false })}
            onSubmit={this.deleteRow}
          />
        )}
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
}

OffresListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  filters: PropTypes.any
};
export default OffresListTableRow;
