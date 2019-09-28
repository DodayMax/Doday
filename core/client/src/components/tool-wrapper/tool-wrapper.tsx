import * as React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import {
  ToolBeacon,
  DodayType,
  ToolView,
  LayoutSpot,
  NodeType,
} from '@doday/lib';
import { LayoutBlock, Icons } from '@doday/shared';
import { WithTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';

interface ToolWrapperProps {
  tool: ToolBeacon;
  place: LayoutSpot;
  dodayType?: DodayType;
  isProgress?: boolean;
  loading?: boolean;
}

export const ToolWrapper = (
  props: ToolWrapperProps &
    Partial<RouteComponentProps> &
    Partial<WithTranslation>
) => {
  const { tool, place, dodayType, isProgress, ...pathrough } = props;
  if (!tool) {
    return null;
  }
  if (!tool.loaded) {
    return (
      <LayoutBlock flex="1" align="flexCenter" valign="vflexCenter">
        <Icons.InlineLoader color="#fff" />
      </LayoutBlock>
    );
  }
  let toolView: ToolView;
  if (isProgress) {
    toolView = tool.getView(place, dodayType, NodeType.progress);
  } else {
    toolView = tool.getView(place, dodayType);
  }
  const Component = toolView.component;

  return (
    <DynamicModuleLoader modules={[...toolView.dependencies]}>
      <Component {...pathrough} />
    </DynamicModuleLoader>
  );
};
