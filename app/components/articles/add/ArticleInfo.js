import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { fields } from '../../../containers/Articles/add/validation';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';


const styles = () => ({
  articleInputs: {},
});

export function ArticleInfo(props) {
  const { formData, errors, classes, onChange, maxLength } = props;
  return (
    <>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.reference.name}
          label={fields.reference.label}
          value={formData[fields.reference.name]}
          error={!!errors[fields.reference.name]}
          onChange={onChange}
          className={classes.articleInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.nom.name}
          label={fields.nom.label}
          value={formData[fields.nom.name]}
          error={!!errors[fields.nom.name]}
          onChange={onChange}
         className={classes.articleInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
   <Grid xs={12} md={6} item>
        <TextField
          name={fields.gamme.name}
          label={fields.gamme.label}
          value={formData[fields.gamme.name]}
          error={!!errors[fields.gamme.name]}
          onChange={onChange}
          className={classes.articleInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>

      <Grid xs={12} md={6} item>
        <TextField
          name={fields.codebare.name}
          label={fields.codebare.label}
          value={formData[fields.codebare.name]}
          error={!!errors[fields.codebare.name]}
          onChange={onChange}
         className={classes.articleInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.categorie.name}
          label={fields.categorie.label}
          value={formData[fields.categorie.name]}
          error={!!errors[fields.categorie.name]}
          onChange={onChange}
         className={classes.articleInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.classe_therapeutique.name}
          label={fields.classe_therapeutique.label}
          value={formData[fields.classe_therapeutique.name]}
          error={!!errors[fields.classe_therapeutique.name]}
          onChange={onChange}
      className={classes.articleInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.forme_galenique.name}
          label={fields.forme_galenique.label}
          value={formData[fields.forme_galenique.name]}
          error={!!errors[fields.forme_galenique.name]}
          onChange={onChange}
        className={classes.articleInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.dci.name}
          label={fields.dci.label}
          value={formData[fields.dci.name]}
          error={!!errors[fields.dci.name]}
          onChange={onChange}
      className={classes.articleInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>

      <Grid xs={12} md={6} item>
        <TextField
          name={fields.pph.name}
          label={fields.pph.label}
          value={formData[fields.pph.name]}
          error={!!errors[fields.pph.name]}
          onChange={onChange}
        className={classes.articleInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.tva.name}
          label={fields.tva.label}
          value={formData[fields.tva.name]}
          error={!!errors[fields.tva.name]}
          onChange={onChange}
     className={classes.articleInputs}
          inputProps={{
            maxLength,
          }}
          fullWidth
        />
      {/*  <Grid xs={6} md={3} item>
        <Grid item>
          <FormControlLabel  name={fields.neccissite_prescription.name} control={<Radio />} label={fields.neccissite_prescription.label} Onchange={onChange} />
         </Grid>
        <Grid  item>
          <FormControlLabel  control={<Radio />} name={fields.produit_Marche.name} label={fields.produit_Marche.label} />

        </Grid>

        </Grid>*/}
      </Grid>
    </>
  );
}
ArticleInfo.defaultProps = {};

ArticleInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,

};

export default withStyles(styles)(ArticleInfo);
