import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { RouteComponentProps } from 'react-router';

export interface PageflowOptions {
  path: string;
}

export interface PageWrapperChildContext {
  requestClose?(callback?: () => void): void;
}

export const PageflowContext = React.createContext(null as any);

export const pageflow = (options?: PageflowOptions) => (
  WrappedComponent: React.ComponentType<any>
): any => {
  return (props: React.HTMLAttributes<any> & RouteComponentProps<any, any>) => {
    const [visible, updateVisible] = React.useState(false);

    React.useEffect(() => {
      setTimeout(() => updateVisible(true), 300);
    }, []);

    const requestClose = (callback: () => void) => {
      updateVisible(false);
      setTimeout(() => {
        if (callback) callback();
      }, 300);
    };

    return (
      <PageflowContext.Provider value={requestClose}>
        <CSSTransition
          in={visible}
          timeout={300}
          classNames="pageflow"
          unmountOnExit
        >
          {React.createElement(
            WrappedComponent,
            Object.assign({}, props, props.children)
          )}
        </CSSTransition>
      </PageflowContext.Provider>
    );
  };
};
