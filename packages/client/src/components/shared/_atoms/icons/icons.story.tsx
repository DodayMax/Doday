import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Icons } from '@shared';

storiesOf('Icons', module)
  .add('ArrowIcon', () => (
    <>
      <Icons.ArrowLeft />
    </>
  ))
  .add('DoubleChevronIcon', () => (
    <>
      <Icons.DoubleChevronIcon />
      <Icons.DoubleChevronIcon right />
    </>
  ))
  .add('InlineLoader', () => <Icons.InlineLoader />)
  .add('TodayCalendar', () => <Icons.TodayCalendar />)
  .add('Silver', () => <Icons.Silver />);
