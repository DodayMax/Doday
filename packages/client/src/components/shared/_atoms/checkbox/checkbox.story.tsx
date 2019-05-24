import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Checkbox } from './checkbox';

storiesOf('Checkbox', module)
  .add('default', () => <Checkbox activityType="do" onClick={() => {}} />)
  .add('checked', () => (
    <Checkbox activityType="watch" checked onClick={() => {}} />
  ));
