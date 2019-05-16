import * as React from 'react';
import classnames from 'classnames';
import {
  TypographySize,
  DodayColors,
  Space,
  CellProps,
} from '@lib/common-interfaces';
import { Text, Icons } from '@shared';
import { Marker } from '@root/components/shared/_atoms/marker';
import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';
import { durationToMinutes } from '@root/lib/utils';
import { Activity } from '@root/tools/activity/entities/activity';

const css = require('./activity-cell.module.scss');

interface ActivityCellProps {}

export const ActivityCell: React.FC<ActivityCellProps & CellProps> = ({
  doday,
  active = false,
  onClick,
}) => {
  const classNames = classnames({
    [css.cell]: true,
    [css.padded]: true,
    [css.active]: active,
  });

  const activity = doday as Activity;

  return (
    <li
      className={classNames}
      key={activity.did}
      onClick={() => onClick && onClick(`/dodays/${activity.did}`, activity)}
    >
      <LayoutBlock spaceAbove={Space.XSmall} flex="1" direction="column">
        <Text
          spaceLeft={Space.Small}
          wordwrap
          size={TypographySize.m}
          className={css.cellTitle}
        >
          {activity.name}
        </Text>
        <LayoutBlock
          align="flex-end"
          spaceRight={Space.XSmall}
          valign="vflex-center"
        >
          <Text spaceRight={Space.XXSmall} size={TypographySize.s}>
            {24}
          </Text>
          <Icons.Score width={16} height={16} />
        </LayoutBlock>
        <LayoutBlock
          className={css.markersContainer}
          spaceAbove={Space.XSmall}
          paddingLeft={Space.XSmall}
          paddingRight={Space.XSmall}
          paddingAbove={Space.XXSmall}
          paddingBelow={Space.XXSmall}
          align="space-between"
        >
          <Marker
            bordered
            rounded
            color={DodayColors.gray4}
            text={activity.activityType}
            size={TypographySize.s}
          />
          <Marker
            bordered
            rounded
            color={DodayColors.blueLight}
            text={String(Math.floor(durationToMinutes(activity.duration) / 60))}
            size={TypographySize.s}
          />
        </LayoutBlock>
      </LayoutBlock>
    </li>
  );
};
