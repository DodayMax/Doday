import * as React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { ModuleView, LayoutType, RootState, AnySpot } from '@doday/lib';
import { Icons } from '@doday/ui';
import store from '@root/store';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';

interface ModuleWrapperProps {
  layoutType?: LayoutType;
  spot?: AnySpot;
}

export const ModuleWrapper = (props: ModuleWrapperProps) => {
  const allModules = useSelector((state: RootState) => state.ms.modules);

  const { layoutType, spot, ...pathrough } = props;

  /**
   * Find all modules supports passed Layout spot
   * Later we will have `active` option for modules that takes
   * same spot. For now just take first one.
   */
  const suitedModule = Object.values(allModules).find(
    module => module.spots && module.spots.includes(spot)
  );
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

  const moduleView: ModuleView = suitedModule.getView(layoutType, spot);
  const Component = moduleView.component;

  return (
    <DynamicModuleLoader
      modules={[...moduleView.dependencies]}
      createStore={() => store}
    >
      <Component {...pathrough} />
    </DynamicModuleLoader>
  );
};

export const Spot = (props: ModuleWrapperProps) => {
  return <ModuleWrapper {...props} />;
};
