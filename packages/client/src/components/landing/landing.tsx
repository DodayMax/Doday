import * as React from 'react';
import { LayoutBlock } from '../shared/_atoms/layout-block';
import { css } from './css.landing';
import { withStyles, WithStyles } from '@material-ui/core';

interface LandingProps {}

export const Landing = withStyles(css)((props: LandingProps & WithStyles) => {
  return <LayoutBlock className={props.classes.landingContainer} />;
});
