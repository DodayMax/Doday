import * as React from 'react';
import { shallow } from 'enzyme';
import { Text } from '@components';

describe('Text', () => {
  it('renders correctly without props', () => {
    const text = shallow(<Text />);

    expect(text).toMatchSnapshot();
  });

  it('renders correctly with text prop', () => {
    const text = shallow(<Text text={'qwe'} />);

    expect(text.find('span').contains('qwe')).toBe(true);
  });
});
