import React from 'react';
import Switch from '@material-ui/core/Switch';

class Toggle extends React.Component {
  state = {
    checked: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <Switch
          checked={this.state.checked}
          onChange={this.handleChange('checked')}
          value="checkedA"
          color="primary"
      />
    );
  }
}

export default Toggle;
