import * as React from 'react';
import { LayoutBlock } from '@doday/shared';
import { css } from './css.landing';
import { withStyles, WithStyles } from '@material-ui/core';

interface LandingProps {}

export const Landing = withStyles(css)((props: LandingProps & WithStyles) => {
  return (
    <LayoutBlock flex="1" className={props.classes.landingContainer}>
      Landing
    </LayoutBlock>
  );
});
