import React from 'react';
import { Page, PageHeader } from '@root/components/page';
import { animated, AnimationType } from '@root/components/animated/animated';

export const ModuleDetails = animated({ animation: AnimationType.RIGHT })(
  props => {
    return <Page header={<PageHeader withClose />}>Module details</Page>;
  }
);
