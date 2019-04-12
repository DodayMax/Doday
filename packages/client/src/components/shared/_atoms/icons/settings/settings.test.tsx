import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@components';

describe('Settings', () => {
  it('renders correctly without props', () => {
    const settings = shallow(<Icons.Settings />);

    expect(settings).toMatchSnapshot();
  });
});
