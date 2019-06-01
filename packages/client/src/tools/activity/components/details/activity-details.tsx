import * as React from 'react';
import { connect } from 'react-redux';
import * as cuid from 'cuid';
import * as _ from 'lodash';
import { Space } from '@root/lib/common-interfaces';
import { Page, PageHeader } from '@shared/_molecules/page';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '@root/lib/models';
import { CustomDatePicker, Icons } from '@shared';
import { actions as dodaysApiActions } from '@ducks/api/dodays-api-actions';
import { actions as dodaysActions } from '@ducks/doday-app';
import { actions as dodayDetailsActions } from '@ducks/doday-details';
import {
  youtubeIDFromURL,
  durationToLabel,
  durationToMinutes,
} from '@root/lib/utils';
import { Resource } from '@root/lib/models/entities/resource';
import { LayoutBlock } from '@shared/_atoms/layout-block';
import {
  FetchSelectedDodayAction,
  ClearSelectedDodayAction,
  RequestForSetUpdatesAction,
  ClearDodayDetailsDirtyStuffAction,
} from '@root/ducks/doday-details/actions';
import { Pageflow } from '@root/components/shared/_decorators/pageflow';
import {
  TakeDodayAction,
  UntakeDodayAction,
} from '@root/ducks/api/dodays-api-actions/actions';
import { Activity } from '../../entities/activity';
import { DodayType, ProgressLike } from '@root/tools/types';
import { activityIconByType } from '../builders/activity-builder';
import { WithTranslation, withTranslation } from 'react-i18next';
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

interface ActivityDetailsProps {}

interface ActivityDetailsState {}

interface PropsFromConnect {
  loading: boolean;
  updates?: Partial<ProgressLike>;
  myDID?: string;
  selectedDoday: Activity;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  requestForSetUpdatesActionCreator(
    progress?: Partial<ProgressLike>
  ): RequestForSetUpdatesAction;
  takeDodayActionCreator(payload: {
    did: string;
    type: DodayType;
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
  WithTranslation &
  WithStyles &
  WithTheme;

@(withRouter as any)
@Pageflow({ path: '/dodays/:did' })
export class ActivityDetailsComponentClass extends React.Component<
  Props,
  ActivityDetailsState
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

  status = () => {
    const { selectedDoday, classes } = this.props;
    const markers = [
      activityIconByType(selectedDoday.activityType, 30, undefined, 'right'),
    ];
    if (selectedDoday.resource && selectedDoday.resource.icon) {
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
    if (selectedDoday.progress) {
      return <>{t('activities:details.status.alreadyTaken')}</>;
    }

    const dateIsLocked =
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
              this.props.requestForSetUpdatesActionCreator({
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
              this.props.requestForSetUpdatesActionCreator({
                date,
              });
            }}
          />
        </LayoutBlock>
        {!loading ? (
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              this.props.takeDodayActionCreator({
                did: selectedDoday.did,
                type: selectedDoday.type,
                progress: {
                  date: (updates && updates.date) || new Date(),
                  dateIsLocked: (updates && updates.dateIsLocked) || false,
                  completed: false,
                  ownerDID: this.props.myDID,
                },
              });
            }}
          >
            {t('activities:details.actions.take')}
          </Button>
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
            ) : selectedDoday.progress ? (
              <Button
                key={1}
                variant="outlined"
                onClick={() => {
                  this.props.untakeDodayActionCreator({
                    did: selectedDoday.did,
                    type: selectedDoday.type,
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
                    backgroundImage: `url(${preview})`,
                    backgroundSize: 'contain',
                  }}
                />
              ) : null}
            </LayoutBlock>
            <LayoutBlock spaceBelow={Space.Medium}>
              <Typography variant="body1">
                {resource && resource.description}
              </Typography>
            </LayoutBlock>
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
  loading: state.dodayDetails.loading,
  myDID: state.auth.hero && state.auth.hero.did,
  updates: state.dodayDetails.updates,
  selectedDoday: state.dodayDetails.selectedDoday,
});

export const ActivityDetails = connect(
  mapState,
  {
    ...dodaysActions,
    ...dodayDetailsActions,
    ...dodaysApiActions,
  }
)(
  withStyles(css)(
    withTranslation(['shell', 'activities'])(
      withTheme()(ActivityDetailsComponentClass)
    )
  )
);
