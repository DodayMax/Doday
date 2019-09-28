import * as React from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import * as cuid from 'cuid';
import ducks, { ToggleDrawerAction } from '@doday/duck';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import BugReportIcon from '@material-ui/icons/BugReport';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import { RootState, Space } from '@doday/lib';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  createStyles,
  Fab,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { LayoutBlock, Icons } from '@doday/shared';
import { Route, RouteComponentProps } from 'react-router';
import { Store } from '../pages/store';
import { Builder } from '..';

interface TranslationProps {
  t?: i18next.TFunction;
  i18n?: i18next.i18n;
}

interface PropsFromConnect {
  isDrawerCollapsed: boolean;
  toggleDrawerActionCreator: (value?: boolean) => ToggleDrawerAction;
}

const css = createStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export class MobileShellComponent extends React.Component<
  PropsFromConnect & RouteComponentProps & TranslationProps & WithStyles
> {
  render() {
    const { history, classes } = this.props;
    return (
      <>
        <AppBar position="fixed">
          <Toolbar>
            <LayoutBlock
              align="spaceBetween"
              valign="vflexCenter"
              insideElementsMargin
              styles={{
                width: '100%',
              }}
            >
              <IconButton
                onClick={() => this.props.toggleDrawerActionCreator()}
              >
                <Icons.Checkbox />
              </IconButton>
              <IconButton onClick={() => {}}>
                <FaceIcon />
              </IconButton>
            </LayoutBlock>
          </Toolbar>
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
        <main>
          <div style={{ height: '64px' }}></div>
          <LayoutBlock
            relative
            flex="1"
            styles={{ height: 'calc(100vh - 64px)' }}
          >
            <Route path="/" component={Store} />
            <Route
              path="/builder"
              render={props => <Builder {...props} activeTools={{}} />}
            />
            <Fab
              color="primary"
              aria-label="add"
              className={classes.fab}
              onClick={() => history.push('/builder')}
            >
              <AddIcon />
            </Fab>
          </LayoutBlock>
        </main>
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
)(withStyles(css)(MobileShellComponent));
