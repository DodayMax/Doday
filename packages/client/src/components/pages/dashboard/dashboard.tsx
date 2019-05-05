import * as React from 'react';
import { Route } from 'react-router-dom';
import { Drawer, DodayApp, Builder } from '@components';
import {
  ToggleDrawerAction,
  ToggleDodayAppAction,
} from '@root/ducks/hero-settings/actions';
import { Profile } from '../profile';
import { tools } from '@tools';
import { DodayDetails } from '../doday-details';
import { ProgressDetails } from '../progress-details';

const css = require('./_dashboard.module.scss');

interface DashboardProps {
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
    const { isDodayAppCollapsed } = this.props;

    return (
      <>
        <nav>
          <Drawer
            collapsed={this.state.isDrawerCollapsed}
            toggle={() => this.toggleMenu()}
            tools={tools}
          />
        </nav>
        {!isDodayAppCollapsed && <Route path="/" component={DodayApp} />}
        <Route exact path="/" render={() => <div>Dashboard</div>} />
        <Route path="/dodays/:did" component={DodayDetails} />
        <Route path="/progress/:did" component={ProgressDetails} />
        <Route path="/builder" component={Builder} />
        <Route path="/profile" component={Profile} />
      </>
    );
  }
}
