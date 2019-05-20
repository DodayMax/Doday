import * as React from 'react';
import classnames from 'classnames';
import {
  TypographySize,
  DodayColor,
  Space,
  CellProps,
} from '@lib/common-interfaces';
import { Text, Icons } from '@shared';
import { Marker } from '@root/components/shared/_atoms/marker';
import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';
import { durationToMinutes } from '@root/lib/utils';
import { Activity } from '@root/tools/activity/entities/activity';
import { WithTranslation, withTranslation } from 'react-i18next';

const css = require('./activity-cell.module.scss');

interface ActivityCellProps {}

type Props = ActivityCellProps & CellProps & WithTranslation;

export const ActivityCell = withTranslation('activities')(
  ({ doday, active = false, onClick, t }: Props) => {
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
              color={DodayColor.gray4}
              text={t(`activityType.${activity.activityType}`)}
              size={TypographySize.s}
            />
            <Marker
              bordered
              rounded
              color={DodayColor.blueLight}
              text={String(
                Math.floor(durationToMinutes(activity.duration) / 60)
              )}
              size={TypographySize.s}
            />
          </LayoutBlock>
        </LayoutBlock>
      </li>
    );
  }
);
