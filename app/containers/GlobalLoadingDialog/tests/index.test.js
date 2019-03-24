import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import { GlobalLoadingDialog } from '../index';

describe('<GlobalLoadingDialog />', () => {
  it('should match snapshot', () => {
    // given
    const props = {
      open: true,
      classes: {},
    };
    const shallowed = shallow(<GlobalLoadingDialog {...props} />);
    // then
    expect(shallowed.find(Dialog).length).toEqual(1);
    expect(shallowed.find(CircularProgress).length).toEqual(1);
    expect(toJson(shallowed)).toMatchSnapshot();
  });
});
