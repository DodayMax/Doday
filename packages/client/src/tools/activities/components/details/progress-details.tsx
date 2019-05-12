import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as moment from 'moment';
import {
  TypographySize,
  TypographyColor,
  Space,
  DodayColors,
} from '@root/lib/common-interfaces';
import { Page, PageHeader } from '@shared/_molecules/page';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '@root/lib/models';
import {
  Text,
  Icons,
  CustomDatePicker,
  Checkbox,
  ClickableIcon,
} from '@shared';
import { actions as dodaysApiActions } from '@ducks/api/dodays-api-actions';
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
import {
  Resource,
  SerializedResource,
} from '@root/lib/models/entities/resource';
import { LayoutBlock } from '@shared/_atoms/layout-block';
import {
  FetchSelectedDodayAction,
  ClearSelectedDodayAction,
  UpdateSelectedDodayProgressAction,
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
  ProgressLike,
  SerializedDodayLike,
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
  updates: Partial<SerializedProgressLike>;
  myDID?: string;
  selectedDoday: Activity;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  updateDodayActionCreator(
    did: string,
    updates: {
      doday?: Partial<SerializedDodayLike>;
      progress?: Partial<SerializedProgressLike>;
      resource?: Partial<SerializedResource>;
    }
  ): UpdateDodayAction;
  deleteDodayActionCreator: (did: string) => DeleteDodayAction;
  untakeDodayActionCreator: (did: string) => UntakeDodayAction;
  setDirtyStatusActionCreator: (status: boolean) => SetDirtyStatusAction;
  clearDirtyStuffActionCreator: () => ClearDirtyStuffAction;
  requestForSetUpdatesActionCreator(
    updates: Partial<SerializedProgressLike>
  ): RequestForSetUpdatesAction;
  updateSelectedDodayProgressActionCreator(
    did: string,
    updates: Partial<ProgressLike>
  ): UpdateSelectedDodayProgressAction;
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
      updateSelectedDodayProgressActionCreator,
      updates,
      loading,
    } = this.props;

    const actions = [
      <Button
        key={1}
        size={ButtonSize.small}
        onClick={() => {
          if (this.isOwner) {
            this.props.deleteDodayActionCreator(selectedDoday.did);
          } else {
            this.props.untakeDodayActionCreator(selectedDoday.did);
          }
          history.push('/');
        }}
      >
        {this.isOwner ? 'Delete' : 'Untake'}
      </Button>,
    ];

    // Add owner actions
    if (dirty) {
      actions.unshift(
        <Button
          primary
          key={2}
          disabled={!dirty}
          size={ButtonSize.small}
          onClick={() => {
            updateDodayActionCreator(selectedDoday.did, { progress: updates });
            updateSelectedDodayProgressActionCreator(selectedDoday.did, {
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
    const markers = [
      <Marker
        key={1}
        rounded
        color={activityTypeColor(selectedDoday.activityType)}
        text={selectedDoday.activityType}
      />,
    ];
    if (selectedDoday.resource && selectedDoday.resource.icon) {
      markers.push(
        <img
          className={css.resourceStatusIcon}
          src={selectedDoday.resource.icon}
        />
      );
    }
    if (selectedDoday.progress && selectedDoday.progress.completed) {
      markers.push(
        <Marker key={2} rounded color={DodayColors.gray3} text={'completed'} />
      );
    }
    return markers;
  };

  onRequestClose = () => {
    this.props.clearSelectedDodayActionCreator();
    if (this.context.requestClose) {
      this.context.requestClose();
    }
  };

  render() {
    const { updates, selectedDoday } = this.props;

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
        {selectedDoday ? (
          <>
            <LayoutBlock insideElementsMargin>
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
                    moment(selectedDoday.progress.date).format('ll');
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
            <LayoutBlock spaceAbove={Space.XSmall} valign="vflex-center">
              <ClickableIcon
                onClick={() => {
                  this.props.updateDodayActionCreator(selectedDoday.did, {
                    progress: { completed: !selectedDoday.progress.completed },
                  });
                  this.props.updateSelectedDodayProgressActionCreator(
                    selectedDoday.did,
                    { completed: !selectedDoday.progress.completed }
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
                  backgroundSize: 'contain',
                }}
              />
            ) : null}
            <Text>{resource && resource.description}</Text>
            {selectedDoday.activityType === 'read' ? (
              <LayoutBlock
                spaceAbove={Space.Large}
                spaceBelow={Space.Small}
                align="flex-center"
              >
                <Button primary href={resource && resource.url} target="_blank">
                  Read full article
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

export default connect(
  mapState,
  {
    ...dodaysActions,
    ...dodayDetailsActions,
    ...dodaysApiActions,
  }
)(ActivityProgressDetails);
