import * as React from 'react';
import { Text, LayoutBlock } from '@shared';
import { TypographySize } from '@root/lib/common-interfaces';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';

const css = (theme: Theme) =>
  createStyles({
    container: {
      height: `${theme.spacing.unit * 8}px`,
      color: theme.palette.text.primary,
      background: theme.palette.background.paper,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: `0 ${theme.spacing.unit}px`,
      flexShrink: 0,
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
        <LayoutBlock flex={'2'} align="flex-center">
          <Text size={TypographySize.s}>{this.props.title}</Text>
        </LayoutBlock>
        {this.props.rightAction && (
          <LayoutBlock align="flex-end" flex={'1'}>
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
