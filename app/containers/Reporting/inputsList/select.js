import { withStyles } from '@material-ui/core';
import React from 'react';
import SingleAutoCompleteSelect from '../../../components/AutoCompleteSelect';

const SelectInput = ({ classes, options, onChange, value, placeholder }) => {
  return (
    <div className={classes.inputContainer}>
      <SingleAutoCompleteSelect
        className={classes.input}
        options={options}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

const style = {
  inputContainer: {
    width: 250,

    marginLeft: 30,
    marginTop: 11,
  },
};

export default withStyles(style)(SelectInput);
