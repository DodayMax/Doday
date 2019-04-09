import * as React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { Text } from './text';
import {
  TypographyColor,
  TypographyAlignment,
  TypographySize,
} from '@lib/common-interfaces';

storiesOf('Text', module)
  .add('default', () => <Text>Sample text</Text>)
  .add('color', () => <Text color={TypographyColor.Success}>Sample text</Text>)
  .add('align', () => (
    <Text align={TypographyAlignment.Center}>Sample text</Text>
  ))
  .add('size', () => <Text size={TypographySize.s}>Sample text</Text>)
  .add('bold', () => <Text bold>Sample text</Text>)
  .add('italic', () => <Text italic>Sample text</Text>)
  .add('uppercase', () => <Text uppercase>Sample text</Text>)
  .add('capitalize', () => <Text capitalize>Sample text</Text>)
  .add('strikethrough', () => <Text strikethrough>Sample text</Text>)
  .add('ellipsize', () => (
    <Text style={{ width: '200px' }} ellipsize>
      Delta compression using up to 8 threads. Compressing objects: 100%
      (19/19), done. Writing objects: 100% (19/19), 1.87 KiB | 1.87 MiB/s, done.
    </Text>
  ))
  .add('wordwrap', () => (
    <Text style={{ width: '400px' }} wordwrap>
      Delta compression using up to 8 threads. Compressing objects: 100%
      (19/19), done. Writing objects: 100% (19/19), 1.87 KiB | 1.87 MiB/s, done.
    </Text>
  ));
