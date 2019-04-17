import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Button } from './button';

storiesOf('Button', module)
  .add('default', () => (
    <Button onClick={() => console.log('click')}>Sample button</Button>
  ))
  .add('primary', () => (
    <Button
      primary={true}
      onClick={() => console.log('click')}
    >Sample button</Button>
  ))
  .add('loading', () => (
    <Button
      primary={true}
      isLoading={true}
      onClick={() => console.log('click')}
    >Sample button</Button>
  ));
