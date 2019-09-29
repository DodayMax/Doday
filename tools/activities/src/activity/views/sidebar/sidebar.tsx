import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as cuid from 'cuid';
import { ActivityProgressCell } from './cells/app-cell/activity-progress-cell';
import { ActivityCell } from './cells/app-cell/activity-cell';
import {
  Resource,
  RootState,
  SidebarQueryParams,
  DodayLike,
  ProgressLike,
  Activity,
  DodayType,
} from '@doday/lib';
import { DodaysQueryParams } from '@doday/api';
import { actions } from '../../duck';
import ducks, {
  ChangeSidebarRouteAction,
  SetSidebarQueryParamsAction,
  UpdateDodayAction,
} from '@doday/duck';
import { Grid, DefaultTopBar } from '@doday/shared';
import { config } from '../../config';
import { FetchActivitiesAction } from '../../duck/actions';
import { ActivityToolState } from '../../duck/reducer';

export interface ActivitySidebarProps {
  loading: boolean;
  t: any;
}

export interface PropsFromConnect {
  myDID: string;
  route: string;
  routeParams: SidebarQueryParams;
  dodays: Activity[];
  fetchActivitiesActionCreator: (
    params: DodaysQueryParams
  ) => FetchActivitiesAction;
  updateDodayActionCreator(payload: {
    did: string;
    type: DodayType;
    updates: {
      doday?: Partial<DodayLike>;
      progress?: Partial<ProgressLike>;
      resource?: Partial<Resource>;
    };
  }): UpdateDodayAction;
  changeSidebarRouteActionCreator: (route: string) => ChangeSidebarRouteAction;
  setSidebarQueryParamsActionCreator: (
    params: SidebarQueryParams
  ) => SetSidebarQueryParamsAction;
}

type Props = ActivitySidebarProps &
  Partial<PropsFromConnect> &
  RouteComponentProps;

export class ActivitySidebarComponentClass extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchActivitiesActionCreator!({
      dodaytype: DodayType.Activity,
    });
  }

  private handleDodayCellClick = (route: string, doday: DodayLike) => {
    this.props.history.push(route);
  };

  private get items() {
    const { routeParams, dodays, myDID } = this.props;
    if (!dodays) return [];
    if (!routeParams!.completed && !routeParams!.published) {
      return dodays.filter(
        doday => doday.progress && !doday.progress.completed
      );
    } else if (routeParams!.completed) {
      return dodays
        .filter(doday => doday.progress && doday.progress.completed)
        .sort((a, b) =>
          a.progress!.completedAt! < b.progress!.completedAt! ? 1 : -1
        );
    } else if (routeParams!.published) {
      return dodays.filter(doday => doday.public && doday.ownerDID === myDID);
    }
  }

  private get progressFilterItems() {
    return [
      {
        name: 'inprogress',
        action: () => {
          this.props.changeSidebarRouteActionCreator!(config.route!);
          this.props.setSidebarQueryParamsActionCreator!({});
        },
        active: () => {
          const { routeParams } = this.props;
          return !routeParams!.completed! && !routeParams!.published!;
        },
      },
      {
        name: 'completed',
        action: () => {
          this.props.setSidebarQueryParamsActionCreator!({
            completed: true,
          });
        },
        active: () => {
          const { routeParams } = this.props;
          return routeParams!.completed!;
        },
      },
      {
        name: 'published',
        action: () => {
          this.props.setSidebarQueryParamsActionCreator!({
            published: true,
          });
        },
        active: () => {
          const { routeParams } = this.props;
          return routeParams!.published!;
        },
      },
    ];
  }

  private renderCell = (item: DodayLike) => {
    const { routeParams } = this.props;
    if (routeParams!.published) {
      return (
        <ActivityCell
          doday={item as Activity}
          key={cuid()}
          onClick={this.handleDodayCellClick}
        />
      );
    }
    return (
      <ActivityProgressCell
        doday={item as Activity}
        key={cuid()}
        onClick={this.handleDodayCellClick}
        onComplete={() => {
          this.props.updateDodayActionCreator!({
            did: item.did,
            type: item.type,
            updates: {
              progress: {
                completed: !item.progress!.completed,
                completedAt: new Date(),
              },
            },
          });
        }}
      />
    );
  };

  render() {
    const { loading, routeParams, t } = this.props;
    const items =
      !routeParams!.completed && !routeParams!.published
        ? this.items!.filter(
            (item: Activity) =>
              !item.progress || (item.progress && !item.progress.pinned)
          )
        : this.items;
    const pinnedItems =
      !routeParams!.completed && !routeParams!.published
        ? this.items!.filter(
            (item: Activity) => item.progress && item.progress.pinned
          )
        : undefined;
    return (
      <>
        <DefaultTopBar title={t('name')} />
        <Grid
          t={t}
          search
          filters={[this.progressFilterItems]}
          loading={loading}
          items={items || []}
          pinnedItems={pinnedItems}
          renderCell={this.renderCell}
        />
      </>
    );
  }
}

const mapState = (state: RootState) => ({
  route: state.sidebar.route,
  routeParams: state.sidebar.routeParams,
  dodays: state.activities && (state.activities as ActivityToolState).dodays,
  myDID: state.auth.hero && state.auth.hero.did,
});

export const ActivitySidebar = connect(
  mapState,
  {
    ...actions,
    ...ducks.api.actions,
    ...ducks.sidebar.actions,
  }
)(ActivitySidebarComponentClass);
