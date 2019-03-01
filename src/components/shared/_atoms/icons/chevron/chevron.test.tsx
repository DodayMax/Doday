import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@components';

describe('Chevron', () => {
  it('renders correctly without props', () => {
    const chevron = shallow(<Icons.Chevron />);

    expect(chevron).toMatchSnapshot();
  });

  it('renders correctly with right prop', () => {
    const chevron = shallow(<Icons.Chevron right />);

    expect(chevron).toMatchSnapshot();
  });
});