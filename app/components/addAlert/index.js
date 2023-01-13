import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import validators from '../../core/validation';
import { Input } from '@material-ui/core';
import SingleAutoCompleteSelect from '../../components/AutoCompleteSelect';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';

export const fields = {
  link: {
    name: 'link',
    label: 'Link',
    validator: validators.stringNotBlank,
  },
  is_active: {
    name: 'is_active',
    label: 'status',
  },
  message: {
    name: 'message',
    label: 'message',
    validator: validators.stringNotBlank,
  },
  date_start: {
    name: 'date_start',
    label: 'date start',
    validator: validators.stringNotBlank,
  },
  date_end: {
    name: 'date_end',
    label: 'date end',
    validator: validators.stringNotBlank,
  },
  alert_type: {
    name: 'alert_type',
    label: 'alert type',
    validator: validators.stringNotBlank,
  },
};
const styles = () => ({
  laboInputs: {},
});

export function AddALert(props) {
  const { formData, errors, classes, onChange, maxLength } = props;
  const [alertType, setAlertType] = useState();
  const [status, setStatus] = useState();

  // useEffect(
  //   () => {
  //     setAlertType({ label: formData.alert_type.toLowerCase(), value: formData.alert_type });
  //   },
  //   [formData],
  //   () => {
  //     setStatus({ label: formData.is_active ? 'active' : 'false', value: formData.is_active });
  //   },
  //   [formData],
  // );

  return (
    <>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.message.name}
          label={fields.message.label}
          value={formData[fields.message.name]}
          error={!!errors[fields.message.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.laboInputs}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <Input
          name={fields.date_start.name}
          label={fields.date_start.label}
          value={moment(formData[fields.date_start.name]).format('YYYY-MM-DD') || ''}
          error={!!errors[fields.date_start.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.laboInputs}
          fullWidth
          type="date"
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <Input
          name={fields.date_end.name}
          label={fields.date_end.label}
          value={moment(formData[fields.date_end.name]).format('YYYY-MM-DD') || ''}
          error={!!errors[fields.date_end.name]}
          onChange={onChange}
          autoComplete="off"
          className={classes.laboInputs}
          fullWidth
          type="date"
        />
      </Grid>

      <Grid xs={12} md={6} item>
        <SingleAutoCompleteSelect
          name={fields.alert_type.name}
          label={fields.alert_type.label}
          value={{ value: formData.alert_type, label: String(formData.alert_type).toLowerCase() }}
          error={!!errors[fields.alert_type.name]}
          onChange={value => {
            onChange(value, fields.alert_type.name);
            setAlertType(value);
          }}
          autoComplete="off"
          className={classes.laboInputs}
          fullWidth
          options={[
            { label: 'warnning', value: 'WARNNING' },
            { label: 'info', value: 'INFO' },
            { label: 'danger', value: 'DANGER' },
          ]}
        />
      </Grid>

      <Grid xs={12} md={6} item>
        <TextField
          name={fields.link.name}
          label={fields.link.label}
          value={formData[fields.link.name] || ''}
          error={!!errors[fields.link.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.laboInputs}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <SingleAutoCompleteSelect
          name={fields.is_active.name}
          label={fields.is_active.label}
          value={status}
          value={{ value: formData.is_active, label: formData.is_active ? 'active' : 'inactive' }}
          error={!!errors[fields.is_active.name]}
          onChange={value => {
            onChange(value, fields.is_active.name);
            setStatus(value);
          }}
          autoComplete="off"
          className={classes.laboInputs}
          fullWidth
          options={[{ label: 'active', value: true }, { label: 'inactive', value: false }]}
        />
      </Grid>
    </>
  );
}
AddALert.defaultProps = {};

AddALert.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
};
export default withStyles(styles)(AddALert);
