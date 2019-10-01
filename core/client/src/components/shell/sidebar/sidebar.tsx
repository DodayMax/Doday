import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as _ from 'lodash';
import ducks, { activeToolsSelector, sidebarStateSelector } from '@doday/ducks';
import { ToolBeacon, LayoutSpot, useRouter } from '@doday/lib';
import { createStyles, Theme } from '@material-ui/core';
import { ToolWrapper } from '@root/components/tool-wrapper/tool-wrapper';
import { withStyles, WithStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';

export interface SidebarProps {}

const css = (theme: Theme) =>
  createStyles({
    sidebarContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: `calc(100vh - 64px)`,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  });

export const Sidebar = withStyles(css)(
  (props: SidebarProps & WithStyles<any>) => {
    const { t } = useTranslation(['activities', 'common']);
    const router = useRouter();
    const activeTools = useSelector(activeToolsSelector);
    const sidebarState = useSelector(sidebarStateSelector);

    const { classes } = props;

    useEffect(() => {
      Object.values(activeTools).map(tool => {
        if (location.pathname.startsWith(tool.config.route)) {
          ducks.sidebar.actions.changeSidebarRouteActionCreator(
            tool.config.route
          );
        }
      });
    }, []);

    const renderSidebar = () => {
      const tool: ToolBeacon | undefined = Object.values(activeTools).find(
        (tool: ToolBeacon) => tool.config.route === sidebarState.route
      );
      return (
        <ToolWrapper
          tool={tool}
          place={LayoutSpot.sidebar}
          loading={sidebarState.loading}
          history={router.history}
          t={t}
        />
      );
    };

    return (
      <section className={classes.sidebarContainer}>{renderSidebar()}</section>
    );
  }
);
