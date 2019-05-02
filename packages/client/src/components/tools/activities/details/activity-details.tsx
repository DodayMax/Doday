import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';
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
import {
  SerializedActivity,
  Activity,
} from '@root/lib/models/entities/Activity';
import { Pageflow, PageWrapperChildContext } from '@root/components/pageflow';
import { SerializedProgressLike } from '@root/lib/models/entities/common';

const css = require('./activity-details.module.scss');

interface ActivityDetailsProps {}

interface ActivityDetailsState {}

interface PropsFromConnect {
  loading: boolean;
  dirty?: boolean;
  updates?: Partial<SerializedProgressLike>;
  myDID?: string;
  selectedDoday: Activity;
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
  removeDodayActionCreator: (doday: Activity) => RemoveDodayAction;
  updateSelectedDodayActionCreator: (
    did: string,
    updates: Partial<Activity>
  ) => UpdateSelectedDodayAction;
  clearSelectedDodayActionCreator: () => ClearSelectedDodayAction;
}

type Props = ActivityDetailsProps &
  Partial<PropsFromConnect> &
  Partial<RouteComponentProps<any>>;

@Pageflow({ path: '/dodays/:did' })
@(withRouter as any)
class ActivityDetails extends React.Component<Props, ActivityDetailsState> {
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
            this.props.deleteDodayActionCreator(selectedDoday);
          }
          history.push('/');
        }}
      >
        Delete
      </Button>,
    ];

    return actions;
  };

  status = () => {
    const { selectedDoday } = this.props;
    return [
      <Marker
        key={1}
        rounded
        color={activityTypeColor(selectedDoday.activityType)}
        text={selectedDoday.activityType}
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

    const resource = selectedDoday && selectedDoday.resource;
    const preview = resource && resource.image;
    const youtubeLink = this.getYouTubeLink(resource);

    // const goalsForSelect = goals.map(goal => ({
    //   label: goal.name,
    //   value: goal.did,
    // }));

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
              {selectedDoday.duration && (
                <LayoutBlock insideElementsMargin valign="vflex-center">
                  <Icons.Duration width={16} height={16} />
                  <Text size={TypographySize.s}>
                    {durationToLabel(selectedDoday.duration)}
                  </Text>
                  <Text
                    size={TypographySize.s}
                    color={TypographyColor.Disabled}
                  >
                    (
                    {Math.round(
                      (durationToMinutes(selectedDoday.duration) / (8 * 60)) *
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
              {selectedDoday.name}
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
                  selected={updates && updates.date && new Date(updates.date)}
                  onChange={date => {
                    const dateDirty = true;
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
                      dateIsLocked: !updates.dateIsLocked,
                    });
                  }}
                >
                  {updates.dateIsLocked ? <Icons.Locked /> : <Icons.Unlocked />}
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
)(ActivityDetails);
