import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as cuid from 'cuid';
import * as _ from 'lodash';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  Space,
  youtubeIDFromURL,
  durationToLabel,
  durationToMinutes,
  Resource,
  ProgressLike,
  DodayType,
  Activity,
  RootState,
} from '@doday/lib';
import {
  Page,
  PageHeader,
  Pageflow,
  PageWrapperChildContext,
  LayoutBlock,
  CustomDatePicker,
  Icons,
} from '@doday/shared';
import ducks, {
  FetchSelectedDodayAction,
  ClearSelectedDodayAction,
  RequestForSetUpdatesAction,
  ClearDodayDetailsDirtyStuffAction,
  TakeDodayAction,
  UntakeDodayAction,
} from '@doday/duck';
import { activityIconByType } from '../builders/activity-builder';
import ScheduleIcon from '@material-ui/icons/Schedule';
import HourGlassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {
  Card,
  Typography,
  Button,
  WithStyles,
  withStyles,
  WithTheme,
  withTheme,
} from '@material-ui/core';

import { css } from './css.details';
import Media from 'react-media';

export interface ActivityDetailsProps {
  t?: any;
}

interface ActivityDetailsState {}

export interface PropsFromConnect {
  loading: boolean;
  updates?: Partial<ProgressLike>;
  myDID?: string;
  selectedDoday: Activity;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  requestForSetUpdatesActionCreator(
    progress?: Partial<ProgressLike>
  ): RequestForSetUpdatesAction;
  takeDodayActionCreator(payload: {
    doday: Activity;
    progress: Partial<ProgressLike>;
  }): TakeDodayAction;
  untakeDodayActionCreator(payload: {
    did: string;
    type: DodayType;
  }): UntakeDodayAction;
  clearSelectedDodayActionCreator: () => ClearSelectedDodayAction;
  clearDodayDetailsDirtyStuffActionCreator(): ClearDodayDetailsDirtyStuffAction;
}

type Props = ActivityDetailsProps &
  Partial<PropsFromConnect> &
  Partial<RouteComponentProps<any>> &
  WithStyles &
  WithTheme;

@(withRouter as any)
@Pageflow({ path: '/dashboard/dodays/:did' })
export class ActivityDetailsComponentClass extends React.Component<
  Props,
  ActivityDetailsState
