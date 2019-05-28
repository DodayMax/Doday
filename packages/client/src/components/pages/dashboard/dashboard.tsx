import * as React from 'react';
import { Route } from 'react-router-dom';
import { Drawer, Builder } from '@components';
import {
  ToggleDrawerAction,
  ToggleDodayAppAction,
} from '@root/ducks/hero-settings/actions';
import { Profile } from '../profile';
import { DodayDetails } from '../doday-details';
import { ProgressDetails } from '../progress-details';
import { DodayApp } from '@root/components/shell/doday-app';
import { ToolBeacon } from '@root/tools/types';
import { Store } from '../store';
import { LayoutBlock } from '@root/components/shared';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

const css = (theme: Theme) =>
  createStyles({
    mainContentContainer: {
      height: 'calc(100vh - 64px)',
    },
  });

interface DashboardProps {
  activeTools: ToolBeacon[];
  toggleDodayAppActionCreator: () => ToggleDodayAppAction;
  isDodayAppCollapsed: boolean;
}

export class DashboardComponent extends React.Component<
  DashboardProps & WithStyles
> {
  render() {
    const { activeTools, classes } = this.props;

    return (
      <LayoutBlock flex={'1'} className={classes.mainContentContainer}>
        {activeTools.map((tool, index) => (
          <Route
            key={index}
            path={tool.config.route}
            component={tool.components.overview}
          />
        ))}
        <Route
          path="/dodays/:did"
          render={props => (
            <DodayDetails {...props} activeTools={activeTools} />
          )}
        />
        <Route
          path="/progress/:did"
          render={props => (
            <ProgressDetails {...props} activeTools={activeTools} />
          )}
        />
        <Route
          path="/builder"
          render={props => <Builder {...props} activeTools={activeTools} />}
        />
        <Route path="/profile" component={Profile} />
        <Route path="/store" component={Store} />
      </LayoutBlock>
    );
  }
}

export const Dashboard = withStyles(css)(DashboardComponent);
