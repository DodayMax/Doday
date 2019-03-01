import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Icons } from '@components';

storiesOf('Icons', module)
  .add('DoubleChevronIcon', () => (
    <>
      <Icons.DoubleChevronIcon />
      <Icons.DoubleChevronIcon right />
    </>
  ))
  .add('InlineLoader', () => (
    <Icons.InlineLoader />
  ))
  .add('TodayCalendar', () => (
    <Icons.TodayCalendar />
  ));
