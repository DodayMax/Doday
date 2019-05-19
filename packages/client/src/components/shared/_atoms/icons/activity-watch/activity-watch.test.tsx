import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@shared';

describe('ActivityWatchType', () => {
  it('renders correctly without props', () => {
    const icon = shallow(<Icons.ActivityWatchType />);

    expect(icon).toMatchSnapshot();
  });
});
