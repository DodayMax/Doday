import * as React from 'react';
import { shallow } from 'enzyme';
import { Icons } from '@shared';

describe('Dodayman', () => {
  it('renders correctly without props', () => {
    const dodayman = shallow(<Icons.Dodayman />);

    expect(dodayman).toMatchSnapshot();
  });
});
