import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@shared';

describe('ActivityReadType', () => {
  it('renders correctly without props', () => {
    const icon = shallow(<Icons.ActivityReadType />);

    expect(icon).toMatchSnapshot();
  });
});
