import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@shared';

describe('Apps', () => {
  it('renders correctly without props', () => {
    const apps = shallow(<Icons.Apps />);

    expect(apps).toMatchSnapshot();
  });
});
