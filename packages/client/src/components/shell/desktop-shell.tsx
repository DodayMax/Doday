import * as React from 'react';
import * as classnames from 'classnames';
import { RouteComponentProps, Route } from 'react-router-dom';
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
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FaceIcon from '@material-ui/icons/Face';
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
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Icons, LayoutBlock } from '../shared';
import { DrawerMenuItem, ThemeType } from '@root/lib/common-interfaces';
import { capitalize } from '@root/lib/utils';
import { toolBeacons } from '@root/tools';
import { ChangeDodayAppRouteAction } from '@root/ducks/doday-app/actions';
import { ClearSelectedDodayAction } from '@root/ducks/doday-details/actions';

import { css } from './desktop-shell.styles';
import { DodayApp } from './doday-app';
import { withTranslation, WithTranslation } from 'react-i18next';

interface DesktopShellProps extends RouteComponentProps {}

interface PropsFromConnect {
  isDrawerCollapsed: boolean;
  isDodayAppCollapsed: boolean;
  hero: Hero;
  activeTools: ToolBeacon[];
  changeDodayAppRouteActionCreator(route: string): ChangeDodayAppRouteAction;
  clearSelectedDodayActionCreator(): ClearSelectedDodayAction;
  toggleDrawerActionCreator: () => ToggleDrawerAction;
  toggleDodayAppActionCreator: () => ToggleDodayAppAction;
  fetchHeroActionCreator(): FetchHeroAction;
  toggleThemeActionCreator(mode: ThemeType): ToggleThemeAction;
}

interface DesktopShellState {
  resizeTaskId?: NodeJS.Timeout;
  isDrawerCollapsed: boolean;
  accountMenuAnchor?: any;
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

  toggleMenu() {
    this.setState({
      isDrawerCollapsed: !this.state.isDrawerCollapsed,
    });
  }

  handleAccountMenuOpen = event => {
    this.setState({ accountMenuAnchor: event.currentTarget });
  };

  handleAccountMenuClose = () => {
    this.setState({ accountMenuAnchor: null });
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
      theme,
      hero,
      activeTools,
      toggleDrawerActionCreator,
      toggleDodayAppActionCreator,
      isDrawerCollapsed,
      isDodayAppCollapsed,
      history,
      t,
    } = this.props;

    const { accountMenuAnchor } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classnames(classes.appBar, {
            [classes.appBarShift]: !this.state.isDrawerCollapsed,
          })}
        >
          <Toolbar
            className={classes.topBar}
            disableGutters={this.state.isDrawerCollapsed}
          >
            <IconButton
              onClick={this.toggleMenu.bind(this)}
              aria-label="Open drawer"
              className={classnames(classes.menuButton, classes.white, {
                [classes.hide]: !this.state.isDrawerCollapsed,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.white}>
              Welcome to the Doday app!
            </Typography>
            {hero ? (
              <LayoutBlock>
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
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleAccountMenuOpen}
                    className={classes.white}
                  >
                    <FaceIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={accountMenuAnchor}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={!!accountMenuAnchor}
                    onClose={this.handleAccountMenuClose}
                  >
                    <MenuItem onClick={this.handleAccountMenuClose}>
                      {t('shell:topbar.profile')}
                    </MenuItem>
                    <MenuItem onClick={this.handleAccountMenuClose}>
                      {t('shell:topbar.logout')}
                    </MenuItem>
                  </Menu>
                </div>
              </LayoutBlock>
            ) : (
              <LayoutBlock>
                <Button href="/auth/google">Login</Button>
              </LayoutBlock>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classnames(classes.drawer, {
            [classes.drawerOpen]: !this.state.isDrawerCollapsed,
            [classes.drawerClose]: this.state.isDrawerCollapsed,
          })}
          classes={{
            paper: classnames({
              [classes.drawerOpen]: !this.state.isDrawerCollapsed,
              [classes.drawerClose]: this.state.isDrawerCollapsed,
            }),
          }}
          open={!this.state.isDrawerCollapsed}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.toggleMenu.bind(this)}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRightIcon />
              ) : (
                <KeyboardArrowLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {this.toolsToDrawerMenuItems(toolBeacons).map((tool, index) => {
              const Icon = Icons[tool.icon];
              return (
                <ListItem
                  button
                  key={tool.text}
                  onClick={() => {
                    this.props.changeDodayAppRouteActionCreator(tool.route);
                    history.push(tool.route);
                    this.props.clearSelectedDodayActionCreator();
                  }}
                >
                  <ListItemIcon>
                    <Icon fontSize={'large'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={tool.text}
                    primaryTypographyProps={{ variant: 'h6' }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <LayoutBlock>
            <section>
              {!isDodayAppCollapsed && (
                <Route
                  path="/"
                  render={props => (
                    <DodayApp {...props} activeTools={activeTools} />
                  )}
                />
              )}
            </section>
            {hero ? (
              <React.Suspense fallback={null}>
                <Dashboard
                  activeTools={activeTools}
                  toggleDodayAppActionCreator={toggleDodayAppActionCreator}
                  isDodayAppCollapsed={isDodayAppCollapsed}
                />
              </React.Suspense>
            ) : (
              <Landing />
            )}
          </LayoutBlock>
        </main>
      </div>
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
    changeDodayAppRouteActionCreator:
      appActions.changeDodayAppRouteActionCreator,
    clearSelectedDodayActionCreator:
      detailsActions.clearSelectedDodayActionCreator,
    toggleDrawerActionCreator: settingsActions.toggleDrawerActionCreator,
    toggleDodayAppActionCreator: settingsActions.toggleDodayAppActionCreator,
    fetchHeroActionCreator: authActions.actionCreators.fetchHeroActionCreator,
    toggleThemeActionCreator: settingsActions.toggleThemeActionCreator,
  }
)(withStyles(css, { withTheme: true })(withTranslation('shell')(DesktopShell)));
