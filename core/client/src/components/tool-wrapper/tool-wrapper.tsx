import * as React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { ToolBeacon, DodayType, ToolView } from '@doday/lib';
import { LayoutBlock, Icons } from '@doday/shared';

export type Place = 'app' | 'builder' | 'detail' | 'overview';

interface ToolWrapperProps {
  tool: ToolBeacon;
  place: Place;
  dodayType?: DodayType;
  isProgress?: boolean;
}

export const ToolWrapper = (props: ToolWrapperProps & any) => {
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
  if (dodayType != null) {
    if (isProgress) {
      toolView = tool.views[place][dodayType]['progress'] as any;
    } else {
      toolView = tool.views[place][dodayType]['public'] as any;
    }
  } else {
    toolView = tool.views[place] as any;
  }
  const Component = toolView.component;
  return (
    <DynamicModuleLoader modules={[...toolView.dependencies]}>
      <Component {...pathrough} />
    </DynamicModuleLoader>
  );
};
