import * as React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  ModuleView,
  RootState,
  GetViewParams,
  ModuleObject,
  LayoutType,
} from '@doday/lib';
import { Icons } from '@doday/ui';
import store from '@root/store';

interface ModuleWrapperProps {
  /** Render particular module */
  module?: ModuleObject;
}

export const ModuleWrapper = (
  props: GetViewParams &
    ModuleWrapperProps &
    React.HTMLAttributes<HTMLDivElement>
) => {
  const allModules = useSelector((state: RootState) => state.ms.modules);
  // By default set layoutType automatically by detecting screen size
  const isMobile = window.innerWidth <= 768;

  const {
    layoutType = isMobile ? LayoutType.Mobile : LayoutType.Desktop,
    spot,
    label,
    route,
    module,
    ...passthrough
  } = props;

  /**
   * If module passed as prop just render it
   */

  if (module) {
    const moduleView: ModuleView = module.getView({
      layoutType,
      spot,
      label,
      route,
    });
    if (!moduleView) return null;
    const Component = moduleView.component;
    if (!moduleView.dependencies.length) {
      return <Component {...passthrough} {...moduleView.props} />;
    }

    return (
      <DynamicModuleLoader
        modules={[...moduleView.dependencies]}
        createStore={() => store}
      >
        <Component {...passthrough} {...moduleView.props} />
      </DynamicModuleLoader>
    );
  }

  /**
   * If no module passed as a prop, then
   * find all modules supports passed Layout spot
   * Later we will have `active` option for modules that takes
   * same spot. For now just take first one.
   */
  const suitedModule = Object.values(allModules).find(module => {
    const hasSpot = module.spots && module.spots.includes(spot);
    const hasViewForRoute = route
      ? module.routes && module.routes.includes(route)
      : true;
    return hasSpot && hasViewForRoute;
  });
  const loadingModules = Object.values(allModules).filter(
    module => module.status.loading
  );

  /**
   * If there are no suited modules for this spot and
   * there are no loading modules just end
   */
  if (!suitedModule && !loadingModules.length) return null;

  /**
   * If there are no suited modules and some of them in loading state
   * just wait
   */
  if (!suitedModule && loadingModules.length) {
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

  const moduleView: ModuleView = suitedModule.getView({
    layoutType,
    spot,
    label,
    route,
  });

  if (!moduleView) return null;

  const Component = moduleView.component;

  return (
    <DynamicModuleLoader
      modules={[...moduleView.dependencies]}
      createStore={() => store}
    >
      <Component {...passthrough} {...moduleView.props} />
    </DynamicModuleLoader>
  );
};

export const Spot = (props: GetViewParams) => {
  return <ModuleWrapper {...props} />;
};
