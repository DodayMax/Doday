import * as React from 'react';
import { css } from './css.landing';
import { withStyles, WithStyles, Box } from '@material-ui/core';

interface LandingProps {}

export const Landing = withStyles(css)((props: LandingProps & WithStyles) => {
  return (
    <Box display="flex" flexGrow={1} className={props.classes.landingContainer}>
      Landing
    </Box>
  );
});
