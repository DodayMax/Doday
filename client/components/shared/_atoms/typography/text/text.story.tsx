import * as React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { Text } from './text';
import { TypographyColor, TypographyAlignment, TypographySize } from '@lib/common-interfaces'

storiesOf('Text', module)
  .add('default', () => (
    <Text text="Sample text"/>
  ))
  .add('color', () => (
    <Text text="Sample text" color={TypographyColor.Success} />
  ))
  .add('align', () => (
    <Text text="Sample text" align={TypographyAlignment.Center} />
  ))
  .add('size', () => (
    <Text text="Sample text" size={TypographySize.s} />
  ))
  .add('bold', () => (
    <Text text="Sample text" bold />
  ))
  .add('italic', () => (
    <Text text="Sample text" italic />
  ))
  .add('uppercase', () => (
    <Text text="Sample text" uppercase />
  ))
  .add('capitalize', () => (
    <Text text="Sample text" capitalize />
  ))
  .add('strikethrough', () => (
    <Text text="Sample text" strikethrough />
  ))
  .add('ellipsize', () => (
    <Text style={{ width: '200px' }} text="Delta compression using up to 8 threads.
    Compressing objects: 100% (19/19), done.
    Writing objects: 100% (19/19), 1.87 KiB | 1.87 MiB/s, done." ellipsize />
  ))
  .add('wordwrap', () => (
    <Text style={{ width: '400px' }} text="Delta compression using up to 8 threads.
    Compressing objects: 100% (19/19), done.
    Writing objects: 100% (19/19), 1.87 KiB | 1.87 MiB/s, done." wordwrap />
  ));
