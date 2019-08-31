import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '../../..';

describe('InlineLoaderIcon', () => {
  it('renders correctly without props', () => {
    const icon = shallow(<Icons.InlineLoader color={''} />);

    expect(icon).toMatchSnapshot();
  });
});
