import * as React from 'react';
import { connect } from 'react-redux';
import * as queryString from 'query-string';
import { RouteComponentProps } from 'react-router';
import * as cuid from 'cuid';
import { DefaultTopBar, DodayApp } from '@root/components';
import { Grid, Input } from '@root/components/shared';
import { DodayLike, DodayTypes } from '@root/lib/models/entities/common';
import { ActivityProgressCell } from './cells/app-cell/activity-progress-cell';
import { ActivityCell } from './cells/app-cell/activity-cell';
import { Activity } from '@root/lib/models/entities/activity';
import { RootState } from '@root/lib/models';
import { routes } from '@tools/activities/config';
import { actions } from '@tools/activities/duck';
import { DodaysWithProgressQueryParams } from '@root/services/api/dodays/queries';
import { FetchActivitiesWithProgressAction } from '../../duck/actions';

interface ActivityDodayAppProps {
  loading: boolean;
}

interface PropsFromConnect {
  inprogress: Activity[];
  completed: Activity[];
  created: Activity[];
  fetchActivitiesWithProgressActionCreator: (
    params: DodaysWithProgressQueryParams
  ) => FetchActivitiesWithProgressAction;
}

class ActivityDodayApp extends React.Component<
  ActivityDodayAppProps &
    Partial<PropsFromConnect> &
    Partial<RouteComponentProps>
> {
  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    if (!queryParams.completed && !queryParams.created) {
      // Fetch in progress dodays
      this.props.fetchActivitiesWithProgressActionCreator({
        dodaytype: DodayTypes.Activity,
        completed: false,
      });
    } else if (queryParams.completed) {
      // Fetch completed dodays
      this.props.fetchActivitiesWithProgressActionCreator({
        dodaytype: DodayTypes.Activity,
        completed: true,
      });
    } else if (queryParams.published) {
      // Fetch created (published) dodays
    }
  }

  private handleDodayCellClick = (route: string, doday: DodayLike) => {
    this.props.history.push(route);
  };

  private get items() {
    const { inprogress, completed, created } = this.props;
    const queryParams = queryString.parse(this.props.location.search);
    if (!queryParams.completed && !queryParams.created) {
      return inprogress;
    } else if (queryParams.completed) {
      return completed;
    } else if (queryParams.published) {
      return created;
    }
  }

  private get progressFilterItems() {
    return [
      {
        name: 'in progress',
        action: () => {
          this.props.history.push(routes.path);
          this.props.fetchActivitiesWithProgressActionCreator({
            dodaytype: DodayTypes.Activity,
            completed: false,
          });
        },
        active: (location, match) => {
          const queryParams = queryString.parse(location.search);
          return !queryParams.completed && !queryParams.published;
        },
      },
      {
        name: 'completed',
        action: () => {
          this.props.history.push(`${routes.path}?completed=true`);
          this.props.fetchActivitiesWithProgressActionCreator({
            dodaytype: DodayTypes.Activity,
            completed: true,
          });
        },
        active: (location, match) => {
          const queryParams = queryString.parse(location.search);
          return queryParams.completed;
        },
      },
      {
        name: 'published',
        action: this.props.history.push,
        payload: `${routes.path}?published=true`,
        active: (location, match) => {
          const queryParams = queryString.parse(location.search);
          return queryParams.published;
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
      <DodayApp>
        <DefaultTopBar title={'Activities'} />
        <Input />
        <Grid
          filters={[this.progressFilterItems]}
          loading={loading}
          items={this.items}
          renderCell={this.renderCell}
        />
      </DodayApp>
    );
  }
}

const mapState = (state: RootState) => ({
  inprogress: state.dodayApp.tools.activities.inprogress,
  completed: state.dodayApp.tools.activities.completed,
  created: state.dodayApp.tools.activities.created,
});

export default connect(
  mapState,
  { ...actions }
)(ActivityDodayApp);
