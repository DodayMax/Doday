import * as React from 'react';
import { connect } from 'react-redux';
import { Route, match } from 'react-router-dom';
import i18next from 'i18next';
import * as cuid from 'cuid';
import { actions as settingsActions } from '@ducks/hero-settings';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import BugReportIcon from '@material-ui/icons/BugReport';
import { RootState } from '@root/lib/models';
import { ToggleDrawerAction } from '@root/ducks/hero-settings/actions';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { LayoutBlock } from '@shared';

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

interface ShellProps {
  match?: match;
}

interface PropsFromConnect {
  isDrawerCollapsed: boolean;
  toggleDrawerActionCreator: (value?: boolean) => ToggleDrawerAction;
}

export class MobileShellComponent extends React.Component<
  ShellProps & PropsFromConnect & TranslationProps
> {
  render() {
    return (
      <>
        <AppBar position="fixed">
          <Toolbar>Menu</Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={!this.props.isDrawerCollapsed}
          onClose={() => this.props.toggleDrawerActionCreator(true)}
          onOpen={() => this.props.toggleDrawerActionCreator(false)}
        >
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
        </SwipeableDrawer>
        <LayoutBlock align="flexCenter" valign="vflexCenter">
          <Button onClick={() => this.props.toggleDrawerActionCreator()}>
            Open
          </Button>
        </LayoutBlock>
      </>
    );
  }
}

const mapState = (state: RootState) => ({
  isDrawerCollapsed: state.heroSettings.isDrawerCollapsed,
});

export default connect(
  mapState,
  { toggleDrawerActionCreator: settingsActions.toggleDrawerActionCreator }
)(MobileShellComponent);
