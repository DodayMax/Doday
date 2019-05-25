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
      padding: `${theme.spacing.unit * 2}`,
      color: theme.palette.action.active,
    },
    scroll: {
      width: '100%',
      height: '100%',
      overflowY: 'scroll',
    },
  });

interface PageProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactElement<any>;
}
@(withRouter as any)
export class PageComponent extends React.Component<PageProps & WithStyles, {}> {
  render() {
    const { classes, className } = this.props;
    const cx = classnames({
      [classes.pageContainer]: true,
      [className]: !!className,
    });
    return (
      <div className={classes.scroll}>
        {this.props.header}
        <div className={cx}>
          <LayoutBlock direction="column">{this.props.children}</LayoutBlock>
        </div>
      </div>
    );
  }
}

export const Page = withStyles(css)(PageComponent);
