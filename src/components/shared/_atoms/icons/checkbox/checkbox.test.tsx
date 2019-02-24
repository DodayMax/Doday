import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Icons } from '@components';

describe('Checkbox', () => {
  it('renders correctly without props', () => {
    const checkbox = shallow(<Icons.Checkbox />);

    expect(checkbox).toMatchSnapshot();
  });

  it('renders correctly checked', () => {
    const checkbox = shallow(<Icons.Checkbox checked />);

    expect(checkbox).toMatchSnapshot();
  });
});
