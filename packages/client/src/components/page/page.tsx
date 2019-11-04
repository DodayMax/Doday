import * as React from 'react';
import * as classnames from 'classnames';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Box,
} from '@material-ui/core';

const css = (theme: Theme) =>
  createStyles({
    pageContainer: {
      width: '80%',
      margin: '0 auto',
      position: 'relative',
      color: theme.palette.action.active,
      marginBottom: `${theme.spacing(3)}px`,
    },
    scroll: {
      width: '100%',
      height: '100%',
      overflowY: 'scroll',
    },
    stacked: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: theme.palette.background.default,
    },
    base: {
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

interface PageProps {
  header?: React.ReactElement<any>;
  /**
   * Static pages don't stacked on top of each other
   * (use when you need page without close btn)
   **/
  base?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const PageComponent = (props: PageProps & WithStyles) => {
  const { base, classes, className } = props;
  const cx = classnames({
    [classes.pageContainer]: true,
    [classes.fullWidth]: base,
    [className as string]: !!className,
  });
  const scrollContainer = classnames({
    [classes.scroll]: true,
    [classes.stacked]: !base,
    [classes.base]: base,
  });
  return (
    <div className={scrollContainer}>
      {props.header}
      <div className={cx}>
        <Box display="flex" flexDirection="column">
          {props.children}
        </Box>
      </div>
    </div>
  );
};

export const Page = withStyles(css)(PageComponent);
