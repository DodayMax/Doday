import * as React from 'react';
import { connect } from 'react-redux';
import * as cuid from 'cuid';
import { actions as appActions } from '@ducks/doday-app';
import { actions as dodayDetailsActions } from '@ducks/doday-details';
import { actions as settingsActions } from '@ducks/hero-settings';
import { TodayTopBar } from './today-top-bar/today-top-bar';
import { Grid, Icons } from '@components';
import {
  ChangeDodayAppDateAction,
  FetchAllGoalsAction,
  ToggleDodayAction,
  PlanOutAction,
} from '@root/ducks/doday-app/actions';
import {
  PopFromNavigationStackAction,
  FetchDodayForDate,
} from '@root/ducks/doday-app/actions';
import { RouteComponentProps } from 'react-router';
import {
  DodayTypes,
  DodayLikeProgress,
  DodayLike,
} from '@root/lib/models/entities/common';
import { FetchSelectedDodayAction } from '@root/ducks/doday-details/actions';
import { DodayAppPaths, Space } from '@root/lib/common-interfaces';
import { LayoutBlock } from '../shared/_atoms/layout-block';
import { Text } from '../shared/_atoms/typography';
import { Button, ButtonSize } from '../shared/_atoms/button';
import { durationToMinutes, isActivity } from '@root/lib/utils';
import { Activity } from '@root/lib/models/entities/Activity';
import { ActivityCell } from '../tools/activities/app-cell/activity-cell';

const vars = require('@styles/_config.scss');
const css = require('./_doday-app.module.scss');

interface DodayAppProps {
  path?: DodayAppPaths;
}

interface PropsFromConnect {
  loading: boolean;
  dodays: DodayLikeProgress[];
  publicDodays: DodayLike[];
  chosenDate?: Date;
  changeDateActionCreator?: (date: Date) => ChangeDodayAppDateAction;
  // navStack: Goal[];
  // pushToNavStack: (doday: Goal) => PushToNavigationStackAction;
  popFromNavStack: () => PopFromNavigationStackAction;
  fetchDodaysForDate: () => FetchDodayForDate;
  fetchAllGoalsActionCreator: () => FetchAllGoalsAction;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  fetchSelectedDodayWithProgressActionCreator: (
    did: string
  ) => FetchSelectedDodayAction;
  toggleDoday: (doday: Activity) => ToggleDodayAction;
  planOutActionCreator: (date: number) => PlanOutAction;
}

export class DodayAppComponent extends React.Component<
  DodayAppProps & PropsFromConnect & RouteComponentProps
> {
  componentDidMount() {
    this.props.fetchDodaysForDate();
    this.props.fetchAllGoalsActionCreator();
  }

  getDodaysToRender = () => {
    return this.props.dodays || [];
  };

  handleDodayCellClick = (route: string, doday: DodayLike) => {
    this.props.history.push(route);
  };

  // getGoalsToRender = () => {
  //   const navStack = this.props.navStack;
  //   if (navStack.length > 0) {
  //     return navStack[navStack.length - 1].children || [];
  //   } else {
  //     return this.props.goals || [];
  //   }
  // };

  // handleGoalCellClick = (goal: Goal) => {
  //   // push goal to navigation stack
  //   this.props.pushToNavStack(goal);
  // };

  renderCellByDodayType = (item: DodayLike, index) => {
    switch (item.type) {
      case DodayTypes.Activity:
        return (
          <ActivityCell
            doday={item as Activity}
            key={cuid()}
            onClick={this.handleDodayCellClick}
          />
        );
      default:
        <ActivityCell
          doday={item as Activity}
          key={cuid()}
          onClick={this.handleDodayCellClick}
        />;
    }
  };

  renderContent() {
    const {
      path,
      chosenDate,
      history,
      changeDateActionCreator,
      popFromNavStack,
      loading,
      // navStack,
    } = this.props;

    const totalDurationOfTheDay = this.getDodaysToRender()
      .filter(
        progress =>
          progress.origin.type === DodayTypes.Activity && !progress.completed
      )
      .map((a: DodayLikeProgress) => {
        const doday = a.origin;
        const activity = isActivity(doday);
        return activity && durationToMinutes((doday as Activity).duration);
      })
      .reduce((a, b) => a + b, 0);

    switch (path) {
      case 'goals':
        return (
          <>
            {/* <DefaultTopBar
              title={
                (navStack.length > 0 && navStack[navStack.length - 1].name) ||
                'Goals'
              }
              leftAction={
                !!navStack.length && (
                  <ClickableIcon
                    border
                    rounded
                    text={'back '}
                    background={vars.gray1}
                    onClick={popFromNavStack}
                  >
                    <Icons.Chevron />
                  </ClickableIcon>
                )
              }
              rightAction={
                !!navStack.length && (
                  <ClickableIcon
                    background={vars.gray1}
                    onClick={() =>
                      history.push(
                        `/goals/${navStack[navStack.length - 1].did}`
                      )
                    }
                  >
                    <Icons.Settings />
                  </ClickableIcon>
                )
              }
            />
            <Grid
              loading={loading}
              items={this.getGoalsToRender()}
              renderCell={this.renderCellByDodayType}
            /> */}
          </>
        );
      case 'memos':
        return <div>Memos</div>;
      default:
        return (
          <>
            <TodayTopBar
              date={chosenDate!}
              changeDate={changeDateActionCreator!}
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
  }

  render() {
    return (
      <section className={css.dodayappContainer}>
        {this.renderContent()}
      </section>
    );
  }
}

const mapState = ({ dodayApp }) => ({
  path: dodayApp.path,
  loading: dodayApp.loading,
  chosenDate: dodayApp.chosenDate,
  dodays: dodayApp.dodays,
  goals: dodayApp.goals,
  publicDodays: dodayApp.public,
  navStack: dodayApp.navStack,
});

export default connect(
  mapState,
  { ...appActions, ...settingsActions, ...dodayDetailsActions }
)(DodayAppComponent);
