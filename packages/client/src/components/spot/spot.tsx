import * as React from 'react';
import _ from 'lodash';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { Box } from '@material-ui/core';
import { ViewModuleConfig, LayoutType, SpotConfig } from '@doday/lib';
import { Icons } from '@doday/ui';
import store from '@root/core/store';

interface SpotProps extends SpotConfig {
  [key: string]: any;
}

export const Spot = React.memo(
  (props: SpotProps & React.HTMLAttributes<HTMLDivElement>) => {
    // By default set layoutType automatically by detecting screen size
    const isMobile = window.innerWidth <= 768;
    const {
      sysname,
      layoutType = isMobile ? LayoutType.Mobile : LayoutType.Desktop,
      node,
      multiple,
      ...passthrough
    } = props;

    // Get all modules from ModuleSystem
    const registeredModules = {};
    const loadingModules = [];

    /**
     * Find all modules supports passed params
     */
    const getSuitableModules = () => {
      const modulesForSpot = registeredModules[sysname];
      if (modulesForSpot && modulesForSpot.length) {
        if (!node) return modulesForSpot;
        return modulesForSpot.filter(module => module.node === node);
      }
    };
    const suitableModules = getSuitableModules();

    /**
     * If there are no suited modules for this spot and
     * there are no loading modules just end
     */
    if (!suitableModules.length && !loadingModules.length) return null;

    /**
     * If there are no suited modules and some of them in loading state
     * just wait
     */
    if (!suitableModules.length && loadingModules.length) {
      return (
        <Box
          display="flex"
          flexGrow={1}
          justifyContent="center"
          alignItems="center"
        >
          <Icons.InlineLoader color="#fff" />
        </Box>
      );
    }

    /**
     * If `multiple` prop is passed render all suitable views
     * else render only active one
     */
    const views = [];
    suitableModules.map(module => {
      views.push(wrapModuleView(module, passthrough));
    });
    /**
     * Later we will have `active` option for modules that takes
     * same spot. For now just take first one.
     */
    return multiple ? <>{_.compact(views)}</> : _.compact(views)[0];
  }
);

export const wrapModuleView = (module: ViewModuleConfig, props?: any) => {
  const view = module.getView();
  if (!view) return null;

  const Component = view.component;

  if (!view.dependencies.length) {
    return <Component key={module.config.sysname} {...props} />;
  }

  return (
    <DynamicModuleLoader
      key={module.config.sysname}
      modules={view.dependencies}
      createStore={() => store}
    >
      <Component {...props} />
    </DynamicModuleLoader>
  );
};
