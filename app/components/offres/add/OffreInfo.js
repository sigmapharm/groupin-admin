import React from 'react';
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
  const { formData, errors, classes, onChange, maxLength, children, disableAllWithoutDate, disableAll } = props;

  const disable = disableAllWithoutDate || disableAll;

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
            disabled={disable}
            autoComplete="off"
            className={classes.offreInputs}
            // inputProps={{
            //   maxLength,
            // }}
            fullWidth
          />
        </Grid>
        <Grid container xs={12} md={6} item>
          <DateInput
            name={fields.dateDebut.name}
            // fields.dateDebut.label
            label={fields.dateDebut.label}
            disabled={disable}
            dateFormat={date => moment(date).format('DD/MM/YYYY')}
            min={moment()
              .add(0, 'day')
              .toDate()}
            value={!!formData[fields.dateDebut.name] ? new Date(formData[fields.dateDebut.name]) : null}
            onChange={date => {
              console.log(date);
              onChange({
                target: { name: fields.dateDebut.name, value: date },
              });
            }}
            type={fields.dateDebut.type}
            className={[classes.dateInputs, classes.offreInputs]}
            fullWidth
            disableContainerStyle
            format="DD/MM/YYYY"
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <DateInput
            name={fields.dateFin.name}
            // fields.dateDebut.label
            label={fields.dateFin.label}
            // disabled={disableAll}
            dateFormat={date => moment(date).format('DD/MM/YYYY')}
            min={moment()
              .add(2, 'day')
              .toDate()}
            value={!!formData[fields.dateFin.name] ? new Date(formData[fields.dateFin.name]) : null}
            onChange={date => {
              console.log(date);
              onChange({
                target: { name: fields.dateFin.name, value: date },
              });
            }}
            type={fields.dateFin.type}
            className={[classes.dateInputs, classes.offreInputs]}
            fullWidth
            disableContainerStyle
            format="DD/MM/YYYY"
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
            name={fields.offerComment.name}
            label={fields.offerComment.label}
            value={formData[fields.offerComment.name]}
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
            noValidate
            autoComplete="off"
            name={fields.globalDiscount.name}
            label={fields.globalDiscount.label}
            value={formData[fields.globalDiscount.name] || ''}
            type={fields.globalDiscount.type}
            error={!!errors[fields.globalDiscount.name]}
            onChange={onChange}
            // disabled={disable}
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
            // disabled={disable}
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
