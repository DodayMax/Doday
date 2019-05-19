import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@shared';

describe('ActivityDoType', () => {
  it('renders correctly without props', () => {
    const icon = shallow(<Icons.ActivityDoType />);

    expect(icon).toMatchSnapshot();
  });
});
