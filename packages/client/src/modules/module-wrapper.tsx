import * as React from 'react';
import _ from 'lodash';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  GetViewParams,
  ModuleObject,
  LayoutType,
  NodeLabel,
  ModuleType,
} from '@doday/lib';
import { Icons } from '@doday/ui';
import store from '@root/store';
import {
  coreModulesSelector,
  toolModulesSelector,
  extensionModulesSelector,
} from './init/ms/selectors';

interface ModuleWrapperProps extends GetViewParams {
  moduleType: ModuleType;
  /** Render particular module */
  module?: ModuleObject;
  /**
   * Render all suitable modules which has views
   */
  renderAll?: boolean;
  /**
   * Pass array of NodeLabels to render all suitable views
   * Only works with `renderAll` prop
   */
  nodes?: NodeLabel[];
}

export const ModuleWrapper = (
  props: ModuleWrapperProps & React.HTMLAttributes<HTMLDivElement>
) => {
  // By default set layoutType automatically by detecting screen size
  const isMobile = window.innerWidth <= 768;
  const {
    moduleType,
    layoutType = isMobile ? LayoutType.Mobile : LayoutType.Desktop,
    spot,
    node,
    nodes,
    route,
    module,
    renderAll,
    ...passthrough
  } = props;

  const selector =
    moduleType === ModuleType.Core
      ? coreModulesSelector
      : moduleType === ModuleType.Tool
      ? toolModulesSelector
      : extensionModulesSelector;
  const allModules = useSelector(selector);

  /**
   * If `module` prop is passed just render it
   */
  if (module) {
    wrapModuleView(
      module,
      {
        layoutType,
        spot,
        node,
        route,
      },
      passthrough
    );
  }

  /**
   * If no `module` prop is passed, then
   * find all modules supports passed params
   */
  const suitableModules = Object.values(allModules).filter(module => {
    const hasSpot = module.spots && module.spots.includes(spot);
    const hasViewForRoute = route
      ? module.routes && module.routes.includes(route)
      : true;
    const hasNodeLabel =
      node && module.nodes ? module.nodes.includes(node) : true;

    return hasSpot && hasViewForRoute && hasNodeLabel;
  });

  const loadingModules = Object.values(allModules).filter(
    module => module.status.loading
  );

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
   * If `renderAll` prop is passed render all suitable views
   */
  if (renderAll) {
    const views = [];
    suitableModules.map(module => {
      if (nodes) {
        const intersections = _.intersection(module.nodes || [], nodes);
        if (intersections.length) {
          intersections.forEach(intersectionNode => {
            views.push(
              wrapModuleView(
                module,
                {
                  layoutType,
                  spot,
                  node: intersectionNode,
                  route,
                },
                passthrough
              )
            );
          });
        }
      } else {
        views.push(
          wrapModuleView(
            module,
            {
              layoutType,
              spot,
              node,
              route,
            },
            passthrough
          )
        );
      }
    });
    return <>{_.compact(views)}</>;
  }

  /**
   * Later we will have `active` option for modules that takes
   * same spot. For now just take first one.
   */
  return wrapModuleView(
    suitableModules[0],
    {
      layoutType,
      spot,
      node,
      route,
    },
    passthrough
  );
};

export const Spot = (props: ModuleWrapperProps) => {
  return <ModuleWrapper {...props} />;
};

export const wrapModuleView = (
  module: ModuleObject,
  params: GetViewParams,
  props?: any
) => {
  const view = module.getView(params);
  if (!view) return null;

  const Component = view.component;

  if (!view.dependencies.length) {
    return <Component key={module.config.sysname} {...props} {...view.props} />;
  }

  return (
    <DynamicModuleLoader
      key={module.config.sysname}
      modules={[...view.dependencies]}
      createStore={() => store}
    >
      <Component {...props} {...view.props} />
    </DynamicModuleLoader>
  );
};
