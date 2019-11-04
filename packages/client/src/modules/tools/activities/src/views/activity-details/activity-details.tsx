import React from 'react';
import { animated, AnimationType } from '@root/components/animated/animated';
import { Page, PageHeader } from '@root/components/page';

export const ActivityDetails = animated({ animation: AnimationType.RIGHT })(
  props => {
    return <Page header={<PageHeader withClose />}>Activity details</Page>;
  }
);
