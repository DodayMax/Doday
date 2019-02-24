import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@components';

describe('DoubleChevronIcon', () => {
  it('renders correctly without props', () => {
    const icon = shallow(<Icons.DoubleChevronIcon />);

    expect(icon).toMatchSnapshot();
  });
});
