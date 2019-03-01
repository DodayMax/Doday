import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@components';

describe('CheckboxInBox', () => {
  it('renders correctly without props', () => {
    const checkboxInBox = shallow(<Icons.CheckboxInBox />);

    expect(checkboxInBox).toMatchSnapshot();
  });
});