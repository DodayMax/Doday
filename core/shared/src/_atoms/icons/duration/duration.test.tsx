import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '../../..';

describe('Duration', () => {
  it('renders correctly without props', () => {
    const duration = shallow(<Icons.Duration />);

    expect(duration).toMatchSnapshot();
  });
});
