import * as React from 'react';
import { shallow } from 'enzyme';
import { Input } from '@components';

describe('Input', () => {
  it('renders correctly without props', () => {
    const input = shallow(<Input />);

    expect(input).toMatchSnapshot();
  });
});