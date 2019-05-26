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
import {
  ListItem,
  ListItemText,
  Divider,
  Typography,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  IconButton,
} from '@material-ui/core';

const vars = require('@styles/_config.scss');

const styles = (theme: Theme) =>
  createStyles({
    listItemContainer: {
      cursor: 'pointer',
      padding: '6px',
      '&:hover': {
        background:
          theme.palette.type === 'dark'
            ? theme.palette.grey[800]
            : theme.palette.grey[200],
      },
    },
    name: {
      paddingLeft: '6px',
    },
    timeLabel: {
      color:
        theme.palette.type === 'dark'
          ? theme.palette.grey[700]
          : theme.palette.grey[400],
    },
    scrollContainer: {
      width: '17px',
      flex: 1,
      background:
        theme.palette.type === 'dark'
          ? theme.palette.grey[800]
          : theme.palette.grey[100],
    },
    checkboxIconButton: {
      padding: '6px',
    },
  });

interface ActivityProgressCellProps {
  onComplete?: () => void;
}

type Props = ActivityProgressCellProps &
  CellProps &
  WithTranslation &
  WithStyles;

export const ActivityProgressCell = withTranslation(['shell', 'activities'])(
  withStyles(styles)(
    ({ doday, active = false, onClick, onComplete, classes, t }: Props) => {
      const activity = doday as Activity;

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
