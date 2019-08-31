import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '../../..';

describe('Flag', () => {
  it('renders correctly without props', () => {
    const flag = shallow(<Icons.Flag />);

    expect(flag).toMatchSnapshot();
  });
});
