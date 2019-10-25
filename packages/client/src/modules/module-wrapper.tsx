import * as React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import {
  ModuleObject,
  NodeLabel,
  ModuleView,
  LayoutSpot,
  LayoutType,
} from '@doday/lib';
import { LayoutBlock, Icons } from '@doday/ui';
import { WithTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import store from '@root/store';

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
      <LayoutBlock flex="1" align="flexCenter" valign="vflexCenter">
        <Icons.InlineLoader color="#fff" />
      </LayoutBlock>
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
