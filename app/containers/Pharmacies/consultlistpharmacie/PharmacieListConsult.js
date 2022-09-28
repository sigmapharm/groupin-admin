import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import _ from 'lodash';

const head = { backgroundColor: 'lightgreen' };
const addCommas = nStr => {
  nStr += '';
  const x = nStr.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};

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

export class PharmacieListConsult extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { row, classes } = this.props;
    const dateCreation = row.dateCreation && new Date(row.dateCreation);
    const dateformatdemaragee = row.dateDemarrage && new Date(row.dateDemarrage);

    const dateformatcreation = new Intl.DateTimeFormat('fr-FR').format(dateCreation);
    const dateformatdemarage = new Intl.DateTimeFormat('fr-FR').format(dateformatdemaragee);
    return (
      <React.Fragment>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            disabled
            id="standard-disabled"
            label="denomination"
            value={row.denomination}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="adresse "
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
            label="banque"
            value={row.banque}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />

          <TextField
            disabled
            id="standard-disabled"
            label="ice"
            value={row.ice}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />

          <TextField
            disabled
            id="standard-disabled"
            label="formeJuridique"
            value={row.formeJuridique}
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
            value={row.dateCreation}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="dateDemarrage"
            value={row.dateDemarrage}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="rib"
            value={row.rib}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="tel"
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
            label="gsm"
            value={row.gsm}
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
            value={row.villeRC}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          /> */}
          <TextField
            disabled
            id="standard-disabled"
            label="region"
            value={row.region.name}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="ville"
            value={row.ville.name}
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
PharmacieListConsult.defaultProps = {};

PharmacieListConsult.propTypes = {
  row: PropTypes.object.isRequired,
};

export default withStyles(styles)(PharmacieListConsult);
