import * as React from 'react';
import * as cuid from 'cuid';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as moment from 'moment';
import {
  TypographySize,
  TypographyColor,
  Space,
  DodayColor,
} from '@root/lib/common-interfaces';
import { Page, PageHeader } from '@shared/_molecules/page';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '@root/lib/models';
import { Text, Icons, CustomDatePicker, ClickableIcon } from '@shared';
import { actions as dodaysApiActions } from '@ducks/api/dodays-api-actions';
import { actions as dodaysActions } from '@ducks/doday-app';
import { actions as dodayDetailsActions } from '@ducks/doday-details';
import { Button, ButtonSize } from '@shared/_atoms/button';
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

const vars = require('@styles/_config.scss');
const css = require('./progress-details.module.scss');

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
    WithTranslation,
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
    const {
      history,
      selectedDoday,
      dirty,
      updateDodayActionCreator,
      updates,
      loading,
      t,
    } = this.props;

    const actions = [];

    // Add untake action for public dodays
    if (selectedDoday.public) {
      actions.push(
        <Button
          key={1}
          size={ButtonSize.small}
          onClick={() => {
            this.props.untakeDodayActionCreator({
              did: selectedDoday.did,
              type: selectedDoday.type,
            });
            history.push('/');
          }}
        >
          {t('activities:details.actions.untake')}
        </Button>
      );
    }

    // Add owner actions
    if (this.isOwner) {
      actions.push(
        <Button
          key={cuid()}
          size={ButtonSize.small}
          onClick={() => {
            this.props.deleteDodayActionCreator({
              did: selectedDoday.did,
              type: selectedDoday.type,
            });
            history.push('/');
          }}
        >
          {t('activities:details.actions.delete')}
        </Button>
      );
    }

    // Add save action
    if (dirty) {
      actions.unshift(
        <Button
          primary
          key={cuid()}
          disabled={!dirty}
          size={ButtonSize.small}
          onClick={() => {
            updateDodayActionCreator(selectedDoday.did, selectedDoday.type, {
              progress: updates,
            });
          }}
        >
          {loading ? t('activities:details.actions.saving') : t('activities:details.actions.save')}
        </Button>
      );
    }

    return actions;
  };

  status = () => {
    const { selectedDoday, t } = this.props;
    const markers = [
      activityIconByType(selectedDoday.activityType, 30, vars.gray8),
    ];
    if (selectedDoday.progress && selectedDoday.progress.completed) {
      markers.push(
        <Marker
          key={cuid()}
          rounded
          color={DodayColor.gray3}
          text={`${t('activities:details.status.completed')}: ${moment(
            selectedDoday.progress.completedAt
          ).format('ll')}`}
        />
      );
    }
    if (selectedDoday.resource && selectedDoday.resource.icon) {
      markers.push(
        <img
          onError={ev => {
            (ev.target as HTMLImageElement).src = '';
          }}
          key={cuid()}
          className={css.resourceStatusIcon}
          src={selectedDoday.resource.icon}
        />
      );
    }
    return markers;
  };

  onRequestClose = () => {
    this.props.clearSelectedDodayActionCreator();
  };

  render() {
    const { updates, selectedDoday, loading, t } = this.props;

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
          />
        }
      >
        {selectedDoday && selectedDoday.progress ? (
          <>
            <LayoutBlock insideElementsMargin>
              {!selectedDoday.progress.completed && (
                <>
                  <CustomDatePicker
                    borderless
                    minDate={new Date()}
                    icon={<ScheduleIcon />}
                    selected={
                      (updates && updates.date && new Date(updates.date)) ||
                      (selectedDoday &&
                        selectedDoday.progress &&
                        selectedDoday.progress.date)
                    }
                    onChange={date => {
                      const dateDirty =
                        moment(date).format('ll') !==
                        moment(selectedDoday.progress.date).format('ll');
                      this.props.requestForSetUpdatesActionCreator(
                        {
                          date: dateDirty ? date.getTime() : undefined,
                        },
                        deserializeActivityProgress
                      );
                    }}
                  />
                  <Button
                    borderless
                    active={updates && updates.dateIsLocked}
                    onClick={() => {
                      this.props.requestForSetUpdatesActionCreator(
                        {
                          dateIsLocked: !dateIsLocked,
                        },
                        deserializeActivityProgress
                      );
                    }}
                  >
                    {dateIsLocked ? <Icons.Locked /> : <Icons.Unlocked />}
                  </Button>
                </>
              )}
              {selectedDoday.duration && (
                <LayoutBlock insideElementsMargin valign="vflex-center">
                  <Icons.Duration width={16} height={16} />
                  <Text size={TypographySize.s}>
                    {durationToLabel(selectedDoday.duration, {
                      hour: t('shell:time.h'),
                      minute: t('shell:time.m'),
                    })}
                  </Text>
                  <Text
                    size={TypographySize.s}
                    color={TypographyColor.Disabled}
                  >
                    (
                    {t('activities:details.status.percentOfTheDay', {
                      percent: Math.round(
                        (durationToMinutes(selectedDoday.duration) / (8 * 60)) *
                          100
                      ),
                    })}
                    )
                  </Text>
                </LayoutBlock>
              )}
            </LayoutBlock>
            <LayoutBlock spaceAbove={Space.XSmall} valign="vflex-center">
              <ClickableIcon
                loading={loading}
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
              </ClickableIcon>
              <Text size={TypographySize.h1} spaceLeft={Space.Small}>
                {selectedDoday.name}
              </Text>
            </LayoutBlock>
            {youtubeLink ? (
              <div
                className={css.videoWrapper}
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
                className={css.videoWrapper}
                style={{
                  background: `url(${preview})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            ) : null}
            <Text spaceAbove={Space.Large}>
              {resource && resource.description}
            </Text>
            {!youtubeLink && (resource && resource.url) ? (
              <LayoutBlock
                spaceAbove={Space.Large}
                spaceBelow={Space.Small}
                align="flex-center"
              >
                <Button primary href={resource.url} target="_blank">
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
)(withTranslation(['shell', 'activities'])(ActivityProgressDetailsComponentClass));
