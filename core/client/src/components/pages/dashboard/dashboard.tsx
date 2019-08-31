import * as React from 'react';
import { Route } from 'react-router-dom';
import { Builder } from '@components';
import { ToggleDodayAppAction } from '@root/ducks/hero-settings/actions';
import { Profile } from '../profile';
import { DodayDetails } from '../doday-details';
import { ProgressDetails } from '../progress-details';
import { ToolBeacon } from '@root/tools/types';
import { Store } from '../store';
import { LayoutBlock } from '@root/components/shared';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

const css = (theme: Theme) =>
  createStyles({
    mainContentContainer: {
      height: 'calc(100vh - 64px)',
    },
    backdrop: {
      position: 'absolute',
      top: 0,
      rigth: 0,
      left: 0,
      bottom: 0,
      backgroundColor: theme.palette.background.default,
    },
  });

interface DashboardProps {
  activeTools: ToolBeacon[];
  toggleDodayAppActionCreator: () => ToggleDodayAppAction;
  isDodayAppCollapsed: boolean;
}

export const Dashboard = withStyles(css)(
  (props: DashboardProps & WithStyles) => {
    const { activeTools, classes } = props;
    return (
      <LayoutBlock relative flex={'1'} className={classes.mainContentContainer}>
        {activeTools.map((tool, index) => (
          <Route
            key={index}
            path={tool.config.route}
            component={tool.components.overview}
          />
        ))}
        <Route
          path="/dashboard/dodays/:did"
          render={props => (
            <DodayDetails {...props} activeTools={activeTools} />
          )}
        />
        <Route
          path="/dashboard/progress/:did"
          render={props => (
            <ProgressDetails {...props} activeTools={activeTools} />
          )}
        />
        <Route
          path="/dashboard/builder"
          render={props => <Builder {...props} activeTools={activeTools} />}
        />
        <Route path="/dashboard/profile" component={Profile} />
        <Route path="/dashboard" component={Store} />
      </LayoutBlock>
    );
  }
);
