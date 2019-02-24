import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Input } from './input';

storiesOf('Input', module)
  .add('default', () => (
    <Input />
  ))
  .add('with placholder', () => (
    <Input placeholder="Write name of your doday" />
  ))
  .add('loading', () => (
    <Input placeholder="Write text or paste a link" isLoading={true} />
  ));
