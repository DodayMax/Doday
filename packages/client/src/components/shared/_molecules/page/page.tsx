import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classnames from 'classnames';
import { LayoutBlock } from '@shared';
import { withRouter } from 'react-router';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

const css = (theme: Theme) =>
  createStyles({
    pageContainer: {
      width: '80%',
      margin: '0 auto',
      position: 'relative',
      color: theme.palette.action.active,
      marginBottom: `${theme.spacing.unit * 3}px`,
    },
    scroll: {
      width: '100%',
      height: '100%',
      overflowY: 'scroll',
    },
    stacked: {
      position: 'relative',
      zIndex: 1,
      backgroundColor: theme.palette.background.default,
    },
    static: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: 0,
    },
  });

interface PageProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactElement<any>;
  /**
   * Static pages don't stacked on top of another page
   * (use when you need page without close btn)
   **/
  isStatic?: boolean;
}

export interface PageChildContext {
  scrollContainer: React.RefObject<HTMLDivElement>;
}

@(withRouter as any)
export class PageComponent extends React.Component<PageProps & WithStyles, {}> {
  private scrollContainer: React.RefObject<HTMLDivElement> = React.createRef();

  public static childContextTypes: React.ValidationMap<any> = {
    scrollContainer: PropTypes.any,
  };

  public getChildContext(): PageChildContext {
    return {
      scrollContainer: this.scrollContainer,
    };
  }

  render() {
    const { isStatic, classes, className } = this.props;

    const cx = classnames({
      [classes.pageContainer]: true,
      [className]: !!className,
    });
    const scrollContainer = classnames({
      [classes.scroll]: true,
      [classes.stacked]: !isStatic,
      [classes.static]: isStatic,
    });
    return (
      <div className={scrollContainer}>
        {this.props.header}
        <div className={cx} ref={this.scrollContainer}>
          <LayoutBlock direction="column">{this.props.children}</LayoutBlock>
        </div>
      </div>
    );
  }
}

export const Page = withStyles(css)(PageComponent);
