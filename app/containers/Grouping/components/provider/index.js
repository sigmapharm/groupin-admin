import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import SingleAutoCompleteSelect from '../../../../components/AutoCompleteSelect';
const styles = theme => ({});

// TODO  : will change it to be dynamique ;)

export default withStyles(styles)(({ value, onChange }) => (
  <div style={{ width: '60%', margin: '27px auto' }}>
    <SingleAutoCompleteSelect
      name="provider"
      value={value}
      options={[{ label: 'Mohamed', value: 62 }]}
      onChange={onChange}
      placeholder="Fourniseur"
      isClearable
    />
  </div>
));
