import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@components';

describe('InlineLoaderIcon', () => {
  it('renders correctly without props', () => {
    const icon = shallow(<Icons.InlineLoader />);

    expect(icon).toMatchSnapshot();
  });
});