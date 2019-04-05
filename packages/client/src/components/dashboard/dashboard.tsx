import * as React from 'react';
import { Route } from 'react-router-dom';
import { Drawer, DodayApp, Builder, DodayDetails } from '@components';

const css = require('./_dashboard.module.scss');

interface DashboardProps {
  toggleDrawer: () => void;
  isDrawerCollapsed: boolean;
}

interface DashboardState {
  resizeTaskId?: NodeJS.Timeout;
  forceCollapseDrawer: boolean;
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props) {
    super(props);

    this.state = {
      forceCollapseDrawer: false,
    };
  }
  toggleMenu() {
    this.props.toggleDrawer();
  }

  componentDidMount() {
    const taskID = this.state.resizeTaskId;

    window.addEventListener('resize', evt => {
      if (taskID != null) {
        clearTimeout(taskID);
      }

      this.setState({
        resizeTaskId: setTimeout(() => {
          const documentWidth = document.documentElement.scrollWidth;
          this.setState({
            resizeTaskId: undefined,
            forceCollapseDrawer: documentWidth <= 1100,
          });
        }, 100),
      });
    });
  }

  render() {
    return (
      <>
        <nav>
          <Drawer
            collapsed={
              this.props.isDrawerCollapsed || this.state.forceCollapseDrawer
            }
            toggle={() => this.toggleMenu()}
          />
        </nav>
        <DodayApp />
        <Route exact path="/" render={() => <div>Store</div>} />
        <Route path="/dodays/:id" component={DodayDetails} />
        <Route path="/builder" component={Builder} />
      </>
    );
  }
}
