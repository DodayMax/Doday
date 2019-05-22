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

const css = require('./_dashboard.module.scss');

interface DashboardProps {
  activeTools: ToolBeacon[];
  toggleDodayAppActionCreator: () => ToggleDodayAppAction;
  isDodayAppCollapsed: boolean;
}

export class Dashboard extends React.Component<DashboardProps> {
  render() {
    const { isDodayAppCollapsed, activeTools } = this.props;

    return (
      <LayoutBlock>
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
