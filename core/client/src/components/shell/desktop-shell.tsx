import * as React from 'react';
import * as classnames from 'classnames';
import * as cuid from 'cuid';
import { withTranslation, WithTranslation } from 'react-i18next';
import { RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dashboard } from '@components';
import {
  RootState,
  Hero,
  ToolBeacon,
  DrawerMenuItem,
  ThemeType,
  Space,
  capitalize,
  ToolSysname,
} from '@doday/lib';
import ducks, {
  FetchHeroAction,
  ToggleDrawerAction,
  ToggleDodayAppAction,
  ToggleThemeAction,
  ChangeDodayAppRouteAction,
  ClearSelectedDodayAction,
  SetActiveToolBeaconsAction,
  AddActiveToolBeaconAction,
} from '@doday/duck';
import { Landing } from '../landing';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FaceIcon from '@material-ui/icons/Face';
import AppsIcon from '@material-ui/icons/Apps';
import AddIcon from '@material-ui/icons/Add';
import BugReportIcon from '@material-ui/icons/BugReport';

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
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  Button,
  Switch,
} from '@material-ui/core';
import { Icons, LayoutBlock } from '@doday/shared';
import { loadTool } from '@tools';

import { css } from './css.desktop-shell';
import { DodayApp } from './doday-app';

interface DesktopShellProps extends RouteComponentProps {}

interface PropsFromConnect {
  dodayAppRoute: string;
  isDrawerCollapsed: boolean;
  isDodayAppCollapsed: boolean;
  hero: Hero;
  activeTools: { [key: string]: ToolBeacon };
  changeDodayAppRouteActionCreator(route: string): ChangeDodayAppRouteAction;
  clearSelectedDodayActionCreator(): ClearSelectedDodayAction;
  toggleDrawerActionCreator: (value?: boolean) => ToggleDrawerAction;
  toggleDodayAppActionCreator: () => ToggleDodayAppAction;
  fetchHeroActionCreator(): FetchHeroAction;
  setActiveToolBeaconsActionCreator(tools: {
    [key: string]: ToolBeacon;
  }): SetActiveToolBeaconsAction;
  addActiveToolBeaconActionCreator(tool: ToolBeacon): AddActiveToolBeaconAction;
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
      if (taskID != undefined) {
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
                {/* {Object.values(activeTools).length &&
                !Object.values(activeTools)[0].loading ? (
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
                          Object.values(activeTools)[0].config.entities[0].name
                        }`
                      )
                    }
                  >
                    {`New ${
                      Object.values(activeTools)[0].config.entities[0].name
                    }`}
                  </Button>
                ) : (
                  undefined
                )} */}
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
                      {Object.values(activeTools).map((tool, index) => {
                        if (!tool.loading) {
                          const Icon = Icons[tool.config.icon];
                          return (
                            <React.Fragment key={index}>
                              <ListItem
                                button
                                key={index}
                                onClick={() => {
                                  this.props.changeDodayAppRouteActionCreator(
                                    tool.config.route
                                  );
                                  this.props.clearSelectedDodayActionCreator();
                                }}
                              >
                                <ListItemIcon>
                                  <Icon fontSize={'large'} />
                                </ListItemIcon>
                                <ListItemText
                                  primary={tool.config.sysname}
                                  primaryTypographyProps={{ variant: 'body1' }}
                                />
                              </ListItem>
                              <Divider />
                            </React.Fragment>
                          );
                        }
                        return (
                          <React.Fragment key={index}>
                            <ListItem
                              button
                              onClick={() => {
                                this.props.changeDodayAppRouteActionCreator(
                                  tool.config.route
                                );
                                this.props.clearSelectedDodayActionCreator();
                              }}
                            >
                              <ListItemIcon>
                                <Icons.InlineLoader color="#fff" />
                              </ListItemIcon>
                            </ListItem>
                            <Divider />
                          </React.Fragment>
                        );
                      })}
                      <>
                        <ListItem
                          button
                          onClick={() => {
                            // TODO: replace it with Hero tools from DB
                            const fakeTools = [
                              {
                                sysname: 'activities',
                                title: 'Activities',
                                price: 0,
                              },
                            ];
                            const loadedTools = [];
                            fakeTools.map(async tool => {
                              this.props.addActiveToolBeaconActionCreator({
                                loading: true,
                                config: {
                                  sysname: tool.sysname as ToolSysname,
                                },
                              });
                              loadTool(tool.sysname).then(loadedTool => {
                                this.props.addActiveToolBeaconActionCreator({
                                  loading: false,
                                  ...loadedTool.default,
                                });
                              });
                            });
                          }}
                        >
                          <ListItemIcon>
                            <AddIcon fontSize={'large'} />
                          </ListItemIcon>
                        </ListItem>
                        <Divider />
                      </>
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
                    <section className={classes.dodayAppContainer}>
                      {!isDodayAppCollapsed && (
                        <Route
                          path="/dashboard"
                          render={props => (
                            <React.Suspense fallback={null}>
                              <DodayApp {...props} activeTools={{}} />
                            </React.Suspense>
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
      ducks.dodayApp.actions.changeDodayAppRouteActionCreator,
    clearSelectedDodayActionCreator:
      ducks.details.actions.clearSelectedDodayActionCreator,
    toggleDrawerActionCreator: ducks.settings.actions.toggleDrawerActionCreator,
    toggleDodayAppActionCreator:
      ducks.settings.actions.toggleDodayAppActionCreator,
    fetchHeroActionCreator: ducks.auth.actions.fetchHeroActionCreator,
    setActiveToolBeaconsActionCreator:
      ducks.auth.actions.setActiveToolBeaconsActionCreator,
    addActiveToolBeaconActionCreator:
      ducks.auth.actions.addActiveToolBeaconActionCreator,
    toggleThemeActionCreator: ducks.settings.actions.toggleThemeActionCreator,
  }
)(withStyles(css, { withTheme: true })(withTranslation('shell')(DesktopShell)));
