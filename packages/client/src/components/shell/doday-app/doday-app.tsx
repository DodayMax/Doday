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
} from '@root/ducks/doday-app/actions';
import { RouteComponentProps } from 'react-router';
import { DodayTypes, DodayLike } from '@root/lib/models/entities/common';
import { FetchSelectedDodayAction } from '@root/ducks/doday-details/actions';
import { Space } from '@root/lib/common-interfaces';
import { durationToMinutes, isActivity } from '@root/lib/utils';
import { Activity } from '@root/lib/models/entities/Activity';
import { RootState } from '@root/lib/models';
import { toolBeacons } from '@root/tools';

const vars = require('@styles/_config.scss');
const css = require('./_doday-app.module.scss');

interface DodayAppProps extends React.HTMLAttributes<HTMLElement> {}

interface PropsFromConnect {
  loading: boolean;
  dodays: DodayLike[];
  chosenDate?: Date;
  changeDodayAppDateActionCreator?: (date: Date) => ChangeDodayAppDateAction;
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
  DodayAppProps & Partial<PropsFromConnect> & Partial<RouteComponentProps>
> {
  getDodaysToRender = () => {
    return this.props.dodays || [];
  };

  handleDodayCellClick = (route: string, doday: DodayLike) => {
    this.props.history.push(route);
  };

  renderCellByDodayType = (item: DodayLike, index) => {
    toolBeacons.map(tool => {
      if (tool.config.types.find(type => type === item.type)) {
        return (
          <tool.components.cells.progress
            doday={item}
            key={cuid()}
            onClick={this.handleDodayCellClick}
          />
        );
      }
    });
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
      <section className={css.dodayappContainer}>{this.props.children}</section>
    );
  }
}

const mapState = ({ dodayApp }: RootState) => ({
  loading: dodayApp.status.loading,
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
