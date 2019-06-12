import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

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
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    color:'#fff000',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  input: {
    color: "black",
  },
  dense: {
    marginTop: 19,
  },
  MuiInputBaseInput5355:{
color:'red'
    
  },
  menu: {
    width: 200,
  },
});

export class ArticleListConsultationn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { row , classes } = this.props;
    return (
      <React.Fragment>
        <form className={classes.container} noValidate autoComplete="off">
                      <TextField 
          disabled
          id="standard-disabled"
          label="Référence"
          defaultValue={row.reference}
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
            <TextField
          disabled
          id="standard-disabled"
          label="Désignation"
          defaultValue={row.designation}
                    className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
            <TextField
          disabled
          id="standard-disabled"
          label="Catégorie "
          defaultValue={row.categorie}
                    className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Gamme"
          defaultValue={row.gamme}
                    className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
         <TextField
          disabled
          id="standard-disabled"
          label="Forme galénique          "
          defaultValue={row.forme_galenique }
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
         <TextField
          disabled
          id="standard-disabled"
          label="DCI"
          defaultValue={row.dci}
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
         <TextField
          disabled
          id="standard-disabled"
          label="Classe thérapeutique"
          defaultValue={row.classe_therapeutique}
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
         <TextField
          disabled
          id="standard-disabled"
          label="PPH"
          defaultValue={row.pph}
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
         <TextField
          disabled
          id="standard-disabled"
          label="PPV"
          defaultValue={row.ppv}
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
         <TextField
          disabled
          id="standard-disabled"
          label="TVA"
          defaultValue={row.tva}
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
             <TextField
          disabled
          id="standard-disabled"
          label="neccissite_prescription"
          defaultValue={row.neccissite_prescription}
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
             <TextField
          disabled
          id="standard-disabled"
          label="produit_Marche"
          defaultValue={row.produit_Marche}
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="codebare"
          defaultValue={row.codebare}
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
      </form><br/>
         <Typography variant="h5" color="primary">
                              {`Laboratoire`} </Typography><br/>
                              <form  className={classes.container} noValidate autoComplete="off">
         <TextField
          disabled
          id="standard-disabled"
          label="Laboratoire"
          defaultValue={row.laboratoire.nom}
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
         <TextField
          disabled
          id="standard-disabled"
          label="Adresse"
          defaultValue={row.laboratoire.adresse}
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
         <TextField
          disabled
          id="standard-disabled"
          label="Website"
          defaultValue={row.laboratoire.website}
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
         <TextField
          disabled
          id="standard-disabled"
          label="Email"
          defaultValue={row.laboratoire.email}
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
         <TextField
          disabled
          id="standard-disabled"
          label="Déscription"
          defaultValue={row.laboratoire.description}
          className={classes.textField}
          inputProps={{
            className: classes.input
          }}
          margin="normal"
        />
       </form>
      </React.Fragment>
    );
  }
}

ArticleListConsultationn.defaultProps = {};
ArticleListConsultationn.propTypes = {
  row: PropTypes.object.isRequired,
};
export default withStyles(styles)(ArticleListConsultationn);
