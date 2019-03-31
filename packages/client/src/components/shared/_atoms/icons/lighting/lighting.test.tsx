import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@components';

describe('Lighting', () => {
  it('renders correctly without props', () => {
    const lighting = shallow(<Icons.Lighting />);

    expect(lighting).toMatchSnapshot();
  });
});