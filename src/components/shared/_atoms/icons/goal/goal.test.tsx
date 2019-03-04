import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@components';

describe('Goal', () => {
  it('renders correctly without props', () => {
    const icon = shallow(<Icons.Goal />);

    expect(icon).toMatchSnapshot();
  });
});