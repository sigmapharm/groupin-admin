/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import Search from '@material-ui/icons/Search';
import Shoping from '@material-ui/icons/ShoppingCart';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import 'react-sweet-progress/lib/style.css';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// eslint-disable-next-line no-unused-vars
import { Table, TableHead, TableBody, Divider } from '@material-ui/core';
// eslint-disable-next-line no-unused-vars
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// eslint-disable-next-line no-unused-vars
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Progressbar from '../offreLitConsultMember/Progressbar';

const tabelcel = { width: '13px' };
const champdesignation = { width: '24%' };
const champtimeline = { width: '45%' };
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    color: '#fff000',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  input: {
    color: 'black',
  },
  dense: {
    marginTop: 19,
  },
  MuiInputBaseInput5355: {
    color: 'red',
  },
  menu: {
    width: 200,
  },
});

export class OffresListTableRows extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isdisplaydata: false };
  }

  // eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line react/prop-types
    const { row, classes } = this.props;
    const dateFin = new Date(row.dateFin);
    const dateDebut = new Date(row.dateDebut);
    const mSecondesParJour = 86400 * 1000;
    const dureeGolbale = (dateFin - dateDebut) / mSecondesParJour;
    const dureeAujoudhui = (new Date() - dateDebut) / mSecondesParJour;
    const avancement = Math.min(dureeAujoudhui / dureeGolbale, 1) * 100;
    const joursRestants =
      Math.floor((dateFin - new Date()) / mSecondesParJour) + 1;
    const joursLabel = joursRestants === 1 ? 'jour' : 'jours';
    const dateformat = new Intl.DateTimeFormat('fr-FR').format(dateFin);
    return (
      <React.Fragment>
        <TableRow key={row.id}>
          <TableCell component="th" scope="row" style={champdesignation}>
            {row.designation}
          </TableCell>
          <TableCell style={champtimeline}>
            <Progressbar progress={avancement} />{' '}
            {joursRestants > 0
              ? `Il vous reste ${joursRestants} ${joursLabel}`
              : 'Offre clôturée !'}
          </TableCell>
          <TableCell>{dateformat}</TableCell>

          <TableCell style={tabelcel}>
            <Search color="primary" onClick={() => this.edit(row)} />
          </TableCell>
          <TableCell style={tabelcel}>
            <Shoping color="primary" />
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
                aria-label="Close"
                style={{ marginLeft: '74rem' }}
                onClick={this.handledetailclose}
              >
                <CloseIcon />
              </IconButton>
            </Typography>
          </MuiDialogTitle>
          <MuiDialogContent>
            <React.Fragment>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Désignation"
                  defaultValue={row.designation}
                  className={classes.textField}
                  inputProps={{
                    className: classes.input,
                  }}
                  margin="normal"
                />
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Laboratoire"
                  defaultValue={row.laboratoire && row.laboratoire.nom}
                  className={classes.textField}
                  inputProps={{
                    className: classes.input,
                  }}
                  margin="normal"
                />
                <TextField
                  disabled
                  id="standard-disabled"
                  label="quantité minimal"
                  defaultValue={row.quantiteMin}
                  className={classes.textField}
                  inputProps={{
                    className: classes.input,
                  }}
                  margin="normal"
                />

                <div style={{ width: '28%', marginTop: '28px' }}>
                  <Progressbar progress={avancement} />
                  {joursRestants > 0
                    ? `Il vous reste ${joursRestants} ${joursLabel}`
                    : 'Offre clôturée !'}
                </div>
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Date fin"
                  defaultValue={dateformat}
                  className={classes.textField}
                  inputProps={{
                    className: classes.input,
                  }}
                  margin="normal"
                />

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Désignation de l'article</TableCell>
                      <TableCell>PPV</TableCell>
                      <TableCell>
                        <span style={{ textDecoration: 'line-through' }}>
                          PPH
                        </span>{' '}
                      </TableCell>
                      <TableCell>Remise</TableCell>
                      <TableCell>PPH remisé</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </form>
            </React.Fragment>
          </MuiDialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

OffresListTableRows.defaultProps = {};

OffresListTableRows.propTypes = {
  row: PropTypes.object.isRequired,
};

export default withStyles(styles)(OffresListTableRows);
