import * as React from 'react';
import { connect } from 'react-redux';
import * as cuid from 'cuid';
import { actions as appActions } from '@ducks/doday-app';
import { actions as dodayDetailsActions } from '@ducks/doday-details';
import { actions as settingsActions } from '@ducks/hero-settings';
import * as api from '@ducks/api';
import { TodayTopBar } from './today-top-bar/today-top-bar';
import { Grid, LayoutBlock, Text, Button, ButtonSize } from '@shared';
import {
  ChangeDodayAppDateAction,
  PlanOutAction,
  FetchDodaysWithProgressForDateAction,
  ChangeDodayAppRouteAction,
} from '@root/ducks/doday-app/actions';
import { RouteComponentProps } from 'react-router';
import { DodayTypes, DodayLike } from '@root/lib/models/entities/common';
import { FetchSelectedDodayAction } from '@root/ducks/doday-details/actions';
import {
  Space,
  ToolBeacon,
  DodayAppQueryParams,
  WithTools,
} from '@root/lib/common-interfaces';
import { durationToMinutes, isActivity } from '@root/lib/utils';
import { Activity } from '@root/lib/models/entities/Activity';
import { RootState } from '@root/lib/models';

const vars = require('@styles/_config.scss');
const css = require('./_doday-app.module.scss');

export interface DodayAppProps extends React.HTMLAttributes<HTMLElement> {}

interface PropsFromConnect {
  loading: boolean;
  route: string;
  routeParams: DodayAppQueryParams;
  dodays: DodayLike[];
  chosenDate?: Date;
  changeDodayAppDateActionCreator?: (date: Date) => ChangeDodayAppDateAction;
  changeDodayAppRouteActionCreator: (
    route: string
  ) => ChangeDodayAppRouteAction;
  // navStack: Goal[];
  // pushToNavStack: (doday: Goal) => PushToNavigationStackAction;
  // popFromNavStack: () => PopFromNavigationStackAction;
  fetchDodaysWithProgressForDateActionCreator: () => FetchDodaysWithProgressForDateAction;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  fetchSelectedDodayWithProgressActionCreator: (
    did: string
  ) => FetchSelectedDodayAction;
  planOutActionCreator: (date: number) => PlanOutAction;
}

export class DodayAppComponent extends React.Component<
  DodayAppProps &
    WithTools &
    Partial<PropsFromConnect> &
    Partial<RouteComponentProps>
> {
  componentDidMount() {
    const { activeTools, location } = this.props;
    activeTools.map(tool => {
      if (location.pathname.startsWith(tool.config.route)) {
        this.props.changeDodayAppRouteActionCreator(tool.config.route);
      }
    });
  }

  getDodaysToRender = () => {
    return this.props.dodays || [];
  };

  handleDodayCellClick = (route: string, doday: DodayLike) => {
    this.props.history.push(route);
  };

  renderCellByDodayType = (item: DodayLike, index) => {
    this.props.activeTools.map(tool => {
      const entity = tool.config.entities.find(
        entity => entity.type === item.type
      );
      if (entity != null) {
        const Tag = tool.components.cells[entity.type].progress;
        return (
          <Tag doday={item} key={cuid()} onClick={this.handleDodayCellClick} />
        );
      }
    });
  };

  private renderDodayApp = () => {
    const { activeTools, history, location, match } = this.props;
    const tool = activeTools.find(
      tool => tool.config.route === this.props.route
    );
    if (tool)
      return (
        <tool.components.dodayApp
          history={history}
          location={location}
          match={match}
        />
      );
    return null;
  };

  renderContent() {
    const { chosenDate, changeDodayAppDateActionCreator, loading } = this.props;

    const totalDurationOfTheDay = this.getDodaysToRender()
      .filter(
        doday =>
          doday.type === DodayTypes.Activity &&
          doday.progress &&
          !doday.progress.completed
      )
      .map((doday: DodayLike) => {
        const activity = isActivity(doday);
        return activity && durationToMinutes((doday as Activity).duration);
      })
      .reduce((a, b) => a + b, 0);

    return (
      <>
        <TodayTopBar
          date={chosenDate!}
          changeDate={changeDodayAppDateActionCreator!}
        />
        {totalDurationOfTheDay > 8 * 60 ? (
          <LayoutBlock
            className={css.bannerContainer}
            spaceAbove={Space.Small}
            direction="column"
            valign="vflex-center"
          >
            <Text>Your day is overloading!</Text>
            <Button
              onClick={() =>
                this.props.planOutActionCreator(chosenDate.getTime())
              }
              primary
              size={ButtonSize.small}
            >
              Plan out!
            </Button>
          </LayoutBlock>
        ) : null}
        <Grid
          loading={loading}
          items={this.getDodaysToRender()}
          renderCell={this.renderCellByDodayType}
        />
      </>
    );
  }

  render() {
    return (
      <section className={css.dodayappContainer}>
        {this.renderDodayApp()}
      </section>
    );
  }
}

const mapState = ({ dodayApp }: RootState) => ({
  loading: dodayApp.status.loading,
  route: dodayApp.status.route,
  routeParams: dodayApp.status.routeParams,
  chosenDate: dodayApp.schedule.chosenDate,
  dodays: dodayApp.schedule.dodays,
});

export default connect(
  mapState,
  {
    ...appActions,
    ...settingsActions,
    ...dodayDetailsActions,
    ...api.dodays.actions,
  }
)(DodayAppComponent);
