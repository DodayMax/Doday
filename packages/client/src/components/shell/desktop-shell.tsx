import * as React from 'react';
import { BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dashboard, TopBar } from '@components';
import { RootState } from '@lib/models';
import { actions as settingsActions } from '@ducks/hero-settings';
import { actions as authActions } from '@ducks/auth';
import { Hero } from '@root/lib/models/entities';
import { FetchHeroAction } from '@root/ducks/auth/actions';
import { Landing } from '../landing';

const styles = require('./_desktop-shell.module.scss');

interface DesktopShellProps extends RouteComponentProps {}

interface PropsFromConnect {
  isDrawerShown: boolean;
  hero: Hero;
  toggleDrawer: () => void;
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
    const { hero, history, toggleDrawer, isDrawerShown } = this.props;

    return (
      <Router>
        <div className={styles.desktopContainer}>
          <TopBar
            hero={hero}
            disabled={history.location.pathname === '/builder'}
          />
          <section className={styles.contentContainer}>
            {hero ? (
              <Dashboard
                toggleDrawer={toggleDrawer}
                isDrawerShown={isDrawerShown}
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
  isDrawerShown: state.heroSettings.isDrawerShown,
  hero: state.auth.hero,
});

export default connect(
  mapState,
  {
    toggleDrawer: settingsActions.toggleDrawer,
    fetchHero: authActions.fetchHero,
  }
)(DesktopShell);
