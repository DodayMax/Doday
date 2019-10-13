import * as React from 'react';
import * as classnames from 'classnames';
import * as cuid from 'cuid';
import { withTranslation, WithTranslation } from 'react-i18next';
import { RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  Hero,
  ToolBeacon,
  capitalize,
  ToolSysname,
  DrawerMenuItem,
  createRoute,
  auth,
  APIService,
} from '@doday/lib';
import {
  activeToolsSelector,
  pushRouteActionCreator,
  changeSidebarRouteActionCreator,
  clearSelectedDodayActionCreator,
  addActiveToolBeaconActionCreator,
  getCurrentHeroActionCreator,
  toggleDrawerActionCreator,
  SetIsAuthenticatedStatusAction,
} from '@doday/ducks';
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
  Zoom,
} from '@material-ui/core';
import { Icons, LayoutBlock } from '@doday/shared';
import { loadTool } from '@tools';
import { NavigationStack } from '@components';

import { css } from './css.desktop-shell';
import { withStyles } from '@material-ui/styles';
import { TopBar } from './top-bar/top-bar';
import { Sidebar } from './sidebar/sidebar';
import { ACLGuard } from '../acl-guard/acl-guard';

interface DesktopShellProps extends RouteComponentProps {}

interface PropsFromConnect {
  sidebarRoute: string;
  isDrawerCollapsed: boolean;
  isSidebarCollapsed: boolean;
  hero: Hero;
  activeTools: { [key: string]: ToolBeacon };
}

type Props = DesktopShellProps & WithStyles & WithTheme & WithTranslation;

export const DesktopShell = withStyles(css, { withTheme: true })(
  withTranslation('shell')((props: Props) => {
    const dispatch = useDispatch();
    const [resizeTaskId, updateResizeTask] = React.useState();
    const settings = useSelector((state: RootState) => state.heroSettings);
    const activeTools = useSelector(activeToolsSelector);
    const hero = useSelector((state: RootState) => state.auth.hero);
    const sidebarRoute = useSelector((state: RootState) => state.sidebar.route);

    React.useEffect(() => {
      const taskID = resizeTaskId;
      const documentWidth = document.documentElement.scrollWidth;
      if (documentWidth <= 1100) {
        dispatch(toggleDrawerActionCreator(true));
      }

      window.addEventListener('resize', evt => {
        if (taskID != undefined) {
          clearTimeout(taskID);
        }

        setTimeout(() => {
          const documentWidth = document.documentElement.scrollWidth;
          if (!settings.isDrawerCollapsed) {
            updateResizeTask(undefined);
            dispatch(toggleDrawerActionCreator(documentWidth <= 1100));
          }
        }, 100);
      });
    }, []);

    React.useEffect(() => {
      auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          return firebaseUser.getIdToken().then(async token => {
            APIService.token = token;
            APIService.getNewExp();
            dispatch(getCurrentHeroActionCreator());
            dispatch(SetIsAuthenticatedStatusAction(true));
          });
        }
        dispatch(SetIsAuthenticatedStatusAction(false));
      });
    }, [dispatch]);

    const toggleMenu = () => {
      dispatch(toggleDrawerActionCreator());
    };

    const toolsToDrawerMenuItems = (tools: ToolBeacon[]): DrawerMenuItem[] => {
      return tools.map((tool: ToolBeacon) => {
        return {
          text: capitalize(tool.config.sysname),
          route: tool.config.route,
          icon: tool.config.icon,
        };
      });
    };

    const { classes } = props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <TopBar hero={hero} isDrawerCollapsed={settings.isDrawerCollapsed} />
        <React.Suspense fallback={null}>
          <ACLGuard
            allowed={
              <Route
                path="/"
                render={() => (
                  <>
                    <Drawer
                      variant="permanent"
                      className={classnames(classes.drawer, {
                        [classes.drawerOpen]: !settings.isDrawerCollapsed,
                        [classes.drawerClose]: settings.isDrawerCollapsed,
                      })}
                      classes={{
                        paper: classnames({
                          [classes.drawerOpen]: !settings.isDrawerCollapsed,
                          [classes.drawerClose]: settings.isDrawerCollapsed,
                        }),
                      }}
                      open={!settings.isDrawerCollapsed}
                    >
                      <div className={classes.toolbar} />
                      <Divider />
                      <LayoutBlock
                        flex="1"
                        direction="column"
                        align="spaceBetween"
                      >
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
                                      dispatch(
                                        changeSidebarRouteActionCreator(
                                          tool.config.route
                                        )
                                      );
                                      dispatch(
                                        clearSelectedDodayActionCreator()
                                      );
                                    }}
                                  >
                                    <ListItemIcon>
                                      <Icon fontSize={'large'} />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={tool.config.sysname}
                                      primaryTypographyProps={{
                                        variant: 'body1',
                                      }}
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
                                    dispatch(
                                      changeSidebarRouteActionCreator(
                                        tool.config.route
                                      )
                                    );
                                    dispatch(clearSelectedDodayActionCreator());
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
                                  dispatch(
                                    addActiveToolBeaconActionCreator({
                                      loading: true,
                                      config: {
                                        sysname: tool.sysname as ToolSysname,
                                      },
                                    })
                                  );
                                  loadTool(tool.sysname).then(loadedTool => {
                                    dispatch(
                                      addActiveToolBeaconActionCreator({
                                        loading: false,
                                        loaded: true,
                                        ...loadedTool.default,
                                      })
                                    );
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
                            onClick={toggleMenu.bind(this)}
                          >
                            <ListItemIcon>
                              {settings.isDrawerCollapsed ? (
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
                          {!settings.isSidebarCollapsed && <Sidebar />}
                        </section>

                        <React.Suspense fallback={null}>
                          <LayoutBlock
                            relative
                            flex={'1'}
                            className={classes.mainContentContainer}
                          >
                            <NavigationStack />
                          </LayoutBlock>
                        </React.Suspense>
                      </LayoutBlock>
                      <Zoom
                        in={
                          !!Object.values(activeTools) &&
                          !!Object.values(activeTools).length
                        }
                      >
                        <Fab
                          color="primary"
                          aria-label="Create doday"
                          className={classes.speedDial}
                          onClick={() => {
                            if (Object.values(activeTools).length === 1) {
                              dispatch(
                                pushRouteActionCreator(
                                  createRoute().builder(
                                    Object.values(activeTools)[0].config
                                      .entities[0].name
                                  )
                                )
                              );
                            }
                          }}
                        >
                          <AddIcon />
                        </Fab>
                      </Zoom>
                    </main>
                  </>
                )}
              />
            }
            forbidden={
              <>
                <Redirect to="/" />
              </>
            }
          />
        </React.Suspense>
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
  })
);
