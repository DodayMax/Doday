import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as queryString from 'query-string';
import { actions as builderActions } from '@ducks/builder';
import { Activity } from '@root/lib/common-interfaces';
import { RootState } from '@root/lib/models';
import {
  FetchActivityTypesAction,
  CreateAndTakeDodayAction,
  SetBuilderSuccessFlagAction,
  ParseUrlMetadataAction,
  ClearParsedMetadataAction,
  ClearBuilderAction,
  CreateGoalAction,
  SelectGoalAction,
} from '@root/ducks/builder/actions';
import { Page, PageHeader } from '../shared/_molecules/page';
import { SerializedDoday } from '@root/lib/models/entities/Doday';

import { DodayBuilder } from './doday-builder';
import { Goal, SerializedGoal } from '@root/lib/models/entities/Goal';
import { DodayTypes } from '@root/lib/models/entities/dodayTypes';
import { GoalBuilder } from './goal-builder';

interface BuilderProps {}

interface BuilderState {}

interface PropsFromConnect {
  ownerDID?: string;
  goals: Goal[];
  selectedGoal?: Goal;
  activityType: Activity;
  isUrlParsing?: boolean;
  parsedMetadata?: any;
  loading?: boolean;
  success?: boolean;
  fetchActivityTypes: () => FetchActivityTypesAction;
  createAndTakeDoday: (doday: SerializedDoday) => CreateAndTakeDodayAction;
  createGoalActionCreator: (goal: SerializedGoal) => CreateGoalAction;
  selectGoalActionCreator: (goal: Goal) => SelectGoalAction;
  setBuilderSuccessFlag: (state?: boolean) => SetBuilderSuccessFlagAction;
  parseUrlMetadataActionCreator: (url: string) => ParseUrlMetadataAction;
  clearParsedMetadataActionCreator: () => ClearParsedMetadataAction;
  clearBuilderActionCreator: () => ClearBuilderAction;
}

export class Builder extends React.Component<
  BuilderProps & PropsFromConnect & Partial<RouteComponentProps>,
  BuilderState
> {
  constructor(
    props: BuilderProps & PropsFromConnect & Partial<RouteComponentProps>
  ) {
    super(props);

    this.state = {
      dodayName: '',
      date: new Date(),
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.success) {
      this.props.history.push('/');
      this.props.setBuilderSuccessFlag(undefined);
    }
  }

  onCloseBuidler = () => {
    this.props.clearBuilderActionCreator();
  };

  renderBuilder = () => {
    const {
      ownerDID,
      goals,
      selectedGoal,
      loading,
      isUrlParsing,
      parsedMetadata,
      parseUrlMetadataActionCreator,
      createAndTakeDoday,
      clearParsedMetadataActionCreator,
      createGoalActionCreator,
      selectGoalActionCreator,
      activityType = 'do',
      location,
    } = this.props;

    const queryParams = queryString.parse(location.search);

    if (Number(queryParams.type) === DodayTypes.Doday) {
      return (
        <DodayBuilder
          goals={goals}
          selectedGoal={selectedGoal}
          loading={loading}
          isUrlParsing={isUrlParsing}
          parsedMetadata={parsedMetadata}
          createAndTakeDoday={createAndTakeDoday}
          selectGoalActionCreator={selectGoalActionCreator}
          parseUrlMetadataActionCreator={parseUrlMetadataActionCreator}
          clearParsedMetadataActionCreator={clearParsedMetadataActionCreator}
          activityType={activityType}
        />
      );
    } else if (Number(queryParams.type) === DodayTypes.Goal) {
      return (
        <GoalBuilder
          ownerDID={ownerDID}
          createGoalActionCreator={createGoalActionCreator}
          loading={loading}
          goalNumber={goals.length}
        />
      );
    }
  };

  render() {
    return (
      <Page header={<PageHeader onClose={this.onCloseBuidler} />}>
        {this.renderBuilder()}
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  ownerDID: state.auth.hero && state.auth.hero.did,
  activityType: state.builder.activityType,
  selectedGoal: state.builder.selectedGoal,
  goals: state.dodayApp.goals,
  isUrlParsing: state.builder.isUrlParsing,
  parsedMetadata: state.builder.parsedMetadata,
  loading: state.builder.loading,
  success: state.builder.success,
});

export default withRouter(connect(
  mapState,
  { ...builderActions }
)(Builder) as any);
