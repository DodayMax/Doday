import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as moment from 'moment';
import {
  TypographySize,
  TypographyColor,
  Space,
} from '@root/lib/common-interfaces';
import { Page, PageHeader } from '@shared/_molecules/page';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '@root/lib/models';
import { Text, Icons, CustomDatePicker } from '@shared';
import { actions as dodaysActions } from '@ducks/doday-app';
import { actions as dodayDetailsActions } from '@ducks/doday-details';
import { Button, ButtonSize } from '@shared/_atoms/button';
import { Marker } from '@shared/_atoms/marker';
import {
  activityTypeColor,
  youtubeIDFromURL,
  durationToLabel,
  durationToMinutes,
} from '@root/lib/utils';
import { Resource } from '@root/lib/models/entities/resource';
import { LayoutBlock } from '@shared/_atoms/layout-block';
import {
  FetchSelectedDodayAction,
  ClearSelectedDodayAction,
  UpdateSelectedDodayAction,
  SetDirtyStatusAction,
  ClearDirtyStuffAction,
  RequestForSetUpdatesAction,
} from '@root/ducks/doday-details/actions';
import { Activity } from '@root/lib/models/entities/Activity';
import {
  Pageflow,
  PageWrapperChildContext,
} from '@root/components/shared/_support/pageflow';
import {
  SerializedProgressLike,
  DodayLike,
  ProgressLike,
} from '@root/lib/models/entities/common';
import {
  UpdateDodayAction,
  DeleteDodayAction,
  UntakeDodayAction,
} from '@root/ducks/api/dodays-api-actions/actions';

const css = require('./progress-details.module.scss');

interface ActivityProgressDetailsProps {}

interface ActivityProgressDetailsState {}

interface PropsFromConnect {
  loading: boolean;
  dirty?: boolean;
  updates?: Partial<SerializedProgressLike>;
  myDID?: string;
  selectedDoday: DodayLike;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  updateDodayActionCreator: (
    did: string,
    updates: Partial<SerializedProgressLike>
  ) => UpdateDodayAction;
  setDirtyStatusActionCreator: (status: boolean) => SetDirtyStatusAction;
  clearDirtyStuffActionCreator: () => ClearDirtyStuffAction;
  requestForSetUpdatesActionCreator: (
    updates: Partial<SerializedProgressLike>
  ) => RequestForSetUpdatesAction;
  deleteDodayActionCreator: (doday: Activity) => DeleteDodayAction;
  untakeDodayActionCreator: (doday: Activity) => UntakeDodayAction;
  updateSelectedDodayActionCreator: (
    did: string,
    updates: Partial<ProgressLike>
  ) => UpdateSelectedDodayAction;
  clearSelectedDodayActionCreator: () => ClearSelectedDodayAction;
}

@Pageflow({ path: '/dodays/:did' })
@(withRouter as any)
class ActivityProgressDetails extends React.Component<
  ActivityProgressDetailsProps &
    Partial<PropsFromConnect> &
    Partial<RouteComponentProps<any>>,
  ActivityProgressDetailsState
