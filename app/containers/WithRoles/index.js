import React from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectUser } from '../App/selectors';
import strategies from './strategies';

export const isUserAllowed = (allowedRoles, user) => {
  if (!allowedRoles || !user || !user.role) {
    return false;
  }
  const b = allowedRoles.filter(role => role === user.role);
  return b.length > 0;
};

export class WithRoles extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isAllowed = false;
  }

  updateIsAllowed = props => {
    const { roles, user } = props;
    this.isAllowed = isUserAllowed(roles, user);
  };

  componentWillMount() {
    this.updateIsAllowed(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateIsAllowed(nextProps);
  }

  render() {
    const { strategy, children } = this.props;
    return (
      <>
        {!this.isAllowed &&
          strategies.DISABLE === strategy &&
          React.Children.map(children, child =>
            React.cloneElement(child, { disabled: true }),
          )}
        {!this.isAllowed && strategies.HIDE === strategy && null}
        {this.isAllowed && children}
      </>
    );
  }
}

WithRoles.defaultProps = {
  strategy: strategies.HIDE,
};

WithRoles.propTypes = {
  strategy: PropTypes.string,
  user: PropTypes.object.isRequired, // eslint-disable-line
  roles: PropTypes.array.isRequired, // eslint-disable-line
  children: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(WithRoles);
