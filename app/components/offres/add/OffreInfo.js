import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { DateFormatInput } from 'material-ui-next-pickers';
import moment from 'moment';
import { fields } from '../../../containers/Offres/add/validation';
import DateInput from '../../../components/DateInput';

const styles = () => ({
  offreInputs: {},
  dateInputs: {
    '& > div > div > div ': { height: 30 },
  },
  specialProps: {
    InputLabelProps: {
      shrink: true,
    },
    style: {
      width: '100%',
    },
    label: 'Date Fin',
  },
});
export function OffreInfo(props) {
  const {
    formData,
    errors,
    classes,
    onChange,
    maxLength,
    dateD,
    dateF,
    children,
    disableAllWithoutDate,
    disableAll,
    editMode,
    isOffreNotStart,
  } = props;
  const disable = disableAllWithoutDate || disableAll;
  const [dateFin, setDateFin] = useState(formData);
  const [dateDebut, setDateDebut] = useState(formData);

  useEffect(
    () => {
      setDateDebut(formData[fields.dateDebut.name]);
      console.log('Use effect 1' + dateD);
      setDateFin(formData[fields.dateFin.name]);
      console.log('Use effect 2' + dateF);
    },
    [formData],
  );

  return (
    <>
      <>
        <Grid xs={12} md={6} item>
          <TextField
            required
            name={fields.designation.name}
            label={fields.designation.label}
            value={formData[fields.designation.name]}
            error={!!errors[fields.designation.name]}
            onChange={onChange}
            noValidate
            autoComplete="off"
            className={classes.offreInputs}
            // inputProps={{
            //   maxLength,
            // }}
            fullWidth
          />
        </Grid>

        <Grid container xs={12} md={6} item spacing={0.5}>
          <DateInput
            name={fields.dateDebut.name}
            // fields.dateDebut.label
            label={editMode ? dateD : fields.dateDebut.label}
            // disabled={editMode}
            min={moment()
              .add(0, 'day')
              .toDate()}
            value={!!dateD ? new Date(dateD).toDateString : null}
            onChange={date => {
              onChange({
                target: { name: fields.dateDebut.name, value: date },
              });
            }}
            type={fields.dateDebut.type}
            className={[classes.dateInputs, classes.offreInputs]}
            fullWidth
            disableContainerStyle
          />
        </Grid>

        {/* <div style={{color: "red"}}>{dateD}</div> */}

        <Grid xs={12} md={6} item>
          <DateInput
            name={fields.dateFin.name}
            // fields.dateDebut.label
            label={editMode ? dateF : fields.dateFin.label}
            // disabled={disableAll}
            // check to verify that start date < end date
            // min={moment()
            //   .add(2, 'day')
            min={moment()
              .add(0, 'day')
              .toDate()}
            value={!!dateF ? new Date(dateF).toDateString : null}
            onChange={date => {
              onChange({
                target: { name: fields.dateFin.name, value: date },
              });
            }}
            type={fields.dateFin.type}
            className={[classes.dateInputs, classes.offreInputs]}
            fullWidth
            disableContainerStyle
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            name={fields.montant.name}
            label={fields.montant.label}
            value={formData[fields.montant.name]}
            error={!!errors[fields.montant.name]}
            onChange={onChange}
            disabled={disable}
            noValidate
            autoComplete="off"
            type={fields.montant.type}
            className={classes.offreInputs}
            inputProps={{
              maxLength,
            }}
            fullWidth
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            noValidate
            autoComplete="off"
            name={fields.montantMax.name}
            label={fields.montantMax.label}
            type={fields.montantMax.type}
            value={formData[fields.montantMax.name]}
            onChange={onChange}
            disabled={disable}
            className={classes.offreInputs}
            inputProps={{
              maxLength,
            }}
            fullWidth
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            noValidate
            autoComplete="off"
            name={fields.comment.name}
            label={fields.comment.label}
            value={formData[fields.comment.name]}
            onChange={onChange}
            className={classes.offreInputs}
            disabled={disable}
            inputProps={{
              maxLength,
            }}
            fullWidth
            multiline
            rows={1}
            rowsMax={2}
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            disabled={isOffreNotStart ? false : editMode}
            noValidate
            autoComplete="off"
            name={fields.globalDiscount.name}
            label={fields.globalDiscount.label}
            value={formData[fields.globalDiscount.name] || 0}
            type={fields.globalDiscount.type}
            error={!!errors[fields.globalDiscount.name]}
            onChange={onChange}
            className={classes.offreInputs}
            inputProps={{
              maxLength,
            }}
            fullWidth
            multiline
            rows={1}
            rowsMax={2}
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            noValidate
            autoComplete="off"
            name={fields.minToOrder.name}
            label={fields.minToOrder.label}
            value={formData[fields.minToOrder.name] || ''}
            type={fields.minToOrder.type}
            error={!!errors[fields.minToOrder.name]}
            onChange={onChange}
            className={classes.offreInputs}
            inputProps={{
              maxLength,
            }}
            fullWidth
            multiline
            rows={1}
            rowsMax={2}
          />
        </Grid>
        {children}
      </>
    </>
  );
}
OffreInfo.defaultProps = {};

OffreInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
};

export default withStyles(styles)(OffreInfo);
