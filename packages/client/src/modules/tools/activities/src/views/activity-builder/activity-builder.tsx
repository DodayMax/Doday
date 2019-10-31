import React from 'react';
import { animated, AnimationType } from '@root/components/animated/animated';
import { Page, PageHeader } from '@root/components/page';

export const ActivityBuilder = animated({ animation: AnimationType.UP })(() => {
  return <Page header={<PageHeader withClose />}>Activity builder</Page>;
});
