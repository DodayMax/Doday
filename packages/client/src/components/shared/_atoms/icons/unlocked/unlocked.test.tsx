import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@components';

describe('Locked', () => {
  it('renders correctly without props', () => {
    const locked = shallow(<Icons.Locked />);

    expect(locked).toMatchSnapshot();
  });
});
