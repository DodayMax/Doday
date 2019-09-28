import * as React from 'react';
import * as classnames from 'classnames';
import { LayoutBlock } from '../layout-block';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const css = (theme: Theme) =>
  createStyles({
    progress: {
      backgroundColor: blue[500],
    },
    vertical: {
      width: '0.4rem',
      height: 'auto',
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.grey[900]
          : theme.palette.grey[200],
    },
  });

interface ProgressProps {
  vertical?: boolean;
  color?: string;
  start?: number;
  progress: number;
  total: number;
}

export const Progress: React.ComponentType<
  ProgressProps & Partial<WithStyles>
> = withStyles(css)(
  ({
    vertical = false,
    start = 0,
    progress,
    total,
    classes,
  }: ProgressProps & Partial<WithStyles>) => {
    const currentProgress = (progress / (total - start)) * 100;
    const cx = classnames({
      [classes!['vertical']]: vertical,
    });
    const progressStyles = {
      width: vertical ? '.4rem' : `${currentProgress}%`,
      height: vertical ? `${currentProgress}%` : '.4rem',
    };
    return (
      <LayoutBlock
        align={vertical ? 'flexCenter' : 'flexStart'}
        valign={vertical ? 'vflexEnd' : 'vflexCenter'}
        className={cx}
      >
        <div className={classes!['progress']} style={progressStyles} />
      </LayoutBlock>
    );
  }
) as any;
