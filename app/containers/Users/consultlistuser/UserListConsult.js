import React from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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

export class UserListConsult extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { row, classes } = this.props;
    const dateCreation = new Date(row.pharmacie.dateCreation);
    const dateCreationarticlee = new Date(row.dateCreation);
    const dateformatdemaragee = new Date(row.pharmacie.dateDemarrage);
    const dateformatcreationarticle = new Intl.DateTimeFormat('fr-FR').format(
      dateCreationarticlee,
    );

    const dateformatcreation = new Intl.DateTimeFormat('fr-FR').format(
      dateCreation,
    );
    const dateformatdemarage = new Intl.DateTimeFormat('fr-FR').format(
      dateformatdemaragee,
    );

    return (
      <React.Fragment>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            disabled
            id="standard-disabled"
            label="Nom"
            defaultValue={row.firstName}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Région"
            defaultValue={row.region}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Prénom "
            defaultValue={row.lastName}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Adresse"
            defaultValue={row.adresse}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Code"
            defaultValue={row.codePostal}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Ville"
            defaultValue={row.ville}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="CIN"
            defaultValue={row.cin}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Tél"
            defaultValue={row.tel}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Gsm"
            defaultValue={row.gsm}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Date de création"
            defaultValue={dateformatcreationarticle}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Rôle"
            defaultValue={row.role}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
        </form>
        <br />
        <Typography variant="h5" color="primary">
          {`Pharmacie`}{' '}
        </Typography>
        <br />
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            disabled
            id="standard-disabled"
            label="Nom Pharmacie"
            defaultValue={row.pharmacie.denomination}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Adresse"
            defaultValue={row.pharmacie.adresse}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="tél"
            defaultValue={row.pharmacie.tel}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Gsm"
            defaultValue={row.pharmacie.gsm}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Fax"
            defaultValue={row.pharmacie.fax}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Patente"
            defaultValue={row.pharmacie.patente}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Num"
            defaultValue={row.pharmacie.numRC}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="RC"
            defaultValue={row.pharmacie.denomination}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Rib"
            defaultValue={row.pharmacie.rib}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="intérlocuteur"
            defaultValue={row.pharmacie.interlocuteur}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="fonction"
            defaultValue={row.pharmacie.fonction}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="dateCreation"
            defaultValue={dateformatcreation}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Date Démarrage"
            defaultValue={dateformatdemarage}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Banque"
            defaultValue={row.pharmacie.banque}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Forme Juridique"
            defaultValue={row.pharmacie.formeJuridique}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Ville"
            defaultValue={row.pharmacie.ville}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="villeRC"
            defaultValue={row.pharmacie.villeRC}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Région"
            defaultValue={row.pharmacie.region}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
        </form>
      </React.Fragment>
    );
  }
}
UserListConsult.defaultProps = {};

UserListConsult.propTypes = {
  row: PropTypes.object.isRequired,
};

export default compose(withStyles(styles))(UserListConsult);
