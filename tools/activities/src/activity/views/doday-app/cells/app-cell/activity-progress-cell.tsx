import * as React from 'react';
import * as moment from 'moment';
import * as classnames from 'classnames';
import {
  CellProps,
  Space,
  Activity,
  durationToLabel,
  durationToMinutes,
} from '@doday/lib';
import { Checkbox, Icons, LayoutBlock, Progress } from '@doday/shared';
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

export interface ActivityProgressCellProps {
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
        [classes.pinned]: doday.progress!.pinned,
      });

      return (
        <ListItem
          className={classes.listItemContainer}
          onClick={() =>
            onClick && onClick(`/dashboard/progress/${activity.did}`, activity)
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
          <LayoutBlock
            flex="1"
            spaceLeft={Space.XSmall}
            spaceAbove={Space.XSmall}
            spaceBelow={Space.XSmall}
            spaceRight={Space.XSmall}
          >
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
          </LayoutBlock>
          <LayoutBlock absolute bottom="0" right="2.6rem">
            <Typography className={classes.timeLabel} variant="caption">
              {durationToLabel(activity.duration!, {
                hour: t('shell:time.h'),
                minute: t('shell:time.m'),
              })}
            </Typography>
          </LayoutBlock>
          <LayoutBlock absolute top="0" bottom="0" right="17px">
            <Progress
              vertical
              progress={durationToMinutes(activity.duration!)}
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
            {doday.progress!.pinned && <Icons.Pin width={1.6} height={1.6} />}
          </LayoutBlock>
        </ListItem>
      );
    }
  )
);
