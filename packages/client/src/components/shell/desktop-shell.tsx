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

const styles = require('./_desktop-shell.module.scss');

interface DesktopShellProps extends RouteComponentProps {}

interface PropsFromConnect {
  isDrawerCollapsed: boolean;
  isDodayAppCollapsed: boolean;
  hero: Hero;
  toggleDrawer: () => ToggleDrawerAction;
  toggleDodayApp: () => ToggleDodayAppAction;
  fetchHero: () => FetchHeroAction;
}

class DesktopShell extends React.Component<
  DesktopShellProps & PropsFromConnect,
  any
> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchHero();
  }

  toggleMenu() {
    this.props.toggleDrawer();
  }

  render() {
    const {
      hero,
      toggleDrawer,
      toggleDodayApp,
      isDrawerCollapsed,
      isDodayAppCollapsed,
    } = this.props;

    return (
      <Router>
        <div className={styles.desktopContainer}>
          <TopBar />
          <section className={styles.contentContainer}>
            {hero ? (
              <Dashboard
                activeToolBeacons={hero.tools}
                toggleDrawer={toggleDrawer}
                toggleDodayApp={toggleDodayApp}
                isDodayAppCollapsed={isDodayAppCollapsed}
                isDrawerCollapsed={isDrawerCollapsed}
              />
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
});

export default connect(
  mapState,
  {
    toggleDrawer: settingsActions.toggleDrawer,
    toggleDodayApp: settingsActions.toggleDodayApp,
    fetchHero: authActions.fetchHero,
  }
)(DesktopShell);