> {
  public static contextTypes = {
    requestClose: PropTypes.func,
  };

  public context!: PageWrapperChildContext;

  componentWillUnmount() {
    this.props.clearSelectedDodayActionCreator!();
    this.props.clearDodayDetailsDirtyStuffActionCreator!();
  }

  getYouTubeLink = (resource?: Resource) => {
    if (resource && resource.provider === 'YouTube') {
      const youtubeID = youtubeIDFromURL(resource.url || '');
      if (youtubeID) {
        return `https://www.youtube.com/embed/${youtubeID}`;
      }
    }
  };

  isOwner = () => {
    const { selectedDoday, myDID } = this.props;
    return (
      selectedDoday &&
      selectedDoday.owner!.did &&
      myDID &&
      selectedDoday.owner!.did === myDID
    );
  };

  status = () => {
    const { selectedDoday, classes } = this.props;
    const markers = [
      activityIconByType(selectedDoday!.activityType, 30, undefined, 'right'),
    ];
    if (
      selectedDoday &&
      selectedDoday.resource &&
      selectedDoday.resource.icon
    ) {
      markers.push(
        <img
          key={cuid()}
          className={classes.resourceStatusIcon}
          src={selectedDoday.resource.icon}
        />
      );
    }
    return markers;
  };

  renderTakeDodayBlock = () => {
    const { selectedDoday, updates, loading, theme, t } = this.props;
    if (selectedDoday && selectedDoday.progress) {
      return <>{t('activities:details.status.alreadyTaken')}</>;
    }

    const dateIsLocked: boolean | undefined =
      updates && updates.dateIsLocked != null
        ? updates.dateIsLocked
        : selectedDoday &&
          selectedDoday.progress &&
          selectedDoday.progress.dateIsLocked;

    return (
      <>
        <LayoutBlock>
          <CustomDatePicker
            withLocker
            isLocked={dateIsLocked}
            onLocked={() => {
              this.props.requestForSetUpdatesActionCreator!({
                dateIsLocked: !dateIsLocked,
              });
            }}
            borderless
            minDate={new Date()}
            icon={<ScheduleIcon />}
            selected={
              (updates && updates.date) ||
              (selectedDoday &&
                selectedDoday.progress &&
                selectedDoday.progress.date) ||
              new Date()
            }
            tooltip={t('activities:builder.lockDateTooltip')}
            onChange={date => {
              this.props.requestForSetUpdatesActionCreator!({
                date: date || undefined,
              });
            }}
          />
        </LayoutBlock>
        {!loading ? (
          <LayoutBlock insideElementsMargin>
            <Media query="(max-width: 915px)">
              {matches =>
                !matches && (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      this.props.takeDodayActionCreator!({
                        doday: selectedDoday!,
                        progress: {
                          date: new Date(),
                          dateIsLocked: false,
                          completed: true,
                          completedAt: new Date(),
                          ownerDID: this.props.myDID,
                        },
                      });
                      if (this.context.requestClose)
                        this.context.requestClose();
                      setTimeout(() => {
                        this.props.history!.push('/dashboard');
                      }, 200);
                    }}
                  >
                    {t('activities:details.actions.complete')}
                  </Button>
                )
              }
            </Media>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                this.props.takeDodayActionCreator!({
                  doday: selectedDoday!,
                  progress: {
                    date: (updates && updates.date) || new Date(),
                    dateIsLocked: (updates && updates.dateIsLocked) || false,
                    completed: false,
                    ownerDID: this.props.myDID,
                  },
                });
                if (this.context.requestClose) this.context.requestClose();
                setTimeout(() => {
                  this.props.history!.push('/dashboard');
                }, 200);
              }}
            >
              {t('activities:details.actions.take')}
            </Button>
          </LayoutBlock>
        ) : (
          <Icons.InlineLoader color={theme.palette.action.active} />
        )}
      </>
    );
  };

  render() {
    const { loading, selectedDoday, classes, theme, t } = this.props;

    const resource = selectedDoday && selectedDoday.resource;
    const preview = resource && resource.image;
    const youtubeLink = this.getYouTubeLink(resource);

    return (
      <Page
        header={
          <PageHeader withClose status={selectedDoday && this.status()}>
            {loading ? (
              <Icons.InlineLoader color={theme.palette.action.active} />
            ) : selectedDoday!.progress ? (
              <Button
                key={1}
                variant="outlined"
                onClick={() => {
                  this.props.untakeDodayActionCreator!({
                    did: selectedDoday!.did,
                    type: selectedDoday!.type,
                  });
                }}
              >
                {t('activities:details.actions.untake')}
              </Button>
            ) : null}
          </PageHeader>
        }
      >
        {selectedDoday ? (
          <>
            <LayoutBlock insideElementsMargin />
            <LayoutBlock
              spaceAbove={Space.Medium}
              spaceBelow={Space.Medium}
              direction="column"
            >
              <Typography variant="h2">{selectedDoday.name}</Typography>
              {selectedDoday.duration && (
                <LayoutBlock
                  spaceAbove={Space.Small}
                  insideElementsMargin
                  valign="vflexCenter"
                >
                  <HourGlassEmptyIcon color="disabled" />
                  <Typography variant="body1" color="textSecondary">
                    {durationToLabel(selectedDoday.duration, {
                      hour: t('shell:time.h'),
                      minute: t('shell:time.m'),
                    })}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
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
            <LayoutBlock childFlex spaceBelow={Space.Medium}>
              {youtubeLink ? (
                <div
                  className={classes.videoWrapper}
                  style={{
                    backgroundImage: `url(${preview})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
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
                    backgroundImage: `url(${preview})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              ) : null}
            </LayoutBlock>
            <LayoutBlock spaceBelow={Space.Medium}>
              <Typography variant="body1">
                {resource && resource.description}
              </Typography>
            </LayoutBlock>
            {!youtubeLink && (resource && resource.url) ? (
              <LayoutBlock
                spaceAbove={Space.Large}
                spaceBelow={Space.Large}
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
            <Card>
              <LayoutBlock
                paddingAbove={Space.Medium}
                paddingBelow={Space.Medium}
                paddingLeft={Space.Medium}
                paddingRight={Space.Medium}
                align="spaceBetween"
                valign="vflexCenter"
              >
                {this.renderTakeDodayBlock()}
              </LayoutBlock>
            </Card>
          </>
        ) : null}
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  loading: state.details.loading,
  myDID: state.auth.hero && state.auth.hero.did,
  updates: state.details.updates,
  selectedDoday: state.details.selectedDoday,
});

export const ActivityDetails = connect(
  mapState,
  {
    ...ducks.api.actions,
    ...ducks.details.actions,
    ...ducks.dodayApp.actions,
  }
)(withStyles(css)(withTheme(ActivityDetailsComponentClass)));
