import * as React from 'react';
import classnames from 'classnames';
import { Space, CellProps } from '@lib/common-interfaces';
import { Icons } from '@shared';
import { LayoutBlock } from '@root/components/shared/_atoms/layout-block';
import { durationToMinutes, durationToLabel } from '@root/lib/utils';
import { Activity } from '@root/tools/activity/entities/activity';
import { WithTranslation, withTranslation } from 'react-i18next';
import {
  ListItem,
  ListItemText,
  Typography,
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { Progress } from '@root/components/shared/_atoms/progress/progress';

import { css } from './cell.styles';

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
            onClick && onClick(`/dodays/${activity.did}`, activity)
          }
        >
          <ListItemText
            primary={activity.name}
            secondary="July 20, 2014"
            className={classes.name}
          />
          <LayoutBlock absolute bottom="0" right="2.6rem">
            <Typography className={classes.timeLabel} variant="body2">
              {durationToLabel(activity.duration, {
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
            <Typography variant="body1">{24}</Typography>
            <Icons.Score width={16} height={16} color={'white'} />
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
