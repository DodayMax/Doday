import * as React from 'react';
import { shallow } from 'enzyme';
import { Text } from '@components';

import { TypographySize, TypographyColor, TypographyAlignment } from '@lib/common-interfaces';

describe('Text', () => {
  it('renders correctly without props', () => {
    const text = shallow(<Text text='test' />);

    expect(text).toMatchSnapshot();
    expect(text.find('div').contains('test')).toBe(true);
    expect(text.find('div').hasClass('text-l') ).toBe(true);
  });

  it('renders correctly with props', () => {
    const text = shallow(<Text text='test' size={TypographySize.s} color={TypographyColor.Primary} align={TypographyAlignment.Center} />);

    expect(text.find('div').contains('test')).toBe(true);
    expect(text.find('div').hasClass('text-s')).toBe(true);
    expect(text.find('div').hasClass('primary-text')).toBe(true);
    expect(text.find('div').hasClass('align-center')).toBe(true);
  });
});
