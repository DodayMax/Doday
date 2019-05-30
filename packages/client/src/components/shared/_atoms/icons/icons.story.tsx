import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Icons } from '@shared';

storiesOf('Icons', module)
  .add('InlineLoader', () => <Icons.InlineLoader />)
  .add('Silver', () => <Icons.Silver />);
