import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { RouteComponentProps } from 'react-router';

interface PageWrapperProps {}

interface PageWrapperState {
  visible: boolean;
}

export interface PageflowOptions {
  path: string;
}

export interface PageWrapperChildContext {
  requestClose?(): void;
}

export const Pageflow = (options: PageflowOptions): any => {
  const pageflow = (options: PageflowOptions) => (
    WrappedComponent: React.ComponentType<any>
  ): any => {
    const { path } = options;
    return class PageWrapper extends React.PureComponent<
      RouteComponentProps<any, any> & PageWrapperProps,
      PageWrapperState
    > {
      constructor(props) {
        super(props);

        this.state = {
          visible: true,
        };
      }
      public static childContextTypes: React.ValidationMap<any> = {
        requestClose: PropTypes.func,
      };

      private requestClose = () => {
        this.setState({
          visible: false,
        });
      };

      public getChildContext(): PageWrapperChildContext {
        return {
          requestClose: this.requestClose,
        };
      }

      public render() {
        return (
          <ReactCSSTransitionGroup
            component={React.Fragment}
            transitionAppear={true}
            transitionAppearTimeout={600}
            transitionEnterTimeout={600}
            transitionLeaveTimeout={200}
            transitionName={
              this.props.match && this.props.match.path.startsWith(path)
                ? 'loadComponent'
                : 'leaveComponent'
            }
          >
            {this.state.visible
              ? React.createElement(
                  WrappedComponent,
                  Object.assign({}, this.props, this.props.children)
                )
              : null}
          </ReactCSSTransitionGroup>
        );
      }
    };
  };

  return pageflow(options);
};
