import React from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    color: '#fff000',
    margin: '10px 20px',
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
});

export class UserListConsult extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { row, classes } = this.props;
    const dateCreation = row.pharmacie.dateCreation && new Date(row.pharmacie.dateCreation);
    const dateCreationarticlee = row.dateCreation && new Date(row.dateCreation);
    const dateformatdemaragee = row.pharmacie.dateDemarrage && new Date(row.pharmacie.dateDemarrage);
    const dateformatcreationarticle = dateCreationarticlee && new Intl.DateTimeFormat('fr-FR').format(dateCreationarticlee);

    const dateformatcreation = new Intl.DateTimeFormat('fr-FR').format(dateCreation);
    const dateformatdemarage = new Intl.DateTimeFormat('fr-FR').format(dateformatdemaragee);

    return (
      <React.Fragment>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            disabled
            id="standard-disabled"
            label="Prénom"
            value={row.firstName}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          {/*<TextField
            disabled
            id="standard-disabled"
            label="Région"
            value={row.region}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />*/}
          <TextField
            disabled
            id="standard-disabled"
            label="Nom "
            value={row.lastName}
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
            value={row.adresse}
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
            value={row.codePostal}
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
            value={_.get(row, 'ville.name', '')}
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
            value={row.cin}
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
            value={row.tel}
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
            value={row.gsm}
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
            value={dateformatcreationarticle}
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
            value={row.role}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Status"
            value={row.enabled ? 'active' : 'inactive'}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="email"
            value={row.email}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
            fullWidth
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
            value={row.pharmacie.denomination}
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
            style={{ width: '300px' }}
            value={row.pharmacie.adresse}
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
            value={row.pharmacie.tel}
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
            value={row.pharmacie.gsm}
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
            value={row.pharmacie.fax}
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
            value={row.pharmacie.patente}
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
            value={row.pharmacie.numRC}
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
            value={row.pharmacie.denomination}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          {/* <TextField
            disabled
            id="standard-disabled"
            label="Rib"
            value={row.pharmacie.rib}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          /> */}
          <TextField
            disabled
            id="standard-disabled"
            label="intérlocuteur"
            value={row.pharmacie.interlocuteur}
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
            value={row.pharmacie.fonction}
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
            value={dateformatcreation}
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
            value={dateformatdemarage}
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
            value={row.pharmacie.banque}
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
            value={row.pharmacie.formeJuridique}
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
            value={row.pharmacie.ville && row.pharmacie.ville.name}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          {/* <TextField
            disabled
            id="standard-disabled"
            label="villeRC"
            value={row.pharmacie.villeRC && row.pharmacie.villeRC.name}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          /> */}
          <TextField
            disabled
            id="standard-disabled"
            label="Région"
            value={row.pharmacie.region && row.pharmacie.region.name}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="ICE"
            value={row.pharmacie.ice && row.pharmacie.ice}
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
