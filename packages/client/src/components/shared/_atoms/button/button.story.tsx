import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Button } from './button';

storiesOf('Button', module)
  .add('default', () => (
    <Button text="Sample button" onClick={() => console.log('click')} />
  ))
  .add('primary', () => (
    <Button
      text="Sample button"
      primary={true}
      onClick={() => console.log('click')}
    />
  ))
  .add('loading', () => (
    <Button
      text="Sample button"
      primary={true}
      isLoading={true}
      onClick={() => console.log('click')}
    />
  ));
