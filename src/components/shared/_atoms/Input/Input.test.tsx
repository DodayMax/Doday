import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Input } from '@components';

it('renders correctly without props', () => {
  const input = shallow(<Input />);

  expect(input).toMatchSnapshot();
});