import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Progressbar from './Progress';

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

export class OffreListConsultation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { row, avancement, classes } = this.props;
    const datefin = new Date(row.dateFin);
    const mSecondesParJour = 86400 * 1000;
    const joursRestants =
      Math.floor((datefin - new Date()) / mSecondesParJour) + 1;
    const joursLabel = joursRestants === 1 ? 'jour' : 'jours';
    const avancementMontant = Math.min(row.montant / 100000, 1) * 100;

    const dateformat = new Intl.DateTimeFormat('fr-FR').format(datefin);
    return (
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
            label="Date fin"
            defaultValue={dateformat}
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
          <TextField
            disabled
            id="standard-disabled"
            label="Status de l'offre"
            defaultValue={row.status}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />

          <div style={{ width: '25%', marginTop: '28px' }}>
            <Progressbar progress={avancement} />
            {joursRestants > 0
              ? `Il vous reste ${joursRestants} ${joursLabel}`
              : 'Offre clôturée !'}
          </div>
          <TextField
            disabled
            id="standard-disabled"
            label="Objectif "
            defaultValue={row.montant}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Objectif "
            defaultValue={row.montant}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <div style={{ width: '25%', marginTop: '28px' }}>
            <Progressbar progress={avancementMontant} />
            {row.montant} MAD {avancementMontant}%
          </div>
        </form>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Désignation</TableCell>
              <TableCell>PPV</TableCell>
              <TableCell>
                PPH{' '}
                <hr
                  style={{
                    width: '30%',
                    marginLeft: '0',
                    height: '3px',
                    backgroundColor: 'red',
                  }}
                />
              </TableCell>
              <TableCell>
                Remise (%)
                <hr
                  style={{
                    width: '30%',
                    marginLeft: '0',
                    height: '3px',
                    backgroundColor: 'red',
                  }}
                />
              </TableCell>
              <TableCell>
                PPH Remise
                <hr
                  style={{
                    width: '45%',
                    marginLeft: '0',
                    height: '3px',
                    backgroundColor: 'red',
                  }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" />
              <TableCell>{}</TableCell>
              <TableCell />
              <TableCell />
              <TableCell>{row.articledtos && row.articledtos}</TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

OffreListConsultation.defaultProps = {
  row: PropTypes.object.isRequired,
};

export default withStyles(styles)(OffreListConsultation);
