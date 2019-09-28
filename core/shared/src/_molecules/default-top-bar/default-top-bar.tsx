import * as React from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  Typography,
} from '@material-ui/core';
import { LayoutBlock } from '../../_atoms/layout-block';

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
          <LayoutBlock flex={'1'}>{this.props.leftAction}</LayoutBlock>
        )}
        <LayoutBlock flex={'2'} align="flexCenter">
          <Typography variant="body2">{this.props.title}</Typography>
        </LayoutBlock>
        {this.props.rightAction && (
          <LayoutBlock align="flexEnd" flex={'1'}>
            {this.props.rightAction}
          </LayoutBlock>
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
