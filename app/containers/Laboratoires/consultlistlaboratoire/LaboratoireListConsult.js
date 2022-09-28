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

export class LaboratoireListConsult extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { row, classes } = this.props;
    return (
      <React.Fragment>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            disabled
            id="standard-disabled"
            label="nom"
            value={row.nom}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="email "
            value={row.email}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />
          <TextField
            disabled
            id="standard-disabled"
            label="website"
            value={row.website}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />

          <TextField
            disabled
            id="standard-disabled"
            label="description"
            value={row.description}
            className={classes.textField}
            inputProps={{
              className: classes.input,
            }}
            margin="normal"
          />

          <TextField
            disabled
            id="standard-disabled"
            label="adresse"
            value={row.adresse}
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
LaboratoireListConsult.defaultProps = {};

LaboratoireListConsult.propTypes = {
  row: PropTypes.object.isRequired,
};

export default withStyles(styles)(LaboratoireListConsult);
