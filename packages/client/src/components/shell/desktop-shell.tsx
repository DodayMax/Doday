import * as React from 'react';
import { BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dashboard } from '@components';
import { TopBar } from '@shared';
import { RootState } from '@lib/models';
import { actions as settingsActions } from '@ducks/hero-settings';
import { actions as authActions } from '@ducks/auth';
import { Hero } from '@root/lib/models/entities/hero';
import { FetchHeroAction } from '@root/ducks/auth/actions';
import { Landing } from '../landing';
import {
  ToggleDrawerAction,
  ToggleDodayAppAction,
} from '@root/ducks/hero-settings/actions';
import { ToolBeacon } from '@root/tools/types';

const styles = require('./_desktop-shell.module.scss');

interface DesktopShellProps extends RouteComponentProps {}

interface PropsFromConnect {
  isDrawerCollapsed: boolean;
  isDodayAppCollapsed: boolean;
  hero: Hero;
  activeTools: ToolBeacon[];
  toggleDrawerActionCreator: () => ToggleDrawerAction;
  toggleDodayAppActionCreator: () => ToggleDodayAppAction;
  fetchHeroActionCreator(): FetchHeroAction;
}

class DesktopShell extends React.Component<
  DesktopShellProps & PropsFromConnect,
  any
> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchHeroActionCreator();
  }

  toggleMenu() {
    this.props.toggleDrawerActionCreator();
  }

  render() {
    const {
      hero,
      activeTools,
      toggleDrawerActionCreator,
      toggleDodayAppActionCreator,
      isDrawerCollapsed,
      isDodayAppCollapsed,
    } = this.props;

    return (
      <Router>
        <div className={styles.desktopContainer}>
          <React.Suspense fallback={null}>
            <TopBar />
          </React.Suspense>
          <section className={styles.contentContainer}>
            {hero ? (
              <React.Suspense fallback={null}>
                <Dashboard
                  activeTools={activeTools}
                  toggleDrawerActionCreator={toggleDrawerActionCreator}
                  toggleDodayAppActionCreator={toggleDodayAppActionCreator}
                  isDodayAppCollapsed={isDodayAppCollapsed}
                  isDrawerCollapsed={isDrawerCollapsed}
                />
              </React.Suspense>
            ) : (
              <Landing />
            )}
          </section>
        </div>
      </Router>
    );
  }
}

const mapState = (state: RootState) => ({
  isDrawerCollapsed: state.heroSettings.isDrawerCollapsed,
  isDodayAppCollapsed: state.heroSettings.isDodayAppCollapsed,
  hero: state.auth.hero,
  activeTools: state.auth.activeTools,
});

export default connect(
  mapState,
  {
    toggleDrawerActionCreator: settingsActions.toggleDrawerActionCreator,
    toggleDodayAppActionCreator: settingsActions.toggleDodayAppActionCreator,
    fetchHeroActionCreator: authActions.actionCreators.fetchHeroActionCreator,
  }
)(DesktopShell);
