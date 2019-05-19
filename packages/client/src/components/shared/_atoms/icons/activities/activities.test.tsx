import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@shared';

describe('Activities', () => {
  it('renders correctly without props', () => {
    const icon = shallow(<Icons.Activities />);

    expect(icon).toMatchSnapshot();
  });
});
