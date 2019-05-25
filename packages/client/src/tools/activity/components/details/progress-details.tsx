import * as React from 'react';
import * as cuid from 'cuid';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Space, DodayColor } from '@root/lib/common-interfaces';
import { Page, PageHeader } from '@shared/_molecules/page';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '@root/lib/models';
import { Icons } from '@shared';
import { actions as dodaysApiActions } from '@ducks/api/dodays-api-actions';
import { actions as dodaysActions } from '@ducks/doday-app';
import { actions as dodayDetailsActions } from '@ducks/doday-details';
import { Marker } from '@shared/_atoms/marker';
import {
  youtubeIDFromURL,
  durationToLabel,
  durationToMinutes,
} from '@root/lib/utils';
import { LayoutBlock } from '@shared/_atoms/layout-block';
import {
  FetchSelectedDodayAction,
  ClearSelectedDodayAction,
  SetDirtyStatusAction,
  RequestForSetUpdatesAction,
} from '@root/ducks/doday-details/actions';
import { Pageflow } from '@root/components/shared/_support/pageflow';
import {
  UpdateDodayAction,
  DeleteDodayAction,
  UntakeDodayAction,
} from '@root/ducks/api/dodays-api-actions/actions';
import {
  DodayType,
  SerializedProgressLike,
  SerializedDodayLike,
  ProgressLike,
} from '@root/tools/types';
import { Activity, deserializeActivityProgress } from '../../entities/activity';
import { activityIconByType } from '../builders/activity-builder';
import { withTranslation, WithTranslation } from 'react-i18next';
import {
  SerializedResource,
  Resource,
} from '@root/lib/models/entities/resource';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HourGlassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  MenuItem,
  TextField,
  Tooltip,
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
  loading: boolean;
  dirty?: boolean;
  updates: Partial<SerializedProgressLike>;
  myDID?: string;
  selectedDoday: Activity;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  updateDodayActionCreator(
    did: string,
    type: DodayType,
    updates: {
      doday?: Partial<SerializedDodayLike>;
      progress?: Partial<SerializedProgressLike>;
      resource?: Partial<SerializedResource>;
    }
  ): UpdateDodayAction;
  deleteDodayActionCreator: ({
    did: string,
    type: DodayType,
  }) => DeleteDodayAction;
  untakeDodayActionCreator: ({
    did: string,
    type: DodayType,
  }) => UntakeDodayAction;
  setDirtyStatusActionCreator: (status: boolean) => SetDirtyStatusAction;
  requestForSetUpdatesActionCreator(
    progress: Partial<SerializedProgressLike>,
    deserialize: (progress: SerializedProgressLike) => ProgressLike
  ): RequestForSetUpdatesAction;
  clearSelectedDodayActionCreator: () => ClearSelectedDodayAction;
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

  onRequestClose = () => {
    this.props.clearSelectedDodayActionCreator();
  };

  private handleChangeDate = e => {
    const dateDirty =
      moment(e.target.value).format('YYYY-MM-DD') !==
      moment(this.props.selectedDoday.progress.date).format('YYYY-MM-DD');
    this.props.requestForSetUpdatesActionCreator(
      {
        date: dateDirty ? new Date(e.target.value).getTime() : undefined,
      },
      deserializeActivityProgress
    );
  };

  render() {
    const { updates, selectedDoday, loading, dirty, classes, t } = this.props;

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
            onClose={this.onRequestClose}
          >
            {dirty && (
              <Button
                key={cuid()}
                color="primary"
                variant="contained"
                disabled={!dirty}
                onClick={() => {
                  this.props.updateDodayActionCreator(
                    selectedDoday.did,
                    selectedDoday.type,
                    {
                      progress: updates,
                    }
                  );
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
                    <ScheduleIcon />
                    <TextField
                      id="date"
                      type="date"
                      value={
                        (updates &&
                          updates.date &&
                          moment(updates.date).format('YYYY-MM-DD')) ||
                        (selectedDoday &&
                          selectedDoday.progress &&
                          moment(selectedDoday.progress.date).format(
                            'YYYY-MM-DD'
                          ))
                      }
                      onChange={this.handleChangeDate}
                      InputProps={{
                        classes: {
                          input: classes.input,
                        },
                      }}
                      InputLabelProps={{
                        FormLabelClasses: {
                          root: classes.inputLabel,
                        },
                      }}
                    />
                    <Tooltip
                      title={
                        <Typography variant="body1">
                          {t('activities:builder.lockDateTooltip')}
                        </Typography>
                      }
                      placement="top"
                      className={classes.tooltip}
                    >
                      <IconButton
                        onClick={() =>
                          this.props.requestForSetUpdatesActionCreator(
                            {
                              dateIsLocked: !dateIsLocked,
                            },
                            deserializeActivityProgress
                          )
                        }
                      >
                        {dateIsLocked ? (
                          <LockIcon color="primary" />
                        ) : (
                          <LockOpenIcon />
                        )}
                      </IconButton>
                    </Tooltip>
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
                  this.props.updateDodayActionCreator(
                    selectedDoday.did,
                    selectedDoday.type,
                    {
                      progress: {
                        completed: !selectedDoday.progress.completed,
                      },
                    }
                  );
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
  loading: state.dodayDetails.loading,
  dirty: state.dodayDetails.dirty,
  updates: state.dodayDetails.updates,
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
  withTranslation(['shell', 'activities'])(
    withStyles(css)(ActivityProgressDetailsComponentClass)
  )
);
