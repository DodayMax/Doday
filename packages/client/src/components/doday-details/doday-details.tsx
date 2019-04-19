import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as moment from 'moment';
import { TypographySize, TypographyColor } from '@root/lib/common-interfaces';
import { Page, PageHeader } from '../shared/_molecules/page';
import { RouteComponentProps, withRouter } from 'react-router';
import { RootState } from '@root/lib/models';
import { Text, Icons, CustomDatePicker } from '@components';
import { actions as dodaysActions } from '@ducks/doday-app';
import { actions as dodayDetailsActions } from '@ducks/doday-details';
import { Doday, SerializedDoday } from '@root/lib/models/entities/Doday';
import { Button, ButtonSize } from '../shared/_atoms/button';
import {
  DeleteDodayAction,
  RemoveDodayAction,
  UpdateDodayAction,
} from '@root/ducks/doday-app/actions';
import { Marker } from '../shared/_atoms/marker';
import {
  activityTypeColor,
  youtubeIDFromURL,
  durationToLabel,
  durationToMinutes,
  isEmptyObject,
} from '@root/lib/utils';
import { Resource } from '@root/lib/models/entities/Resource';
import { LayoutBlock } from '../shared/_atoms/layout-block';
import {
  FetchSelectedDodayAction,
  ClearSelectedDodayAction,
  UpdateSelectedDodayAction,
  SetDirtyStatusAction,
  SetUpdatesForSelectedDodayAction,
  ClearDirtyStuffAction,
  RequestForSetUpdatesAction,
} from '@root/ducks/doday-details/actions';
import Select from 'react-select';
import { Goal } from '@root/lib/models/entities/Goal';
import { selectedValueFromGoal } from '../builder/doday-builder';

const css = require('./doday-details.module.scss');

interface DodayDetailsProps {}

interface DodayDetailsState {}

interface PropsFromConnect {
  loading: boolean;
  dirty?: boolean;
  updates?: Partial<SerializedDoday>;
  myDID?: string;
  goals: Goal[];
  selectedDoday: Doday;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  updateDodayActionCreator: (
    did: string,
    updates: Partial<SerializedDoday>
  ) => UpdateDodayAction;
  setDirtyStatusActionCreator: (status: boolean) => SetDirtyStatusAction;
  clearDirtyStuffActionCreator: () => ClearDirtyStuffAction;
  requestForSetUpdatesActionCreator: (
    updates: Partial<SerializedDoday>
  ) => RequestForSetUpdatesAction;
  deleteDodayActionCreator: (doday: Doday) => DeleteDodayAction;
  removeDodayActionCreator: (doday: Doday) => RemoveDodayAction;
  updateSelectedDodayActionCreator: (
    did: string,
    updates: Partial<Doday>
  ) => UpdateSelectedDodayAction;
  clearSelectedDodayActionCreator: () => ClearSelectedDodayAction;
}

@(withRouter as any)
class DodayDetails extends React.Component<
  DodayDetailsProps & PropsFromConnect & RouteComponentProps<any>,
  DodayDetailsState
> {
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

  handleChangeGoal = selected => {
    const goal =
      this.props.goals &&
      this.props.goals.find(goal => goal.did === selected.value);
    const dirty =
      goal.did !==
      (this.props.selectedDoday.relatedGoal &&
        this.props.selectedDoday.relatedGoal.did);
    this.props.requestForSetUpdatesActionCreator({
      relatedGoal: dirty ? goal.did : undefined,
    });
  };

  render() {
    const {
      loading,
      dirty,
      updates,
      history,
      selectedDoday,
      updateSelectedDodayActionCreator,
      clearSelectedDodayActionCreator,
      updateDodayActionCreator,
      myDID,
      goals,
    } = this.props;

    if (!selectedDoday) {
      return 'Loading...';
    }

    const IAMOwner =
      selectedDoday.owner.did && myDID && selectedDoday.owner.did === myDID;

    const goal =
      updates && updates.relatedGoal
        ? this.props.goals &&
          this.props.goals.find(goal => goal.did === updates.relatedGoal)
        : undefined;

    const actions = [
      <Button
        key={1}
        size={ButtonSize.small}
        onClick={() => {
          if (IAMOwner) {
            this.props.deleteDodayActionCreator(selectedDoday);
          } else {
            this.props.removeDodayActionCreator(selectedDoday);
          }
          history.push('/');
        }}
      >
        Delete
      </Button>,
    ];

    // Add owner actions
    if (IAMOwner && dirty) {
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
              relatedGoal: goal,
            } as any);
            this.props.clearDirtyStuffActionCreator();
          }}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      );
    }

    const status = [
      <Marker
        key={1}
        rounded
        color={activityTypeColor(selectedDoday.activityType)}
        text={selectedDoday.activityType}
      />,
    ];

    const resource = selectedDoday.resource;
    const preview = resource && resource.image;
    const youtubeLink = this.getYouTubeLink(resource);

    const goalsForSelect = goals.map(goal => ({
      label: goal.name,
      value: goal.did,
    }));

    const dateIsLocked =
      updates && updates.dateIsLocked != null
        ? updates.dateIsLocked
        : selectedDoday.dateIsLocked;

    return (
      <Page
        header={
          <PageHeader
            status={status}
            actions={actions}
            onClose={clearSelectedDodayActionCreator}
          />
        }
      >
        <LayoutBlock insideElementsMargin>
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
          {selectedDoday.duration && (
            <LayoutBlock insideElementsMargin valign="vflex-center">
              <Icons.Duration width={16} height={16} />
              <Text size={TypographySize.s}>
                {durationToLabel(selectedDoday.duration)}
              </Text>
              <Text size={TypographySize.s} color={TypographyColor.Disabled}>
                (
                {Math.round(
                  (durationToMinutes(selectedDoday.duration) / (8 * 60)) * 100
                )}
                % of your day)
              </Text>
            </LayoutBlock>
          )}
        </LayoutBlock>
        <Text size={TypographySize.h1}>{selectedDoday.name}</Text>
        <LayoutBlock margin="1rem 0" insideElementsMargin valign="vflex-center">
          <Text color={TypographyColor.Disabled} size={TypographySize.m}>
            {'Related goal: '}
          </Text>
          <Select
            className={css.goalSelect}
            value={
              (updates && updates.relatedGoal && selectedValueFromGoal(goal)) ||
              (selectedDoday.relatedGoal &&
                selectedValueFromGoal(selectedDoday.relatedGoal))
            }
            onChange={this.handleChangeGoal}
            placeholder="Choose goal"
            options={goalsForSelect}
          />
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
        <Text>{resource.description}</Text>
        {selectedDoday.activityType === 'read' ? (
          <LayoutBlock margin="2rem 0" align="flex-center">
            <Button primary href={resource.url} target="_blank">
              Read full article
            </Button>
          </LayoutBlock>
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
)(DodayDetails);
