import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Icons } from '../..';

storiesOf('Icons', module)
  .add('InlineLoader', () => <Icons.InlineLoader color="#222" />)
  .add('Silver', () => <Icons.Silver />);
