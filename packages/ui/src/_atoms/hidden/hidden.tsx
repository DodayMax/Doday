import React from 'react';

export interface HiddenProps extends React.HTMLAttributes<any> {
  condition: boolean;
  children?: JSX.Element;
}

export const Hidden = (props: HiddenProps) => {
  return !props.condition ? props.children : null;
};
