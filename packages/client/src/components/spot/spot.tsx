import * as React from 'react';
import _ from 'lodash';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { Box } from '@material-ui/core';
import { DodayModule, LayoutType, SpotConfig } from '@doday/lib';
import { Icons } from '@doday/ui';
import store from '@root/core/store';
import { useSelector } from 'react-redux';
import {
  findSuitableModulesSelector,
  loadingModulesSelector,
} from '@root/modules/redux/module-system/module-system.selectors';

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

    /**
     * Find all modules supports passed params
     */
    const suitableModules = useSelector(
      findSuitableModulesSelector({ sysname, node, multiple })
    );
    const loadingModules = useSelector(loadingModulesSelector);

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
     * For now we load only active modules for Hero
     * So we could just take first suitable module for Spot
     */
    const wrapped = _.compact(
      suitableModules.map(module => wrapModuleView(module, passthrough))
    );
    return multiple ? <>{wrapped}</> : <>{wrapped[0]}</>;
  }
);

export const wrapModuleView = (module: DodayModule, props?: any) => {
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
