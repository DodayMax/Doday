import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as cuid from 'cuid';
import { DefaultTopBar } from '@root/components';
import { Grid } from '@root/components/shared';
import {
  DodayLike,
  DodayTypes,
  SerializedDodayLike,
  SerializedProgressLike,
} from '@root/lib/models/entities/common';
import { ActivityProgressCell } from './cells/app-cell/activity-progress-cell';
import { ActivityCell } from './cells/app-cell/activity-cell';
import { Activity } from '@root/lib/models/entities/activity';
import { RootState } from '@root/lib/models';
import { actions as dodaysApiActions } from '@ducks/api/dodays-api-actions';
import { actions as dodayAppActions } from '@ducks/doday-app';
import { actions } from '@tools/activities/duck';
import {
  DodaysWithProgressQueryParams,
  DodaysQueryParams,
} from '@root/services/api/dodays/queries';
import {
  ChangeDodayAppRouteAction,
  SetDodayAppQueryParamsAction,
} from '@root/ducks/doday-app/actions';
import { DodayAppQueryParams } from '@root/lib/common-interfaces';
import { config } from '../../config';
import { capitalize } from '@root/lib/utils';
import { SerializedResource } from '@root/lib/models/entities/resource';
import { UpdateDodayAction } from '@root/ducks/api/dodays-api-actions/actions';
import {
  FetchActivitiesAction,
  FetchActivitiesWithProgressAction,
} from '../../duck/actions';

interface ActivityDodayAppProps {
  loading: boolean;
}

interface PropsFromConnect {
  myDID: string;
  route: string;
  routeParams: DodayAppQueryParams;
  dodays: Activity[];
  fetchActivitiesActionCreator: (
    params: DodaysQueryParams
  ) => FetchActivitiesAction;
  fetchActivitiesWithProgressActionCreator(
    params?: DodaysWithProgressQueryParams
  ): FetchActivitiesWithProgressAction;
  updateDodayActionCreator(
    did: string,
    updates: {
      doday?: Partial<SerializedDodayLike>;
      progress?: Partial<SerializedProgressLike>;
      resource?: Partial<SerializedResource>;
    }
  ): UpdateDodayAction;
  changeDodayAppRouteActionCreator: (
    route: string
  ) => ChangeDodayAppRouteAction;
  setDodayAppQueryParamsActionCreator: (
    params: DodayAppQueryParams
  ) => SetDodayAppQueryParamsAction;
}

class ActivityDodayApp extends React.Component<
  ActivityDodayAppProps & Partial<PropsFromConnect> & RouteComponentProps
> {
  componentDidMount() {
    this.props.fetchActivitiesActionCreator({
      dodaytype: DodayTypes.Activity,
    });
    this.props.fetchActivitiesWithProgressActionCreator({
      dodaytype: DodayTypes.Activity,
    });
  }

  private handleDodayCellClick = (route: string, doday: DodayLike) => {
    this.props.history.push(route);
  };

  private get items() {
    const { routeParams, dodays, myDID } = this.props;
    if (!dodays) return [];
    if (!routeParams.completed && !routeParams.published) {
      return dodays.filter(
        doday => doday.progress && !doday.progress.completed
      );
    } else if (routeParams.completed) {
      return dodays.filter(doday => doday.progress && doday.progress.completed);
    } else if (routeParams.published) {
      return dodays.filter(doday => doday.public && doday.ownerDID === myDID);
    }
  }

  private get progressFilterItems() {
    return [
      {
        name: 'in progress',
        action: () => {
          this.props.changeDodayAppRouteActionCreator(config.route);
          this.props.setDodayAppQueryParamsActionCreator({});
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
          onComplete={() => {
            this.props.updateDodayActionCreator(item.did, {
              progress: { completed: !item.progress.completed },
            });
          }}
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
  dodays: state.tools.activities && state.tools.activities.dodays,
  myDID: state.auth.hero && state.auth.hero.did,
});

export default connect(
  mapState,
  {
    ...actions,
    ...dodaysApiActions,
    ...dodayAppActions,
  }
)(ActivityDodayApp);
