import * as React from 'react';
import * as classnames from 'classnames';
import * as cuid from 'cuid';
import { RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dashboard } from '@components';
import { RootState } from '@lib/models';
import { actions as settingsActions } from '@ducks/hero-settings';
import { actions as authActions } from '@ducks/auth';
import { actions as appActions } from '@ducks/doday-app';
import { actions as detailsActions } from '@ducks/doday-details';
import { Hero } from '@root/lib/models/entities/hero';
import { FetchHeroAction } from '@root/ducks/auth/actions';
import { Landing } from '../landing';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FaceIcon from '@material-ui/icons/Face';
import AppsIcon from '@material-ui/icons/Apps';
import BugReportIcon from '@material-ui/icons/BugReport';
import {
  ToggleDrawerAction,
  ToggleDodayAppAction,
  ToggleThemeAction,
} from '@root/ducks/hero-settings/actions';
import { ToolBeacon } from '@root/tools/types';

import {
  WithStyles,
  WithTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  Button,
  Switch,
} from '@material-ui/core';
import { Icons, LayoutBlock } from '../shared';
import { DrawerMenuItem, ThemeType, Space } from '@root/lib/common-interfaces';
import { capitalize } from '@root/lib/utils';
import { toolBeacons } from '@root/tools';
import { ChangeDodayAppRouteAction } from '@root/ducks/doday-app/actions';
import { ClearSelectedDodayAction } from '@root/ducks/doday-details/actions';

import { css } from './css.desktop-shell';
import { DodayApp } from './doday-app';
import { withTranslation, WithTranslation } from 'react-i18next';

interface DesktopShellProps extends RouteComponentProps {}

interface PropsFromConnect {
  dodayAppRoute: string;
  isDrawerCollapsed: boolean;
  isDodayAppCollapsed: boolean;
  hero: Hero;
  activeTools: ToolBeacon[];
  changeDodayAppRouteActionCreator(route: string): ChangeDodayAppRouteAction;
  clearSelectedDodayActionCreator(): ClearSelectedDodayAction;
  toggleDrawerActionCreator: (value?: boolean) => ToggleDrawerAction;
  toggleDodayAppActionCreator: () => ToggleDodayAppAction;
  fetchHeroActionCreator(): FetchHeroAction;
  toggleThemeActionCreator(mode: ThemeType): ToggleThemeAction;
}

interface DesktopShellState {
  resizeTaskId?: NodeJS.Timeout;
  isDrawerCollapsed: boolean;
}

class DesktopShell extends React.Component<
  DesktopShellProps &
    PropsFromConnect &
    WithStyles &
    WithTheme &
    WithTranslation,
  DesktopShellState
