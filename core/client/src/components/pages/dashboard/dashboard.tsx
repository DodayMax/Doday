import * as React from 'react';
import { Route } from 'react-router-dom';
import { Builder } from '@components';
import { ToggleDodayAppAction } from '@doday/duck';
import { Profile } from '../profile';
import { DodayDetails } from '../doday-details';
import { ProgressDetails } from '../progress-details';
import { ToolBeacon, LayoutSpot, DodayType, NodeType } from '@doday/lib';
import { Store } from '../store';
import { LayoutBlock } from '@doday/shared';
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
  activeTools: { [key: string]: ToolBeacon };
  toggleDodayAppActionCreator: () => ToggleDodayAppAction;
  isDodayAppCollapsed: boolean;
}

export const Dashboard = withStyles(css)(
  (props: DashboardProps & WithStyles) => {
    const { activeTools, classes } = props;
    return (
      <LayoutBlock relative flex={'1'} className={classes.mainContentContainer}>
        {Object.values(activeTools).map((tool, index) => {
          if (tool.loaded) {
            const Overview = tool.getView(
              LayoutSpot.overview,
              DodayType.Activity
            );
            if (Overview) {
              return (
                <Route
                  key={index}
                  path={tool.config.route}
                  component={Overview.component}
                />
              );
            }
          }
        })}
        <Route
          path="/dashboard/dodays/:did"
          render={props => <DodayDetails {...props} />}
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
