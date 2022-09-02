import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import React, { useEffect, useState } from 'react';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';
import moment from 'moment';

const DateInput = props => {
  const {
    classes,
    label,
    onChange,
    value = null,
    min,
    fullWidth,
    btnStyle,
    disabled,
    className,
    disableContainerStyle,
    format,
    max,
  } = props;

  const [selectedDate, handleDateChange] = useState(value);

  useEffect(
    () => {
      onChange(
        moment(selectedDate, format ? format : 'YYYY-MM-DD')
          .format()
          .split('T')[0],
      );
    },
    [selectedDate],
  );

  return (
    <div className={disableContainerStyle ? classes.fullWitdh : classes.dateInputContainer}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          clearable
          className={[classes.input, className]}
          label={label}
          placeholder="Select Date"
          value={selectedDate}
          onChange={handleDateChange}
          format={format ? format : 'YYYY-MM-DD'}
          autoOk
          InputProps={{
            endAdornment: <CalendarToday />,
            style: btnStyle,
          }}
          minDate={min}
          maxDate={max}
          fullWidth={fullWidth}
          disabled={disabled}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

const style = {
  dateInputContainer: {
    width: 250,
    marginLeft: 30,
  },
  input: {
    width: '100%',
  },
  fullWitdh: {
    width: '100%',
  },
};

export default withStyles(style)(DateInput);
