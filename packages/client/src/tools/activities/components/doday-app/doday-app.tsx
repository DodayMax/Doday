import * as React from 'react';
import { connect } from 'react-redux';
import * as queryString from 'query-string';
import { RouteComponentProps } from 'react-router';
import * as cuid from 'cuid';
import { DefaultTopBar } from '@root/components';
import { Grid } from '@root/components/shared';
import { DodayLike, DodayTypes } from '@root/lib/models/entities/common';
import { ActivityProgressCell } from './cells/app-cell/activity-progress-cell';
import { ActivityCell } from './cells/app-cell/activity-cell';
import { Activity } from '@root/lib/models/entities/activity';
import { RootState } from '@root/lib/models';
import { actions as dodayAppActions } from '@ducks/doday-app';
import { actions } from '@tools/activities/duck';
import {
  DodaysWithProgressQueryParams,
  DodaysQueryParams,
} from '@root/services/api/dodays/queries';
import {
  FetchActivitiesWithProgressAction,
  FetchPublishedActivitiesAction,
} from '../../duck/actions';
import {
  ChangeDodayAppRouteAction,
  SetDodayAppQueryParamsAction,
} from '@root/ducks/doday-app/actions';
import { DodayAppQueryParams } from '@root/lib/common-interfaces';
import { config } from '../../config';
import { capitalize } from '@root/lib/utils';

interface ActivityDodayAppProps {
  loading: boolean;
}

interface PropsFromConnect {
  route: string;
  routeParams: DodayAppQueryParams;
  inprogress: Activity[];
  completed: Activity[];
  published: Activity[];
  fetchActivitiesWithProgressActionCreator: (
    params: DodaysWithProgressQueryParams
  ) => FetchActivitiesWithProgressAction;
  fetchPublishedActivitiesActionCreator: (
    params: DodaysQueryParams
  ) => FetchPublishedActivitiesAction;
  changeDodayAppRouteActionCreator: (
    route: string
  ) => ChangeDodayAppRouteAction;
  setDodayAppQueryParamsActionCreator: (
    params: DodayAppQueryParams
  ) => SetDodayAppQueryParamsAction;
}

class ActivityDodayApp extends React.Component<
  ActivityDodayAppProps & Partial<PropsFromConnect>
> {
  componentDidMount() {
    const { routeParams } = this.props;
    if (!routeParams.completed && !routeParams.published) {
      // Fetch in progress dodays
      this.props.fetchActivitiesWithProgressActionCreator({
        dodaytype: DodayTypes.Activity,
        completed: false,
      });
    } else if (routeParams.completed) {
      // Fetch completed dodays
      this.props.fetchActivitiesWithProgressActionCreator({
        dodaytype: DodayTypes.Activity,
        completed: true,
      });
    } else if (routeParams.published) {
      // Fetch created (published) dodays
    }
  }

  private handleDodayCellClick = (route: string, doday: DodayLike) => {};

  private get items() {
    const { routeParams, inprogress, completed, published } = this.props;
    if (!routeParams.completed && !routeParams.published) {
      return inprogress;
    } else if (routeParams.completed) {
      return completed;
    } else if (routeParams.published) {
      return published;
    }
  }

  private get progressFilterItems() {
    return [
      {
        name: 'in progress',
        action: () => {
          this.props.changeDodayAppRouteActionCreator(config.route);
          this.props.setDodayAppQueryParamsActionCreator({});
          this.props.fetchActivitiesWithProgressActionCreator({
            dodaytype: DodayTypes.Activity,
            completed: false,
          });
        },
        active: () => {
          const { routeParams } = this.props;
          return !routeParams.completed && !routeParams.published;
        },
      },
      {
        name: 'completed',
        action: () => {
          this.props.setDodayAppQueryParamsActionCreator({
            completed: true,
          });
          this.props.fetchActivitiesWithProgressActionCreator({
            dodaytype: DodayTypes.Activity,
            completed: true,
          });
        },
        active: () => {
          const { routeParams } = this.props;
          return routeParams.completed;
        },
      },
      {
        name: 'published',
        action: () => {
          this.props.setDodayAppQueryParamsActionCreator({
            published: true,
          });
          this.props.fetchPublishedActivitiesActionCreator({
            dodaytype: DodayTypes.Activity,
          });
        },
        active: () => {
          const { routeParams } = this.props;
          return routeParams.published;
        },
      },
    ];
  }

  private renderCell = (item: DodayLike) => {
    if (item.progress) {
      return (
        <ActivityProgressCell
          doday={item as Activity}
          key={cuid()}
          onClick={this.handleDodayCellClick}
        />
      );
    }
    return (
      <ActivityCell
        doday={item as Activity}
        key={cuid()}
        onClick={this.handleDodayCellClick}
      />
    );
  };

  render() {
    const { loading } = this.props;
    return (
      <>
        <DefaultTopBar title={capitalize(config.sysname)} />
        <Grid
          search
          filters={[this.progressFilterItems]}
          loading={loading}
          items={this.items}
          renderCell={this.renderCell}
        />
      </>
    );
  }
}

const mapState = (state: RootState) => ({
  route: state.dodayApp.status.route,
  routeParams: state.dodayApp.status.routeParams,
  inprogress: state.dodayApp.tools.activities.inprogress,
  completed: state.dodayApp.tools.activities.completed,
  published: state.dodayApp.tools.activities.published,
});

export default connect(
  mapState,
  {
    ...actions,
    ...dodayAppActions,
  }
)(ActivityDodayApp);
