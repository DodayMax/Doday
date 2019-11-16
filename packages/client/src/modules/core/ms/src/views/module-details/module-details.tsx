import React from 'react';
import { animated, AnimationType } from '@root/components/animated/animated';
import { Page, PageHeader } from '@root/components/page';

export const ModuleDetails = animated({ animation: AnimationType.RIGHT })(
  props => {
    return <Page header={<PageHeader withClose />}>Module details</Page>;
  }
);
