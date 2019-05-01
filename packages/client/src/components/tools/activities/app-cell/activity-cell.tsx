import * as React from 'react';
import classnames from 'classnames';
import { TypographySize, DodayColors, Space } from '@lib/common-interfaces';
import { Text, Icons } from '@components';
import { Marker } from '@root/components/shared/_atoms/marker';
import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';
import { Activity } from '@root/lib/models/entities/Activity';
import { durationToMinutes } from '@root/lib/utils';

const css = require('./activity-cell.module.scss');

interface ActivityCellProps {
  doday: Activity;
  active?: boolean;
  onClick?: (route: string, doday: Activity) => void;
}

export const ActivityCell: React.SFC<ActivityCellProps> = ({
  doday,
  active = false,
  onClick,
}) => {
  const classNames = classnames({
    [css.cell]: true,
    [css.padded]: true,
    [css.active]: active,
  });

  return (
    <li
      className={classNames}
      key={doday.did}
      onClick={() => onClick && onClick(`/activities/${doday.did}`, doday)}
    >
      <LayoutBlock spaceAbove={Space.XSmall} flex="1" direction="column">
        <Text
          spaceLeft={Space.Small}
          wordwrap
          size={TypographySize.m}
          className={css.cellTitle}
        >
          {doday.name}
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
            text={doday.activityType}
            size={TypographySize.s}
          />
          <Marker
            bordered
            rounded
            color={DodayColors.blueLight}
            text={String(Math.floor(durationToMinutes(doday.duration) / 60))}
            size={TypographySize.s}
          />
        </LayoutBlock>
      </LayoutBlock>
    </li>
  );
};
