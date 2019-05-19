import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@shared';

describe('CloseCircle', () => {
  it('renders correctly without props', () => {
    const icon = shallow(<Icons.CloseCircle />);

    expect(icon).toMatchSnapshot();
  });
});
