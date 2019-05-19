import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@shared';

describe('Arrow', () => {
  it('renders correctly without props', () => {
    const icon = shallow(<Icons.Arrow />);

    expect(icon).toMatchSnapshot();
  });

  it('renders correctly with right prop', () => {
    const icon = shallow(<Icons.Arrow right />);

    expect(icon).toMatchSnapshot();
  });
});
