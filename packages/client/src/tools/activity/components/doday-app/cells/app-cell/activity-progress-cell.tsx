import * as React from 'react';
import * as moment from 'moment';
import * as classnames from 'classnames';
import { CellProps } from '@lib/common-interfaces';
import { Checkbox, Icons } from '@shared';
import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';
import { durationToLabel, durationToMinutes } from '@root/lib/utils';
import { Progress } from '@root/components/shared/_atoms/progress/progress';
import { WithTranslation, withTranslation } from 'react-i18next';
import {
  ListItem,
  ListItemText,
  Typography,
  withStyles,
  WithStyles,
  IconButton,
} from '@material-ui/core';

import { css } from './css.cell';
import { Activity } from '@root/lib/models/entities/activity';

interface ActivityProgressCellProps {
  onComplete?: () => void;
}

type Props = ActivityProgressCellProps &
  CellProps &
  WithTranslation &
  WithStyles;

export const ActivityProgressCell = withTranslation(['shell', 'activities'])(
  withStyles(css)(
    ({ doday, active = false, onClick, onComplete, classes, t }: Props) => {
      const activity = doday as Activity;

      const cx = classnames({
        [classes.scrollContainer]: true,
        [classes.pinned]: doday.progress.pinned,
      });

      return (
        <ListItem
          className={classes.listItemContainer}
          onClick={() =>
            onClick && onClick(`/progress/${activity.did}`, activity)
          }
        >
          <IconButton
            onClick={e => {
              e.stopPropagation();
              if (onComplete) {
                onComplete();
              }
            }}
            className={classes.checkboxIconButton}
          >
            <Checkbox
              checked={activity.progress && activity.progress.completed}
            />
          </IconButton>
          <ListItemText
            primary={activity.name}
            secondary={
              activity.progress && activity.progress.completed
                ? moment(activity.progress.completedAt).format('ll')
                : ''
            }
            primaryTypographyProps={{
              variant: 'caption',
            }}
            secondaryTypographyProps={{
              variant: 'caption',
            }}
            className={classes.name}
          />
          <LayoutBlock absolute bottom="0" right="2.6rem">
            <Typography className={classes.timeLabel} variant="caption">
              {durationToLabel(activity.duration, {
                hour: t('shell:time.h'),
                minute: t('shell:time.m'),
              })}
            </Typography>
          </LayoutBlock>
          <LayoutBlock absolute top="0" bottom="0" right="17px">
            <Progress
              vertical
              progress={durationToMinutes(activity.duration)}
              total={8 * 60}
            />
          </LayoutBlock>
          <LayoutBlock
            absolute
            align="flexCenter"
            valign="vflexEnd"
            top="0"
            right="0"
            bottom="0"
            className={cx}
          >
            {doday.progress.pinned && <Icons.Pin width={1.6} height={1.6} />}
          </LayoutBlock>
        </ListItem>
      );
    }
  )
);
