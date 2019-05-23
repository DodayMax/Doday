import * as React from 'react';
import classnames from 'classnames';
import {
  TypographySize,
  CellProps,
  TypographyColor,
} from '@lib/common-interfaces';
import { Checkbox, Text } from '@shared';
import { Marker } from '@root/components/shared/_atoms/marker';
import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';
import { Activity } from '@root/tools/activity/entities/activity';
import { activityIconByType } from '../../../builders/activity-builder';
import { durationToLabel, durationToMinutes } from '@root/lib/utils';
import { Progress } from '@root/components/shared/_atoms/progress/progress';
import { WithTranslation, withTranslation } from 'react-i18next';
import { ListItem, ListItemText } from '@material-ui/core';

const vars = require('@styles/_config.scss');
const css = require('./activity-progress-cell.module.scss');

interface ActivityProgressCellProps {
  onComplete?: () => void;
}

type Props = ActivityProgressCellProps & CellProps & WithTranslation;

export const ActivityProgressCell = withTranslation('activities')(
  ({ doday, active = false, onClick, onComplete, t }: Props) => {
    const classNames = classnames({
      [css.cell]: true,
      [css.completed]: doday.progress && doday.progress.completed,
      [css.padded]: true,
      [css.active]: active,
    });

    const activity = doday as Activity;

    return (
      <ListItem
        onClick={() =>
          onClick && onClick(`/progress/${activity.did}`, activity)
        }
      >
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
        <ListItemText primary={activity.name} secondary="July 20, 2014" />
        <LayoutBlock absolute top="0.4rem" right="1rem">
          {activityIconByType(activity.activityType, undefined, vars.gray7)}
        </LayoutBlock>
        <LayoutBlock absolute bottom="0.4rem" right="1rem">
          <Text size={TypographySize.xxs} color={TypographyColor.Disabled}>
            {durationToLabel(activity.duration, {
              hour: t('time.h'),
              minute: t('time.m'),
            })}
          </Text>
        </LayoutBlock>
        <LayoutBlock absolute top="0" bottom="0" left="0">
          <Progress
            vertical
            progress={durationToMinutes(activity.duration)}
            total={8 * 60}
          />
        </LayoutBlock>
      </ListItem>
    );
  }
);
