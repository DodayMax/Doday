import * as React from 'react';
import { shallow } from 'enzyme';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders correctly without props', () => {
    const value = '12';
    const badge = shallow(<Badge value={value} />);

    expect(badge).toMatchSnapshot();
    expect(badge.contains(value)).toBe(true);
  });
});
