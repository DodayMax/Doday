import * as React from 'react';
import { SvgIconProps, SvgIcon } from '../svg-icon';

export const createSvgIcon = (
  path: React.ReactElement,
  displayName: string
): React.ComponentType<SvgIconProps> => {
  const Component = React.memo(
    React.forwardRef((props: SvgIconProps, ref: React.Ref<SvgIconProps>) => {
      return (
        <SvgIcon {...props} ref={ref} data-doday-test={`${displayName}Icon`}>
          {path}
        </SvgIcon>
      );
    })
  );

  return Component;
};
