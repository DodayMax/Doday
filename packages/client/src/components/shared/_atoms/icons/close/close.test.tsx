import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@components';

describe('Close', () => {
  it('renders correctly without props', () => {
    const icon = shallow(<Icons.Close />);

    expect(icon).toMatchSnapshot();
  });
});