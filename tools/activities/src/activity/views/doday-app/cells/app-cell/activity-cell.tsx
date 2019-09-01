import * as React from 'react';
import classnames from 'classnames';
import {
  Space,
  CellProps,
  Activity,
  durationToMinutes,
  durationToLabel,
} from '@doday/lib';
import { Icons, LayoutBlock, Progress } from '@doday/shared';
import { WithTranslation, withTranslation } from 'react-i18next';
import {
  ListItem,
  ListItemText,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';

import { css } from './css.cell';

interface ActivityCellProps {}

type Props = ActivityCellProps & CellProps & WithTranslation & WithStyles;

export const ActivityCell = withStyles(css)(
  withTranslation('activities')(
    ({ doday, active = false, onClick, classes, t }: Props) => {
      const activity = doday as Activity;

      const cx = classnames(classes.listItemContainer, classes.padded);

      return (
        <ListItem
          className={cx}
          onClick={() =>
            onClick && onClick(`/dashboard/dodays/${activity.did}`, activity)
          }
        >
          <ListItemText
            primary={activity.name}
            secondary="July 20, 2014"
            className={classes.name}
          />
          <LayoutBlock absolute bottom="0" right="2.6rem">
            <Typography className={classes.timeLabel} variant="body2">
              {durationToLabel(activity.duration!, {
                hour: t('shell:time.h'),
                minute: t('shell:time.m'),
              })}
            </Typography>
          </LayoutBlock>
          <LayoutBlock
            align="flexEnd"
            spaceRight={Space.XSmall}
            valign="vflexCenter"
          >
            <Typography variant="body1" className={classes.paddedLabel}>
              {activity.rate || 0}
            </Typography>
            <Icons.Score color="primary" width={2} height={2} />
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
            top="0"
            right="0"
            bottom="0"
            className={classes.scrollContainer}
          />
        </ListItem>
      );
    }
  )
);
