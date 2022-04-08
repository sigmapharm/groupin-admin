import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import React, { useEffect, useState } from 'react';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';
import moment from 'moment';

const DateInput = ({ classes, label, onChange, value = null }) => {
  const [selectedDate, handleDateChange] = useState(value);

  useEffect(
    () => {
      onChange(
        moment(selectedDate, 'YYYY-MM-DD')
          .format()
          .split('T')[0],
      );
    },
    [selectedDate],
  );

  return (
    <div className={classes.dateInputContainer}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          clearable
          className={classes.input}
          label={label}
          placeholder="Select Date"
          value={selectedDate}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          autoOk
          InputProps={{
            endAdornment: <CalendarToday />,
          }}
          cl
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
};

export default withStyles(style)(DateInput);
