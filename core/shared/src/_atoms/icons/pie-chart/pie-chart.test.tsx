import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '../../..';

describe('PieChart', () => {
  it('renders correctly without props', () => {
    const chevron = shallow(<Icons.PieChart />);

    expect(chevron).toMatchSnapshot();
  });

  it('renders correctly with active prop', () => {
    const chevron = shallow(<Icons.PieChart active />);

    expect(chevron).toMatchSnapshot();
  });
});
