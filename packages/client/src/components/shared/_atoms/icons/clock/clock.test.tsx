import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@components';

describe('Clock', () => {
  it('renders correctly without props', () => {
    const clock = shallow(<Icons.Clock />);

    expect(clock).toMatchSnapshot();
  });
});
