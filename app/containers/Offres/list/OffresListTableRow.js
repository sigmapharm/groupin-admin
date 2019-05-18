import React from 'react';
import * as PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import FileCopy from '@material-ui/icons/FileCopy';
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
import OffreListConsultation from '../consultlistoffre/OffreListConsultation';
import Progressbar from '../consultlistoffre/Progress';

const closeStyle = {
  marginLeft: '59rem',
};
const champprogress = { width: '20%' };
const champAction = { width: '23%' };
const typo3syle = { marginLeft: '4%' };
export class OffresListTableRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isdisplaydata: false };
  }

  edit = row => {
    this.setState({
      isdisplaydata: true,
    });
  };

  handledetailclose = () => {
    this.setState({
      isdisplaydata: false,
    });
  };

  render() {
    const { row } = this.props;
    const dateFin = new Date(row.dateFin);
    const dateDebut = new Date(row.dateDebut);
    const mSecondesParJour = 86400 * 1000;
    const dureeGolbale = (dateFin - dateDebut) / mSecondesParJour;
    const dureeAujoudhui = (new Date() - dateDebut) / mSecondesParJour;
    const avancement = Math.min(dureeAujoudhui / dureeGolbale, 1) * 100;
    const avancementMontant = Math.min(row.montant / 100000, 1) * 100;
    const joursRestants =
      Math.floor((dateFin - new Date()) / mSecondesParJour) + 1;
    const joursLabel = joursRestants === 1 ? 'jour' : 'jours';
    return (
      <React.Fragment>
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.designation}
          </TableCell>
          <TableCell>{row.laboratoire && row.laboratoire.nom}</TableCell>
          <TableCell>{row.status}</TableCell>
          <TableCell style={champprogress}>
            {' '}
            {row.montant}
            <Progressbar progress={avancementMontant} />
            {`${avancementMontant}%`}
          </TableCell>
          <TableCell style={champprogress}>
            <Progressbar progress={avancement} />
            {joursRestants > 0
              ? `Il vous reste ${joursRestants} ${joursLabel}`
              : 'Offre clôturée !'}
          </TableCell>
          <TableCell style={champAction}>
            <Search
              color="secondary"
              style={typo3syle}
              onClick={() => this.edit(row)}
            />
            <EditIcon color="primary" style={typo3syle} />
            <FileCopy color="secondary" style={typo3syle} />
            <HighlightOff color="error" style={typo3syle} />
          </TableCell>
        </TableRow>

        <Dialog
          maxWidth="lg"
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.isdisplaydata}
        >
          <MuiDialogTitle disableTypography>
            <Typography variant="h5" color="primary">
              {`Details offre`}{' '}
              <IconButton
                color="primary"
                aria-label="Close"
                onClick={this.handledetailclose}
                style={closeStyle}
              >
                <CloseIcon />
              </IconButton>
            </Typography>
          </MuiDialogTitle>
          <MuiDialogContent>
            <OffreListConsultation row={row} avancement={avancement} />
          </MuiDialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

OffresListTableRow.defaultProps = {};

OffresListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
};
export default OffresListTableRow;
