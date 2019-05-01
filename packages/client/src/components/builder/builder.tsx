import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as queryString from 'query-string';
import { actions as builderActions } from '@ducks/builder';
import { RootState } from '@root/lib/models';
import {
  FetchActivityTypesAction,
  CreateAndTakeDodayAction,
  SetBuilderSuccessFlagAction,
  ParseUrlMetadataAction,
  ClearParsedMetadataAction,
  ClearBuilderAction,
  CreateDodayAction,
} from '@root/ducks/builder/actions';
import { Page, PageHeader } from '../shared/_molecules/page';

import {
  DodayTypes,
  DodayLikeSerialized,
} from '@root/lib/models/entities/common';
import { Pageflow, PageWrapperChildContext } from '../pageflow';
import { ActivityTypes } from '@root/lib/common-interfaces';
import { ActivityBuilder } from '../tools/activities/builder/activity-builder';

interface BuilderProps {}

interface BuilderState {
  dodayName: string;
  visible: boolean;
  date: Date;
}

interface PropsFromConnect {
  ownerDID?: string;
  activityType: ActivityTypes;
  isUrlParsing?: boolean;
  parsedMetadata?: any;
  loading?: boolean;
  success?: boolean;
  fetchActivityTypes: () => FetchActivityTypesAction;
  createDodayActionCreator: (doday: DodayLikeSerialized) => CreateDodayAction;
  createAndTakeDoday: (doday: DodayLikeSerialized) => CreateAndTakeDodayAction;
  setBuilderSuccessFlag: (state?: boolean) => SetBuilderSuccessFlagAction;
  parseUrlMetadataActionCreator: (url: string) => ParseUrlMetadataAction;
  clearParsedMetadataActionCreator: () => ClearParsedMetadataAction;
  clearBuilderActionCreator: () => ClearBuilderAction;
}

@Pageflow({ path: '/builder' })
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
      visible: true,
      date: new Date(),
    };
  }

  public static contextTypes = {
    requestClose: PropTypes.func,
  };

  public context!: PageWrapperChildContext;

  componentDidUpdate(prevProps) {
    if (this.props.success) {
      this.props.history.push('/');
      this.props.setBuilderSuccessFlag(undefined);
    }
  }

  onRequestClose = () => {
    this.props.clearBuilderActionCreator();
    if (this.context.requestClose) {
      this.context.requestClose();
    }
  };

  renderBuilder = () => {
    const {
      ownerDID,
      loading,
      isUrlParsing,
      parsedMetadata,
      parseUrlMetadataActionCreator,
      createDodayActionCreator,
      createAndTakeDoday,
      clearParsedMetadataActionCreator,
      activityType = 'do',
      location,
    } = this.props;

    const queryParams = queryString.parse(location.search);

    if (Number(queryParams.type) === DodayTypes.Activity) {
      return (
        <ActivityBuilder
          loading={loading}
          isUrlParsing={isUrlParsing}
          parsedMetadata={parsedMetadata}
          createDodayActionCreator={createDodayActionCreator}
          createAndTakeDoday={createAndTakeDoday}
          parseUrlMetadataActionCreator={parseUrlMetadataActionCreator}
          clearParsedMetadataActionCreator={clearParsedMetadataActionCreator}
          activityType={activityType}
          ownerDID={ownerDID}
        />
      );
    } else if (Number(queryParams.type) === DodayTypes.Goal) {
      // return (
      //   <GoalBuilder
      //     ownerDID={ownerDID}
      //     createGoalActionCreator={createGoalActionCreator}
      //     loading={loading}
      //     goalNumber={goals.length}
      //   />
      // );
    }
  };

  render() {
    return (
      <Page header={<PageHeader onClose={this.onRequestClose} />}>
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
