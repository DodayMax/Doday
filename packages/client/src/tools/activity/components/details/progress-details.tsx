import * as React from 'react';
import * as cuid from 'cuid';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Space } from '@root/lib/common-interfaces';
import { Page, PageHeader } from '@shared/_molecules/page';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '@root/lib/models';
import { Icons, CustomDatePicker } from '@shared';
import { actions as dodaysApiActions } from '@ducks/api/dodays-api-actions';
import { actions as dodaysActions } from '@ducks/doday-app';
import { actions as dodayDetailsActions } from '@ducks/doday-details';
import {
  youtubeIDFromURL,
  durationToLabel,
  durationToMinutes,
  isDirty,
} from '@root/lib/utils';
import { LayoutBlock } from '@shared/_atoms/layout-block';
import {
  FetchSelectedDodayAction,
  ClearSelectedDodayAction,
  RequestForSetUpdatesAction,
  ClearDodayDetailsDirtyStuffAction,
} from '@root/ducks/doday-details/actions';
import { Pageflow } from '@root/components/shared/_support/pageflow';
import {
  UpdateDodayAction,
  DeleteDodayAction,
  UntakeDodayAction,
} from '@root/ducks/api/dodays-api-actions/actions';
import { DodayType, ProgressLike, DodayLike } from '@root/tools/types';
import { Activity, deserializeActivityProgress } from '../../entities/activity';
import { activityIconByType } from '../builders/activity-builder';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Resource } from '@root/lib/models/entities/resource';
import ScheduleIcon from '@material-ui/icons/Schedule';
import HourGlassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  MenuItem,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { config } from '@root/styles/config';
import { utils } from '@root/styles/utils';

const css = (theme: Theme) =>
  createStyles({
    input: {
      fontSize: `${config.typographySizes.bodyM}rem`,
      paddingLeft: `${config.spacing.spaceS}px`,
    },
    dodayName: {
      paddingLeft: `${config.spacing.spaceM}px`,
    },
    resourceDescription: utils.paddingTop(config.spacing.spaceL),
    resourceStatusIcon: {
      height: '1.6rem',
      paddingLeft: '0.4rem',
    },
    completed: {
      color: theme.palette.text.secondary,
    },
    videoWrapper: {
      position: 'relative',
      paddingBottom: '56.25%' /* 16:9 */,
      margin: '3rem 0 0 0',
      height: 0,
      '& iframe': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
    },
    delete: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.error.dark,
      '&:focus': {
        backgroundColor: theme.palette.error.dark,
      },
      '&:hover': {
        backgroundColor: theme.palette.error.main,
      },
    },
  });

interface ActivityProgressDetailsProps {}

interface ActivityProgressDetailsState {}

interface PropsFromConnect {
  dirty: boolean;
  updates: Partial<ProgressLike>;
  loading: boolean;
  myDID?: string;
  selectedDoday: Activity;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  requestForSetUpdatesActionCreator(
    progress?: Partial<ProgressLike>
  ): RequestForSetUpdatesAction;
  updateDodayActionCreator(payload: {
    did: string;
    type: DodayType;
    updates: {
      doday?: Partial<DodayLike>;
      progress?: Partial<ProgressLike>;
      resource?: Partial<Resource>;
    };
  }): UpdateDodayAction;
  deleteDodayActionCreator(payload: {
    did: string;
    type: DodayType;
  }): DeleteDodayAction;
  untakeDodayActionCreator(payload: {
    did: string;
    type: DodayType;
  }): UntakeDodayAction;
  clearSelectedDodayActionCreator: () => ClearSelectedDodayAction;
  clearDodayDetailsDirtyStuffActionCreator(): ClearDodayDetailsDirtyStuffAction;
}

@(withRouter as any)
@Pageflow({ path: '/progress/:did' })
export class ActivityProgressDetailsComponentClass extends React.Component<
  ActivityProgressDetailsProps &
    Partial<PropsFromConnect> &
    Partial<RouteComponentProps<any>> &
    WithTranslation &
    WithStyles,
  ActivityProgressDetailsState
