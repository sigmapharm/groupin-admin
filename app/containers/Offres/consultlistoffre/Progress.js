import React from 'react';
import * as PropTypes from 'prop-types';
import { Progress } from 'react-sweet-progress';

export class Progressbar extends React.PureComponent {
  render() {
    const { progress } = this.props;
    return (
      <Progress
        percent={progress}
        theme={{
          error: {
            symbol: ' ',
            trailColor: 'pink',
            color: 'red',
          },
          default: {
            symbol: ' ',
            trailColor: '#F2F3F4',
            color: 'blue',
          },
          active: {
            symbol: ' ',
            trailColor: '#D0D3D4',
            color: '#42B391',
          },
          success: {
            symbol: ' ',
            trailColor: '#F2F3F4',
            color: 'green',
          },
        }}
      />
    );
  }
}

Progressbar.propTypes = {
  progress: PropTypes.object.isRequired,
};

export default Progressbar;