> {
  public static contextTypes = {
    requestClose: PropTypes.func,
  };

  public context!: PageWrapperChildContext;

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
      updateSelectedDodayActionCreator,
      updates,
      loading,
    } = this.props;
    const actions = [
      <Button
        key={1}
        size={ButtonSize.small}
        onClick={() => {
          if (this.isOwner) {
            this.props.deleteDodayActionCreator(selectedDoday as Activity);
          } else {
            this.props.untakeDodayActionCreator(selectedDoday as Activity);
          }
          history.push('/');
        }}
      >
        Delete
      </Button>,
    ];

    // Add owner actions
    if (this.isOwner && dirty) {
      actions.unshift(
        <Button
          primary
          key={2}
          disabled={!dirty}
          size={ButtonSize.small}
          onClick={() => {
            updateDodayActionCreator(selectedDoday.did, updates);
            updateSelectedDodayActionCreator(selectedDoday.did, {
              ...updates,
              date: updates && updates.date && new Date(updates.date),
            } as any);
            this.props.clearDirtyStuffActionCreator();
          }}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      );
    }

    return actions;
  };

  status = () => {
    const { selectedDoday } = this.props;
    return [
      <Marker
        key={1}
        rounded
        color={activityTypeColor((selectedDoday as Activity).activityType)}
        text={(selectedDoday as Activity).activityType}
      />,
    ];
  };

  onRequestClose = () => {
    this.props.clearSelectedDodayActionCreator();
    if (this.context.requestClose) {
      this.context.requestClose();
    }
  };

  render() {
    const { updates, selectedDoday } = this.props;

    // const goal =
    //   updates && updates.relatedGoal
    //     ? goals && goals.find(goal => goal.did === updates.relatedGoal)
    //     : undefined;

    const resource = selectedDoday && (selectedDoday as Activity).resource;
    const preview = resource && resource.image;
    const youtubeLink = this.getYouTubeLink(resource);

    // const goalsForSelect = goals.map(goal => ({
    //   label: goal.name,
    //   value: goal.did,
    // }));

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
        {selectedDoday ? (
          <>
            <LayoutBlock insideElementsMargin>
              {(selectedDoday as Activity).duration && (
                <LayoutBlock insideElementsMargin valign="vflex-center">
                  <Icons.Duration width={16} height={16} />
                  <Text size={TypographySize.s}>
                    {durationToLabel((selectedDoday as Activity).duration)}
                  </Text>
                  <Text
                    size={TypographySize.s}
                    color={TypographyColor.Disabled}
                  >
                    (
                    {Math.round(
                      (durationToMinutes((selectedDoday as Activity).duration) /
                        (8 * 60)) *
                        100
                    )}
                    % of your day)
                  </Text>
                </LayoutBlock>
              )}
            </LayoutBlock>
            <Text
              spaceAbove={Space.Medium}
              spaceBelow={Space.Medium}
              size={TypographySize.h1}
            >
              {(selectedDoday as Activity).name}
            </Text>
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
                  backgroundSize: 'contain',
                }}
              />
            ) : null}
            <Text>{resource && resource.description}</Text>
            <LayoutBlock
              spaceAbove={Space.Medium}
              spaceBelow={Space.Medium}
              paddingAbove={Space.Medium}
              paddingBelow={Space.Medium}
              paddingLeft={Space.Medium}
              paddingRight={Space.Medium}
              direction="column"
              className={css.well}
            >
              <LayoutBlock
                spaceBelow={Space.Small}
                align="space-between"
                valign="vflex-center"
              >
                <CustomDatePicker
                  borderless
                  minDate={new Date()}
                  icon={<Icons.Clock />}
                  selected={
                    (updates && updates.date && new Date(updates.date)) ||
                    (selectedDoday &&
                      selectedDoday.progress &&
                      selectedDoday.progress.date)
                  }
                  onChange={date => {
                    const dateDirty =
                      moment(date).format('ll') !==
                      moment(
                        selectedDoday &&
                          selectedDoday.progress &&
                          selectedDoday.progress.date
                      ).format('ll');
                    this.props.requestForSetUpdatesActionCreator({
                      date: dateDirty ? date.getTime() : undefined,
                    });
                  }}
                />
                <Button
                  borderless
                  active={updates && updates.dateIsLocked}
                  onClick={() => {
                    this.props.requestForSetUpdatesActionCreator({
                      dateIsLocked: !dateIsLocked,
                    });
                  }}
                >
                  {dateIsLocked ? <Icons.Locked /> : <Icons.Unlocked />}
                </Button>
              </LayoutBlock>
              <LayoutBlock alignSelf="align-self-end">
                <Button
                  primary
                  onClick={() => {
                    // Take doday action
                  }}
                >
                  DO
                </Button>
              </LayoutBlock>
            </LayoutBlock>
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

export default connect(
  mapState,
  {
    ...dodaysActions,
    ...dodayDetailsActions,
  }
)(ActivityProgressDetails);