> {
  constructor(props) {
    super(props);

    // Keep in state for forceCollapsing
    this.state = {
      isDrawerCollapsed: props.isDrawerCollapsed,
    };
  }

  componentDidMount() {
    this.props.fetchHeroActionCreator();
    const taskID = this.state.resizeTaskId;
    const documentWidth = document.documentElement.scrollWidth;
    if (documentWidth <= 1100) {
      this.props.toggleDrawerActionCreator(true);
    }

    window.addEventListener('resize', evt => {
      if (taskID != null) {
        clearTimeout(taskID);
      }

      this.setState({
        resizeTaskId: setTimeout(() => {
          const documentWidth = document.documentElement.scrollWidth;
          if (!this.props.isDrawerCollapsed) {
            this.setState({
              resizeTaskId: undefined,
            });
            this.props.toggleDrawerActionCreator(documentWidth <= 1100);
          }
        }, 100),
      });
    });
  }

  toggleMenu() {
    this.props.toggleDrawerActionCreator();
  }

  handleProfileOpen = () => {
    this.props.history.push('/dashboard/profile');
  };

  toolsToDrawerMenuItems(tools: ToolBeacon[]): DrawerMenuItem[] {
    return tools.map((tool: ToolBeacon) => {
      return {
        text: capitalize(tool.config.sysname),
        route: tool.config.route,
        icon: tool.config.icon,
      };
    });
  }

  render() {
    const {
      classes,
      hero,
      activeTools,
      toggleDodayAppActionCreator,
      isDodayAppCollapsed,
      history,
      location,
      t,
    } = this.props;

    return (
      <div className={classes.root}>
        <Route exact path="/" render={() => <Redirect to="/welcome" />} />
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classnames(classes.appBar, {
            [classes.appBarShift]: !this.props.isDrawerCollapsed,
          })}
        >
          <Toolbar
            className={classes.topBar}
            disableGutters={this.props.isDrawerCollapsed}
          >
            <LayoutBlock valign="vflexCenter" insideElementsMargin>
              <LayoutBlock spaceLeft={Space.Small} spaceRight={Space.Medium}>
                <IconButton onClick={() => this.props.history.push('/welcome')}>
                  <Icons.Checkbox />
                </IconButton>
              </LayoutBlock>
              {hero && (
                <IconButton
                  onClick={() => {
                    history.push('/dashboard');
                    this.props.clearSelectedDodayActionCreator();
                  }}
                >
                  <AppsIcon fontSize="large" className={classes.white} />
                </IconButton>
              )}
            </LayoutBlock>
            <Typography variant="subtitle2" noWrap className={classes.white}>
              Welcome to the Doday app!
            </Typography>
            {hero ? (
              <LayoutBlock insideElementsMargin valign="vflexCenter">
                {activeTools.length ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={location.pathname.startsWith(
                      '/dashboard/builder'
                    )}
                    onClick={() =>
                      history.push(
                        `/dashboard/builder/${
                          activeTools[0].config.entities[0].name
                        }`
                      )
                    }
                  >
                    {`New ${activeTools[0].config.entities[0].name}`}
                  </Button>
                ) : null}
                <Switch
                  onChange={e => {
                    const theme = e.target.checked ? 'dark' : 'light';
                    this.props.toggleThemeActionCreator(theme);
                  }}
                  defaultChecked
                  value="checkedF"
                  color="default"
                />
                <div>
                  <IconButton
                    onClick={this.handleProfileOpen}
                    className={classes.white}
                  >
                    <FaceIcon />
                  </IconButton>
                </div>
              </LayoutBlock>
            ) : (
              <LayoutBlock>
                <IconButton href="/auth/google">
                  <Icons.Google />
                </IconButton>
              </LayoutBlock>
            )}
          </Toolbar>
        </AppBar>
        {hero && (
          <Route
            path="/dashboard"
            render={() => (
              <>
                <Drawer
                  variant="permanent"
                  className={classnames(classes.drawer, {
                    [classes.drawerOpen]: !this.props.isDrawerCollapsed,
                    [classes.drawerClose]: this.props.isDrawerCollapsed,
                  })}
                  classes={{
                    paper: classnames({
                      [classes.drawerOpen]: !this.props.isDrawerCollapsed,
                      [classes.drawerClose]: this.props.isDrawerCollapsed,
                    }),
                  }}
                  open={!this.props.isDrawerCollapsed}
                >
                  <div className={classes.toolbar} />
                  <Divider />
                  <LayoutBlock flex="1" direction="column" align="spaceBetween">
                    <LayoutBlock direction="column">
                      {this.toolsToDrawerMenuItems(toolBeacons).map(
                        (tool, index) => {
                          const Icon = Icons[tool.icon];
                          return (
                            <>
                              <ListItem
                                button
                                key={tool.text}
                                onClick={() => {
                                  this.props.changeDodayAppRouteActionCreator(
                                    tool.route
                                  );
                                  this.props.clearSelectedDodayActionCreator();
                                }}
                              >
                                <ListItemIcon>
                                  <Icon fontSize={'large'} />
                                </ListItemIcon>
                                <ListItemText
                                  primary={tool.text}
                                  primaryTypographyProps={{ variant: 'body1' }}
                                />
                              </ListItem>
                              <Divider />
                            </>
                          );
                        }
                      )}
                    </LayoutBlock>
                    <LayoutBlock direction="column">
                      <Divider />
                      <ListItem button key={cuid()} onClick={() => {}}>
                        <ListItemIcon>
                          <BugReportIcon fontSize="large" />
                        </ListItemIcon>
                        <ListItemText
                          primary={'Report bug'}
                          secondary="20DDC reward"
                          primaryTypographyProps={{ variant: 'body1' }}
                        />
                      </ListItem>
                      <Divider />
                      <ListItem
                        button
                        key={cuid()}
                        onClick={this.toggleMenu.bind(this)}
                      >
                        <ListItemIcon>
                          {this.props.isDrawerCollapsed ? (
                            <KeyboardArrowRightIcon
                              color="action"
                              fontSize="large"
                            />
                          ) : (
                            <KeyboardArrowLeftIcon
                              color="action"
                              fontSize="large"
                            />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={'Collapse drawer'}
                          primaryTypographyProps={{ variant: 'body1' }}
                        />
                      </ListItem>
                    </LayoutBlock>
                  </LayoutBlock>
                </Drawer>
                <main className={classes.content}>
                  <div className={classes.toolbar} />

                  <LayoutBlock>
                    <section>
                      {!isDodayAppCollapsed && (
                        <Route
                          path="/dashboard"
                          render={props => (
                            <DodayApp {...props} activeTools={activeTools} />
                          )}
                        />
                      )}
                    </section>

                    <React.Suspense fallback={null}>
                      <Dashboard
                        activeTools={activeTools}
                        toggleDodayAppActionCreator={
                          toggleDodayAppActionCreator
                        }
                        isDodayAppCollapsed={isDodayAppCollapsed}
                      />
                    </React.Suspense>
                  </LayoutBlock>
                </main>
              </>
            )}
          />
        )}
        <Route
          path="/welcome"
          render={() => (
            <LayoutBlock flex="1" direction="column">
              <div className={classes.toolbar} />
              <Landing />
            </LayoutBlock>
          )}
        />
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  isDrawerCollapsed: state.heroSettings.isDrawerCollapsed,
  isDodayAppCollapsed: state.heroSettings.isDodayAppCollapsed,
  hero: state.auth.hero,
  activeTools: state.auth.activeTools,
  dodayAppRoute: state.dodayApp.status.route,
});

export default connect(
  mapState,
  {
    changeDodayAppRouteActionCreator:
      appActions.actionCreators.changeDodayAppRouteActionCreator,
    clearSelectedDodayActionCreator:
      detailsActions.clearSelectedDodayActionCreator,
    toggleDrawerActionCreator: settingsActions.toggleDrawerActionCreator,
    toggleDodayAppActionCreator: settingsActions.toggleDodayAppActionCreator,
    fetchHeroActionCreator: authActions.actionCreators.fetchHeroActionCreator,
    toggleThemeActionCreator: settingsActions.toggleThemeActionCreator,
  }
)(withStyles(css, { withTheme: true })(withTranslation('shell')(DesktopShell)));
