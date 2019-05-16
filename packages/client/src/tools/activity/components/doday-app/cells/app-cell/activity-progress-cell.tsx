import * as React from 'react';
import classnames from 'classnames';
import { TypographySize, DodayColors, CellProps } from '@lib/common-interfaces';
import { Checkbox, Text } from '@shared';
import { Marker } from '@root/components/shared/_atoms/marker';
import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';
import { Activity } from '@root/tools/activity/entities/activity';
import { activityIconByType } from '../../../builders/activity-builder';

const vars = require('@styles/_config.scss');
const css = require('./activity-progress-cell.module.scss');

interface ActivityProgressCellProps {
  onComplete?: () => void;
}

export const ActivityProgressCell: React.FC<
  ActivityProgressCellProps & CellProps
> = ({ doday, active = false, onClick, onComplete }) => {
  const classNames = classnames({
    [css.cell]: true,
    [css.completed]: doday.progress && doday.progress.completed,
    [css.padded]: true,
    [css.active]: active,
  });

  const activity = doday as Activity;

  return (
    <li
      className={classNames}
      key={activity.did}
      onClick={() => onClick && onClick(`/progress/${activity.did}`, activity)}
    >
      {
        <Checkbox
          // colorMarker={doday.relatedGoal && doday.relatedGoal.color}
          onClick={e => {
            e.stopPropagation();
            if (onComplete) {
              onComplete();
            }
          }}
          checked={activity.progress && activity.progress.completed}
        />
      }
      <Text wordwrap size={TypographySize.s} className={css.cellTitle}>
        {activity.name}
      </Text>
      <LayoutBlock absolute top="0" right="0">
        {activityIconByType(activity.activityType, undefined, vars.gray8)}
      </LayoutBlock>
    </li>
  );
};
