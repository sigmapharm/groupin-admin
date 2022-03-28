import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import React, { useEffect, useState } from 'react';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';

const DateInput = ({ classes, label, onChange, value = null }) => {
  const [selectedDate, handleDateChange] = useState(value);

  useEffect(
    () => {
      onChange(new Date(selectedDate).toUTCString());
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
          format="MM/DD/yyyy"
          autoOk
          InputProps={{
            endAdornment: <CalendarToday />,
          }}
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
