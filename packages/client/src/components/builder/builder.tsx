import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as queryString from 'query-string';
import { actions as builderActions } from '@ducks/builder';
import { RootState } from '@root/lib/models';
import {
  SetBuilderSuccessFlagAction,
  ClearBuilderAction,
} from '@root/ducks/builder/actions';
import { Page, PageHeader } from '../shared/_molecules/page';

import { DodayTypes } from '@root/lib/models/entities/common';
import { Pageflow, PageWrapperChildContext } from '../pageflow';
import { ActivityBuilder } from '../tools/activities/builder/activity-builder';

interface BuilderProps {}

interface BuilderState {
  dodayName: string;
  visible: boolean;
  date: Date;
}

interface PropsFromConnect {
  success?: boolean;
  setBuilderSuccessFlag: (state?: boolean) => SetBuilderSuccessFlagAction;
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
    const { location } = this.props;

    const queryParams = queryString.parse(location.search);

    if (Number(queryParams.type) === DodayTypes.Activity) {
      return <ActivityBuilder />;
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
  success: state.builder.status.success,
});

export default withRouter(connect(
  mapState,
  { ...builderActions }
)(Builder) as any);
