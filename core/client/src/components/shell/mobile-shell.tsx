import * as React from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import * as cuid from 'cuid';
import ducks, { ToggleDrawerAction } from '@doday/duck';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import BugReportIcon from '@material-ui/icons/BugReport';
import { RootState } from '@doday/lib';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { LayoutBlock } from '@doday/shared';

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

interface PropsFromConnect {
  isDrawerCollapsed: boolean;
  toggleDrawerActionCreator: (value?: boolean) => ToggleDrawerAction;
}

export class MobileShellComponent extends React.Component<
  PropsFromConnect & TranslationProps
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
  {
    toggleDrawerActionCreator: ducks.settings.actions.toggleDrawerActionCreator,
  }
)(MobileShellComponent);
