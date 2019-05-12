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
import { ToolBeacon } from '@root/lib/common-interfaces';

const css = require('./_dashboard.module.scss');

interface DashboardProps {
  activeTools: ToolBeacon[];
  toggleDrawer: () => ToggleDrawerAction;
  toggleDodayApp: () => ToggleDodayAppAction;
  isDrawerCollapsed: boolean;
  isDodayAppCollapsed: boolean;
}

interface DashboardState {
  resizeTaskId?: NodeJS.Timeout;
  isDrawerCollapsed: boolean;
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);

    // Keep in state for forceCollapsing
    this.state = {
      isDrawerCollapsed: props.isDrawerCollapsed,
    };
  }
  toggleMenu() {
    this.setState({
      isDrawerCollapsed: !this.state.isDrawerCollapsed,
    });
  }

  componentDidMount() {
    const taskID = this.state.resizeTaskId;
    const documentWidth = document.documentElement.scrollWidth;
    this.setState({
      isDrawerCollapsed: documentWidth <= 1100,
    });

    window.addEventListener('resize', evt => {
      if (taskID != null) {
        clearTimeout(taskID);
      }

      this.setState({
        resizeTaskId: setTimeout(() => {
          const documentWidth = document.documentElement.scrollWidth;
          if (!this.state.isDrawerCollapsed) {
            this.setState({
              resizeTaskId: undefined,
              isDrawerCollapsed: documentWidth <= 1100,
            });
          }
        }, 100),
      });
    });
  }

  render() {
    const { isDodayAppCollapsed, activeTools } = this.props;

    return (
      <>
        <nav>
          <Drawer
            collapsed={this.state.isDrawerCollapsed}
            toggle={() => this.toggleMenu()}
            toolBeacons={activeTools}
          />
        </nav>
        {!isDodayAppCollapsed && (
          <Route
            path="/"
            render={props => <DodayApp {...props} activeTools={activeTools} />}
          />
        )}
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
      </>
    );
  }
}
