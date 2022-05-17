import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab/Fab';
import AddIcon from '@material-ui/icons/Add';
import SingleAutoCompleteSelect from '../../../../components/AutoCompleteSelect';
const styles = theme => ({
  btnsContainer: {
    display: 'flex',
    width: '60%',
    margin: '27px auto',
  },
  addBtn: {
    marginLeft: '15px',
  },
});

// TODO  : will change it to be dynamique ;)

export default withStyles(styles)(({ classes, value, onChange, onAdd, providers = [] }) => (
  <div className={classes.btnsContainer}>
    <SingleAutoCompleteSelect
      name="provider"
      value={value}
      options={providers.map(e => e && { label: e.fullName, value: e.id })}
      onChange={onChange}
      placeholder="Grossiste"
      isClearable
    />
    <Fab className={classes.addBtn} size="small" color="primary" onClick={onAdd}>
      <AddIcon />
    </Fab>
  </div>
));
