import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Badge } from './badge';

storiesOf('Badge', module)
  .add('default', () => (
    <Badge value={12} />
  ));
