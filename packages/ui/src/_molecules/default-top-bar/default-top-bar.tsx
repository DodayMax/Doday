import * as React from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  Typography,
  Box,
} from '@material-ui/core';

const css = (theme: Theme) =>
  createStyles({
    container: {
      height: `${theme.spacing(8)}px`,
      color: theme.palette.text.primary,
      display: 'flex',
      justifyContent: 'spaceBetween',
      alignItems: 'center',
      padding: `0 ${theme.spacing(1)}px`,
      flexShrink: 0,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  });

interface DefaultTopBarProps {
  title: string;
  leftAction?: React.ReactElement<any>;
  rightAction?: React.ReactElement<any>;
}

export class DefaultTopBarComponent extends React.Component<
  DefaultTopBarProps & WithStyles
> {
  renderContent = () => {
    return (
      <>
        {this.props.leftAction && (
          <Box display="flex" flexGrow={1}>
            {this.props.leftAction}
          </Box>
        )}
        <Box display="flex" flexGrow={2} justifyContent="center">
          <Typography variant="body2">{this.props.title}</Typography>
        </Box>
        {this.props.rightAction && (
          <Box display="flex" justifyContent="flex-end" flexGrow={1}>
            {this.props.rightAction}
          </Box>
        )}
      </>
    );
  };

  render() {
    const { classes } = this.props;
    return <div className={classes.container}>{this.renderContent()}</div>;
  }
}

export const DefaultTopBar = withStyles(css)(DefaultTopBarComponent);
