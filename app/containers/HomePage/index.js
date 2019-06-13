import React from 'react';
import history from 'utils/history';
import UsersList from '../Users';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return <UsersList />;
  }
}