> {
  componentWillUnmount() {
    this.props.clearSelectedDodayActionCreator();
    this.props.clearDodayDetailsDirtyStuffActionCreator();
  }

  getYouTubeLink = (resource: Resource) => {
    if (resource && resource.provider === 'YouTube') {
      const youtubeID = youtubeIDFromURL(resource.url);
      if (youtubeID) {
        return `https://www.youtube.com/embed/${youtubeID}`;
      }
    }
  };

  isOwner = () => {
    const { selectedDoday, myDID } = this.props;
    return (
      selectedDoday.owner.did && myDID && selectedDoday.owner.did === myDID
    );
  };

  actions = () => {
    const { history, selectedDoday, classes, t } = this.props;

    const actions = [];

    // Add untake action for public dodays
    if (selectedDoday.public) {
      actions.push(
        <MenuItem
          key={cuid()}
          onClick={() => {
            this.props.untakeDodayActionCreator({
              did: selectedDoday.did,
              type: selectedDoday.type,
            });
            history.push('/');
          }}
        >
          {t('activities:details.actions.untake')}
        </MenuItem>
      );
    }

    // Add owner actions
    if (this.isOwner) {
      actions.push(
        <MenuItem
          key={cuid()}
          onClick={() => {
            this.props.deleteDodayActionCreator({
              did: selectedDoday.did,
              type: selectedDoday.type,
            });
            history.push('/');
          }}
          className={classes.delete}
        >
          {t('activities:details.actions.delete')}
        </MenuItem>
      );
    }

    return actions;
  };

  status = () => {
    const { selectedDoday, classes, t } = this.props;
    const markers = [
      activityIconByType(selectedDoday.activityType, 30, undefined, 'right'),
    ];
    if (selectedDoday.progress && selectedDoday.progress.completed) {
      markers.push(
        <Typography variant="body1" className={classes.completed}>{`${t(
          'activities:details.status.completed'
        )}: ${moment(selectedDoday.progress.completedAt).format(
          'll'
        )}`}</Typography>
      );
    }
    if (selectedDoday.resource && selectedDoday.resource.icon) {
      markers.push(
        <img
          onError={ev => {
            (ev.target as HTMLImageElement).src = '';
          }}
          key={cuid()}
          className={classes.resourceStatusIcon}
          src={selectedDoday.resource.icon}
        />
      );
    }
    return markers;
  };

  render() {
    const { dirty, updates, selectedDoday, loading, classes, t } = this.props;

    const resource = selectedDoday && selectedDoday.resource;
    const preview = resource && resource.image;
    const youtubeLink = this.getYouTubeLink(resource);

    const dateIsLocked =
      updates && updates.dateIsLocked != null
        ? updates.dateIsLocked
        : selectedDoday &&
          selectedDoday.progress &&
          selectedDoday.progress.dateIsLocked;

    return (
      <Page
        header={
          <PageHeader
            withClose
            status={selectedDoday && this.status()}
            actions={selectedDoday && this.actions()}
          >
            {dirty && (
              <Button
                key={cuid()}
                color="primary"
                variant="contained"
                disabled={!dirty}
                onClick={() => {
                  this.props.updateDodayActionCreator({
                    did: selectedDoday.did,
                    type: selectedDoday.type,
                    updates: {
                      progress: updates,
                    },
                  });
                }}
              >
                {loading
                  ? t('activities:details.actions.saving')
                  : t('activities:details.actions.save')}
              </Button>
            )}
          </PageHeader>
        }
      >
        {selectedDoday && selectedDoday.progress ? (
          <>
            <LayoutBlock
              paddingAbove={Space.Small}
              paddingBelow={Space.Small}
              insideElementsMargin
            >
              {!selectedDoday.progress.completed && (
                <>
                  <LayoutBlock
                    valign="vflexCenter"
                    className={classes.dateContainer}
                  >
                    <CustomDatePicker
                      withLocker
                      isLocked={dateIsLocked}
                      onLocked={() => {
                        this.props.requestForSetUpdatesActionCreator({
                          dateIsLocked: !dateIsLocked,
                        });
                      }}
                      borderless
                      minDate={new Date()}
                      icon={<ScheduleIcon />}
                      selected={
                        (updates && updates.date && new Date(updates.date)) ||
                        (selectedDoday &&
                          selectedDoday.progress &&
                          selectedDoday.progress.date)
                      }
                      tooltip={t('activities:builder.lockDateTooltip')}
                      onChange={date => {
                        const dateDirty =
                          moment(date).format('ll') !==
                          moment(selectedDoday.progress.date).format('ll');
                        this.props.requestForSetUpdatesActionCreator({
                          date: dateDirty ? date : undefined,
                        });
                      }}
                    />
                  </LayoutBlock>
                </>
              )}
              {selectedDoday.duration && (
                <LayoutBlock insideElementsMargin valign="vflexCenter">
                  <HourGlassEmptyIcon />
                  <Typography variant="h6">
                    {durationToLabel(selectedDoday.duration, {
                      hour: t('shell:time.h'),
                      minute: t('shell:time.m'),
                    })}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {`(
                    ${t('activities:details.status.percentOfTheDay', {
                      percent: Math.round(
                        (durationToMinutes(selectedDoday.duration) / (8 * 60)) *
                          100
                      ),
                    })}
                    )`}
                  </Typography>
                </LayoutBlock>
              )}
            </LayoutBlock>
            <LayoutBlock spaceAbove={Space.XSmall} valign="vflexCenter">
              <IconButton
                onClick={() => {
                  this.props.updateDodayActionCreator({
                    did: selectedDoday.did,
                    type: selectedDoday.type,
                    updates: {
                      progress: {
                        completed: !selectedDoday.progress.completed,
                      },
                    },
                  });
                }}
              >
                <Icons.Checkbox
                  width={50}
                  height={50}
                  checked={
                    selectedDoday &&
                    selectedDoday.progress &&
                    selectedDoday.progress.completed
                  }
                />
              </IconButton>
              <Typography variant="h3" className={classes.dodayName}>
                {selectedDoday.name}
              </Typography>
            </LayoutBlock>
            {youtubeLink ? (
              <div
                className={classes.videoWrapper}
                style={{
                  background: `url(${preview})`,
                  backgroundSize: 'contain',
                }}
              >
                <iframe
                  frameBorder="0"
                  src={youtubeLink}
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : preview ? (
              <div
                className={classes.videoWrapper}
                style={{
                  background: `url(${preview})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            ) : null}
            <Typography variant="body1" className={classes.resourceDescription}>
              {resource && resource.description}
            </Typography>
            {!youtubeLink && (resource && resource.url) ? (
              <LayoutBlock
                spaceAbove={Space.Large}
                spaceBelow={Space.Small}
                align="flexCenter"
              >
                <Button
                  color="primary"
                  variant="contained"
                  href={resource.url}
                  target="_blank"
                >
                  {t('activities:details.actions.goToResource')}
                </Button>
              </LayoutBlock>
            ) : null}
          </>
        ) : null}
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  dirty: state.dodayDetails.dirty,
  updates: state.dodayDetails.updates,
  loading: state.dodayDetails.loading,
  myDID: state.auth.hero && state.auth.hero.did,
  selectedDoday: state.dodayDetails.selectedDoday,
});

export const ActivityProgressDetails = connect(
  mapState,
  {
    ...dodaysActions,
    ...dodayDetailsActions,
    ...dodaysApiActions,
  }
)(
  withStyles(css)(
    withTranslation(['shell', 'activities'])(
      ActivityProgressDetailsComponentClass
    )
  )
);
