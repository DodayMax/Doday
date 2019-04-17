import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@components';

describe('Silver', () => {
  it('renders correctly without props', () => {
    const silver = shallow(<Icons.Silver />);

    expect(silver).toMatchSnapshot();
  });
});
