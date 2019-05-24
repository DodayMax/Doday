import * as React from 'react';
import { SvgIcon } from '@shared';
import { SvgIconProps } from '../svg-icon';

export const createSvgIcon = (
  path: React.ReactElement,
  displayName: string
): React.ComponentType<SvgIconProps> => {
  const Component = React.memo(
    React.forwardRef((props: SvgIconProps, ref: React.RefObject<any>) => {
      return (
        <SvgIcon {...props} ref={ref} data-mui-test={`${displayName}Icon`}>
          {path}
        </SvgIcon>
      );
    })
  );

  return Component;
};
