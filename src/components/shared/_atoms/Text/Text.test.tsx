import * as React from 'react';
import { shallow } from 'enzyme';
import { Text } from '@components';

describe('Text', () => {
  it('renders correctly without props', () => {
    const text = shallow(<Text text='test' />);

    expect(text).toMatchSnapshot();
    expect(text.find('span').contains('test')).toBe(true);
  });
});
