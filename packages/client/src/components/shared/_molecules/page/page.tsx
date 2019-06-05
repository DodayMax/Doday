import * as React from 'react';
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
    fullWidth: {
      width: '100%',
    },
  });

interface PageProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactElement<any>;
  /**
   * Static pages don't stacked on top of another page
   * (use when you need page without close btn)
   **/
  permanent?: boolean;
}

@(withRouter as any)
export class PageComponent extends React.Component<PageProps & WithStyles> {
  render() {
    const { permanent, classes, className } = this.props;
    const cx = classnames({
      [classes.pageContainer]: true,
      [classes.fullWidth]: permanent,
      [className]: !!className,
    });
    const scrollContainer = classnames({
      [classes.scroll]: true,
      [classes.stacked]: !permanent,
      [classes.static]: permanent,
    });
    return (
      <div className={scrollContainer}>
        {this.props.header}
        <div className={cx}>
          <LayoutBlock direction="column">{this.props.children}</LayoutBlock>
        </div>
      </div>
    );
  }
}

export const Page = withStyles(css)(PageComponent);
