import * as React from 'react';
import { shallow } from 'enzyme';
import { Text } from '@shared';

import {
  TypographySize,
  TypographyColor,
  TypographyAlignment,
} from '@lib/common-interfaces';

describe('Text', () => {
  it('renders correctly without props', () => {
    const text = shallow(<Text>test</Text>);

    expect(text).toMatchSnapshot();
    expect(text.find('span').contains('test')).toBe(true);
    expect(text.find('span').hasClass('text-l')).toBe(true);
  });

  it('renders correctly with props', () => {
    const text = shallow(
      <Text
        size={TypographySize.s}
        color={TypographyColor.Primary}
        align={TypographyAlignment.Center}
      >
        test
      </Text>
    );

    expect(text.find('span').contains('test')).toBe(true);
    expect(text.find('span').hasClass('text-s')).toBe(true);
    expect(text.find('span').hasClass('primary-text')).toBe(true);
    expect(text.find('span').hasClass('align-center')).toBe(true);
  });
});
