import React from 'react';
import { DodayDetails } from '../doday-details/doday-details';
import { DodayProgress } from '../doday-progress/doday-progress';
import { DodayBuilder } from '../doday-builder/doday-builder';

export const BaseStack = () => {
  return (
    <>
      <DodayDetails />
      <DodayProgress />
      <DodayBuilder />
    </>
  );
};
