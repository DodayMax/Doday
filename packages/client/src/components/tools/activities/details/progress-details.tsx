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
import { Page, PageHeader } from '../../../shared/_molecules/page';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '@root/lib/models';
import { Text, Icons, CustomDatePicker } from '@components';
import { actions as dodaysActions } from '@ducks/doday-app';
import { actions as dodayDetailsActions } from '@ducks/doday-details';
import { Button, ButtonSize } from '../../../shared/_atoms/button';
import {
  DeleteDodayAction,
  RemoveDodayAction,
  UpdateDodayAction,
} from '@root/ducks/doday-app/actions';
import { Marker } from '../../../shared/_atoms/marker';
import {
  activityTypeColor,
  youtubeIDFromURL,
  durationToLabel,
  durationToMinutes,
  isEmptyObject,
} from '@root/lib/utils';
import { Resource } from '@root/lib/models/entities/resource';
import { LayoutBlock } from '../../../shared/_atoms/layout-block';
import {
  FetchSelectedDodayAction,
  ClearSelectedDodayAction,
  UpdateSelectedDodayAction,
  SetDirtyStatusAction,
  ClearDirtyStuffAction,
  RequestForSetUpdatesAction,
} from '@root/ducks/doday-details/actions';
import Select from 'react-select';
import {
  SerializedActivity,
  Activity,
  ActivityProgress,
} from '@root/lib/models/entities/Activity';
import { Pageflow, PageWrapperChildContext } from '@root/components/pageflow';

const css = require('./progress-details.module.scss');

interface ActivityProgressDetailsProps {}

interface ActivityProgressDetailsState {}

interface PropsFromConnect {
  loading: boolean;
  dirty?: boolean;
  updates?: Partial<SerializedActivity>;
  myDID?: string;
  selectedDoday: ActivityProgress;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  updateDodayActionCreator: (
    did: string,
    updates: Partial<SerializedActivity>
  ) => UpdateDodayAction;
  setDirtyStatusActionCreator: (status: boolean) => SetDirtyStatusAction;
  clearDirtyStuffActionCreator: () => ClearDirtyStuffAction;
  requestForSetUpdatesActionCreator: (
    updates: Partial<SerializedActivity>
  ) => RequestForSetUpdatesAction;
  deleteDodayActionCreator: (doday: Activity) => DeleteDodayAction;
  removeDodayActionCreator: (doday: Activity) => RemoveDodayAction;
  updateSelectedDodayActionCreator: (
    did: string,
    updates: Partial<Activity>
  ) => UpdateSelectedDodayAction;
  clearSelectedDodayActionCreator: () => ClearSelectedDodayAction;
}

@Pageflow({ path: '/dodays/:did' })
@(withRouter as any)
class ActivityProgressDetails extends React.Component<
  ActivityProgressDetailsProps & PropsFromConnect & RouteComponentProps<any>,
  ActivityProgressDetailsState
> {
  public static contextTypes = {
    requestClose: PropTypes.func,
  };

  public context!: PageWrapperChildContext;

  componentDidMount() {
    //fetch selected doday with graphQL
    const did = this.props.match.params.did;
    this.props.fetchSelectedDodayActionCreator(did);
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
      selectedDoday.origin.owner.did &&
      myDID &&
      selectedDoday.origin.owner.did === myDID
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
    const origin = selectedDoday.origin as Activity;
    const actions = [
      <Button
        key={1}
        size={ButtonSize.small}
        onClick={() => {
          if (this.isOwner) {
            this.props.deleteDodayActionCreator(origin);
          } else {
            this.props.removeDodayActionCreator(origin);
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
            updateDodayActionCreator(selectedDoday.origin.did, updates);
            updateSelectedDodayActionCreator(selectedDoday.origin.did, {
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
    const origin = this.props.selectedDoday.origin as Activity;
    return [
      <Marker
        key={1}
        rounded
        color={activityTypeColor(origin.activityType)}
        text={origin.activityType}
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
    const origin = selectedDoday && (selectedDoday.origin as Activity);

    // const goal =
    //   updates && updates.relatedGoal
    //     ? goals && goals.find(goal => goal.did === updates.relatedGoal)
    //     : undefined;

    const resource = origin && origin.resource;
    const preview = resource && resource.image;
    const youtubeLink = this.getYouTubeLink(resource);

    // const goalsForSelect = goals.map(goal => ({
    //   label: goal.name,
    //   value: goal.did,
    // }));

    const dateIsLocked =
      updates && updates.dateIsLocked != null
        ? updates.dateIsLocked
        : selectedDoday && selectedDoday.dateIsLocked;

    return (
      <Page
        header={
          <PageHeader
            status={selectedDoday && this.status()}
            actions={selectedDoday && this.actions()}
            onClose={this.onRequestClose}
          />
        }
      >
        {selectedDoday ? (
          <>
            <LayoutBlock insideElementsMargin>
              {origin.duration && (
                <LayoutBlock insideElementsMargin valign="vflex-center">
                  <Icons.Duration width={16} height={16} />
                  <Text size={TypographySize.s}>
                    {durationToLabel(origin.duration)}
                  </Text>
                  <Text
                    size={TypographySize.s}
                    color={TypographyColor.Disabled}
                  >
                    (
                    {Math.round(
                      (durationToMinutes(origin.duration) / (8 * 60)) * 100
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
              {origin.name}
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
            <Text>{resource.description}</Text>
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
                    selectedDoday.date
                  }
                  onChange={date => {
                    const dateDirty =
                      moment(date).format('ll') !==
                      moment(selectedDoday.date).format('ll');
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
  goals: state.dodayApp.goals,
});

export default connect(
  mapState,
  {
    ...dodaysActions,
    ...dodayDetailsActions,
  }
)(ActivityProgressDetails);
