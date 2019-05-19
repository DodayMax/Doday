import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@shared';

describe('Idea', () => {
  it('renders correctly without props', () => {
    const icon = shallow(<Icons.Idea />);

    expect(icon).toMatchSnapshot();
  });
});
