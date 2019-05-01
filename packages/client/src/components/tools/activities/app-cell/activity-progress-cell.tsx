import * as React from 'react';
import classnames from 'classnames';
import { TypographySize, DodayColors } from '@lib/common-interfaces';
import { Checkbox, Text } from '@components';
import { AnyAction } from 'redux';
import { Marker } from '@root/components/shared/_atoms/marker';
import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';
import { Activity, ActivityProgress } from '@root/lib/models/entities/Activity';

const css = require('./activity-cell.module.scss');

interface ActivityProgressCellProps {
  doday: ActivityProgress;
  active?: boolean;
  onClick?: (route: string, doday: ActivityProgress) => void;
  onComplete?: (doday: Activity) => AnyAction;
}

export const ActivityProgressCell: React.SFC<ActivityProgressCellProps> = ({
  doday,
  active = false,
  onClick,
  onComplete,
}) => {
  const classNames = classnames({
    [css.cell]: true,
    [css.completed]: doday.completed,
    [css.padded]: true,
    [css.active]: active,
  });

  const origin = doday.origin as Activity;

  return (
    <li
      className={classNames}
      key={origin.did}
      onClick={() => onClick && onClick(`/progress/${origin.did}`, doday)}
    >
      {
        <Checkbox
          // colorMarker={doday.relatedGoal && doday.relatedGoal.color}
          onClick={e => {
            e.stopPropagation();
            if (onComplete) {
              onComplete(origin as Activity);
            }
          }}
          checked={doday.completed}
        />
      }
      <Text wordwrap size={TypographySize.s} className={css.cellTitle}>
        {origin.name}
      </Text>
      <LayoutBlock absolute top="0" right="0">
        <Marker
          color={DodayColors.gray4}
          text={origin.activityType}
          size={TypographySize.s}
        />
      </LayoutBlock>
    </li>
  );
};
