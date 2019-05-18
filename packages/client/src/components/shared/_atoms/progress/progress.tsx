import * as React from 'react';
import * as classnames from 'classnames';
import { LayoutBlock } from '../layout-block';
import { Space } from '@root/lib/common-interfaces';

const vars = require('@styles/_config.scss');
const css = require('./progress.module.scss');

interface ProgressProps {
  vertical?: boolean;
  color?: string;
  start?: number;
  progress: number;
  total: number;
}

export const Progress: React.FC<ProgressProps> = ({
  vertical = false,
  color = vars.blueLight,
  start = 0,
  progress,
  total,
}) => {
  const currentProgress = (progress / (total - start)) * 100;
  const cx = classnames({
    [css['vertical']]: vertical,
  });
  const progressStyles = {
    width: vertical ? '.4rem' : `${currentProgress}%`,
    height: vertical ? `${currentProgress}%` : '.4rem',
    backgroundColor: color,
  };
  return (
    <LayoutBlock
      align={vertical ? 'flex-center' : 'flex-start'}
      valign={vertical ? 'vflex-end' : 'vflex-center'}
      className={cx}
    >
      <div style={progressStyles} />
    </LayoutBlock>
  );
};
