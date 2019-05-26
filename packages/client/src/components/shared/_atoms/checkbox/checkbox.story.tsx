import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Checkbox } from './checkbox';

storiesOf('Checkbox', module)
  .add('default', () => <Checkbox onClick={() => {}} />)
  .add('checked', () => <Checkbox checked onClick={() => {}} />);
