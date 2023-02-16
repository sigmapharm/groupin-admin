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
  content: {
    name: 'content',
    label: 'Content',
  },
  start_from: {
    name: 'startFrom',
    label: 'Date début ',
    validator: validators.stringNotBlank,
  },
  end_at: {
    name: 'endAt',
    label: 'date fin',
    validator: validators.stringNotBlank,
  },
  image: {
    name: 'image',
    label: 'Image',
    validator: validators.stringNotBlank,
  },
};

const styles = () => ({
  laboInputs: {},
});

export function AddAdsData(props) {
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

  console.log(formData[fields.start_from.name]);

  return (
    <>
      <Grid xs={12} md={6} item>
        <TextField
          name={fields.content.name}
          label={fields.content.label}
          value={formData[fields.content.name]}
          error={!!errors[fields.content.name]}
          onChange={onChange}
          noValidate
          autoComplete="off"
          className={classes.laboInputs}
          fullWidth
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <Input
          name={fields.start_from.name}
          label={fields.start_from.label}
          value={moment(formData[fields.start_from.name]).format('YYYY-MM-DD') || ''}
          error={!!errors[fields.start_from.name]}
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
          name={fields.end_at.name}
          label={fields.end_at.label}
          value={moment(formData[fields.end_at.name]).format('YYYY-MM-DD') || ''}
          error={!!errors[fields.end_at.name]}
          onChange={onChange}
          autoComplete="off"
          className={classes.laboInputs}
          fullWidth
          type="date"
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
        <TextField
          name={fields.image.name}
          label={fields.image.label}
          //   value={formData[fields.image.name] || ''}
          error={!!errors[fields.image.name]}
          onChange={e => {
            onChange(e, null, true);
          }}
          noValidate
          autoComplete="off"
          className={classes.laboInputs}
          fullWidth
          type="file"
        />
      </Grid>
    </>
  );
}
AddAdsData.defaultProps = {};

AddAdsData.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
};
export default withStyles(styles)(AddAdsData);
