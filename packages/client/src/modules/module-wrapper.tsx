import * as React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import {
  ModuleObject,
  NodeLabel,
  ModuleView,
  LayoutSpot,
  LayoutType,
} from '@doday/lib';
import { Icons } from '@doday/ui';
import { WithTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import store from '@root/store';
import { Box } from '@material-ui/core';

interface ModuleWrapperProps {
  moduleObject: ModuleObject;
  layoutType?: LayoutType;
  spot?: LayoutSpot;
  node?: NodeLabel;
}

export const ModuleWrapper = (
  props: ModuleWrapperProps &
    Partial<RouteComponentProps> &
    Partial<WithTranslation>
) => {
  const { moduleObject, layoutType, spot, node, ...pathrough } = props;

  if (!moduleObject) {
    return null;
  }
  if (!moduleObject.status.loaded) {
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
  const moduleView: ModuleView = moduleObject.getView(layoutType, spot, node);
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
