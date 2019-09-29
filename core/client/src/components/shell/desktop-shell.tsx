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
  capitalize,
  ToolSysname,
  Entity,
} from '@doday/lib';
import ducks, {
  FetchHeroAction,
  ToggleDrawerAction,
  ToggleSidebarAction,
  ToggleThemeAction,
  ClearSelectedDodayAction,
  SetActiveToolBeaconsAction,
  AddActiveToolBeaconAction,
  ChangeSidebarRouteAction,
} from '@doday/duck';
import { Landing } from '../landing';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AddIcon from '@material-ui/icons/Add';
import BugReportIcon from '@material-ui/icons/BugReport';

import {
  WithStyles,
  WithTheme,
  CssBaseline,
  Drawer,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
} from '@material-ui/core';
import { Icons, LayoutBlock } from '@doday/shared';
import { loadTool } from '@tools';

import { css } from './css.desktop-shell';
import { withStyles } from '@material-ui/styles';
import { TopBar } from './top-bar/top-bar';
import { Sidebar } from './sidebar/sidebar';

interface DesktopShellProps extends RouteComponentProps {}

interface PropsFromConnect {
  sidebarRoute: string;
  isDrawerCollapsed: boolean;
  isSidebarCollapsed: boolean;
  hero: Hero;
  activeTools: { [key: string]: ToolBeacon };
  changeSidebarRouteActionCreator(route: string): ChangeSidebarRouteAction;
  clearSelectedDodayActionCreator(): ClearSelectedDodayAction;
  toggleDrawerActionCreator: (value?: boolean) => ToggleDrawerAction;
  toggleSidebarActionCreator: () => ToggleSidebarAction;
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
  speedDialOpen: boolean;
}

class DesktopShell extends React.Component<
  DesktopShellProps &
    PropsFromConnect &
    WithStyles &
    WithTheme &
    WithTranslation,
  DesktopShellState
> {
  constructor(props, context) {
    super(props, context);

    // Keep in state for forceCollapsing
    this.state = {
      isDrawerCollapsed: props.isDrawerCollapsed,
      speedDialOpen: false,
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

  handleSpeedDialOpen = () => {
    this.setState({
      speedDialOpen: true,
    });
  };

  handleSpeedDialClose = () => {
    this.setState({
      speedDialOpen: false,
    });
  };

  mapToolsToSelect = (tools: ToolBeacon[]) => {
    const allEntities = [];
    tools.forEach(tool => {
      tool.config.entities.forEach(entity => {
        allEntities.push(entity);
      });
    });
    return allEntities.map((entity: Entity) => {
      const icon = Icons[capitalize(entity.name)];
      return {
        icon,
        label: entity.name,
        value: entity.name,
      };
    });
  };

  render() {
    const {
      classes,
      hero,
      activeTools,
      toggleSidebarActionCreator,
      isSidebarCollapsed,
      history,
      location,
      t,
    } = this.props;

    const tools = Object.values(activeTools);
    let mappedTools:
      | { label: string; value: string; icon: JSX.Element }[]
      | undefined;
    if (tools.length && tools.every(tool => tool.loaded)) {
      mappedTools = this.mapToolsToSelect(tools);
    }

    return (
      <div className={classes.root}>
        <Route exact path="/" render={() => <Redirect to="/welcome" />} />
        <CssBaseline />
        <TopBar hero={hero} isDrawerCollapsed={this.props.isDrawerCollapsed} />
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
                                  this.props.changeSidebarRouteActionCreator(
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
                                this.props.changeSidebarRouteActionCreator(
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
                                  loaded: true,
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
                    <section className={classes.sidebarContainer}>
                      {!isSidebarCollapsed && (
                        <Route
                          path="/dashboard"
                          render={props => (
                            <React.Suspense fallback={null}>
                              <Sidebar />
                            </React.Suspense>
                          )}
                        />
                      )}
                    </section>

                    <React.Suspense fallback={null}>
                      <LayoutBlock
                        relative
                        flex={'1'}
                        className={classes.mainContentContainer}
                      >
                        <Dashboard
                          activeTools={activeTools}
                          toggleSidebarActionCreator={
                            toggleSidebarActionCreator
                          }
                          isSidebarCollapsed={isSidebarCollapsed}
                        />
                        <Fab
                          color="primary"
                          aria-label="Create doday"
                          className={classes.speedDial}
                          onClick={() => {
                            // history.push(`/dashboard/builder/${tool.label}`)
                          }}
                        >
                          <AddIcon />
                        </Fab>
                      </LayoutBlock>
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
  isSidebarCollapsed: state.heroSettings.isSidebarCollapsed,
  hero: state.auth.hero,
  activeTools: state.auth.activeTools,
  sidebarRoute: state.sidebar.route,
});

export default connect(
  mapState,
  {
    changeSidebarRouteActionCreator:
      ducks.sidebar.actions.changeSidebarRouteActionCreator,
    clearSelectedDodayActionCreator:
      ducks.details.actions.clearSelectedDodayActionCreator,
    toggleDrawerActionCreator: ducks.settings.actions.toggleDrawerActionCreator,
    toggleSidebarActionCreator:
      ducks.settings.actions.toggleSidebarActionCreator,
    fetchHeroActionCreator: ducks.auth.actions.fetchHeroActionCreator,
    setActiveToolBeaconsActionCreator:
      ducks.auth.actions.setActiveToolBeaconsActionCreator,
    addActiveToolBeaconActionCreator:
      ducks.auth.actions.addActiveToolBeaconActionCreator,
    toggleThemeActionCreator: ducks.settings.actions.toggleThemeActionCreator,
  }
)(withStyles(css, { withTheme: true })(withTranslation('shell')(DesktopShell)));
