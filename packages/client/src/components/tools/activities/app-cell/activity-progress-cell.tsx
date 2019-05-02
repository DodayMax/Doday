import * as React from 'react';
import classnames from 'classnames';
import { TypographySize, DodayColors } from '@lib/common-interfaces';
import { Checkbox, Text } from '@components';
import { AnyAction } from 'redux';
import { Marker } from '@root/components/shared/_atoms/marker';
import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';
import { Activity } from '@root/lib/models/entities/Activity';

const css = require('./activity-cell.module.scss');

interface ActivityProgressCellProps {
  doday: Activity;
  active?: boolean;
  onClick?: (route: string, doday: Activity) => void;
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
    [css.completed]: doday.progress && doday.progress.completed,
    [css.padded]: true,
    [css.active]: active,
  });

  return (
    <li
      className={classNames}
      key={doday.did}
      onClick={() => onClick && onClick(`/progress/${doday.did}`, doday)}
    >
      {
        <Checkbox
          // colorMarker={doday.relatedGoal && doday.relatedGoal.color}
          onClick={e => {
            e.stopPropagation();
            if (onComplete) {
              onComplete(doday);
            }
          }}
          checked={doday.progress && doday.progress.completed}
        />
      }
      <Text wordwrap size={TypographySize.s} className={css.cellTitle}>
        {doday.name}
      </Text>
      <LayoutBlock absolute top="0" right="0">
        <Marker
          color={DodayColors.gray4}
          text={doday.activityType}
          size={TypographySize.s}
        />
      </LayoutBlock>
    </li>
  );
};
