import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { RouteComponentProps } from 'react-router';

export enum AnimationType {
  UP = 'UP',
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

export interface AnimatedOptions {
  animation?: AnimationType;
}

export interface PageWrapperChildContext {
  requestClose?(callback?: () => void): void;
}

export const AnimatedContext = React.createContext(null as any);

export const animated = (options?: AnimatedOptions) => (
  WrappedComponent: React.ComponentType<any>
): any => {
  return (props: React.HTMLAttributes<any> & RouteComponentProps<any, any>) => {
    const [visible, updateVisible] = React.useState(false);

    React.useEffect(() => {
      setTimeout(() => updateVisible(true), 200);
    }, []);

    const requestClose = (callback: () => void) => {
      updateVisible(false);
      setTimeout(() => {
        if (callback) callback();
      }, 200);
    };

    const getAnimationClass = () => {
      switch (options && options.animation) {
        case AnimationType.UP:
          return 'animation-from-bottom';
        case AnimationType.LEFT:
          return 'animation-from-left';
        default:
          return 'animation-from-right';
      }
    };

    return (
      <AnimatedContext.Provider value={requestClose}>
        <CSSTransition
          in={visible}
          timeout={300}
          classNames={getAnimationClass()}
          unmountOnExit
        >
          {React.createElement(
            WrappedComponent,
            Object.assign({}, props, props.children)
          )}
        </CSSTransition>
      </AnimatedContext.Provider>
    );
  };
};
