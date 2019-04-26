import * as React from 'react';
import { connect } from 'react-redux';
import * as cuid from 'cuid';
import { actions as appActions } from '@ducks/doday-app';
import { actions as dodayDetailsActions } from '@ducks/doday-details';
import { actions as settingsActions } from '@ducks/hero-settings';
import { TodayTopBar } from './today-top-bar/today-top-bar';
import { DefaultTopBar } from './default-top-bar/default-top-bar';
import { Grid, Icons } from '@components';
import {
  ChangeDodayAppDateAction,
  FetchAllGoalsAction,
  PushToNavigationStackAction,
  ToggleDodayAction,
  PlanOutAction,
} from '@root/ducks/doday-app/actions';
import {
  PopFromNavigationStackAction,
  FetchDodayForDate,
} from '@root/ducks/doday-app/actions';
import { DodayCell, GoalCell, PublicCell } from '../shared/_organisms/grid';
import { RouteComponentProps } from 'react-router';
import { Doday } from '@root/lib/models/entities/Doday';
import { DodayTypes } from '@root/lib/models/entities/dodayTypes';
import { Goal } from '@root/lib/models/entities/Goal';
import { FetchSelectedDodayAction } from '@root/ducks/doday-details/actions';
import { ClickableIcon } from '../shared/_atoms/clickable-icon/clickable-icon';
import { DodayAppPaths, Space } from '@root/lib/common-interfaces';
import { LayoutBlock } from '../shared/_atoms/layout-block';
import { Text } from '../shared/_atoms/typography';
import { Button, ButtonSize } from '../shared/_atoms/button';
import { durationToMinutes } from '@root/lib/utils';
import { Activity } from '@root/lib/models/entities/Activity';
import { Progress } from '@root/lib/models/entities/Progress';

const vars = require('@styles/_config.scss');
const css = require('./_doday-app.module.scss');

interface DodayAppProps {
  path?: DodayAppPaths;
}

interface PropsFromConnect {
  loading: boolean;
  dodays: Progress[];
  publicDodays: Doday[];
  goals: Goal[];
  chosenDate?: Date;
  changeDateActionCreator?: (date: Date) => ChangeDodayAppDateAction;
  navStack: Goal[];
  pushToNavStack: (doday: Goal) => PushToNavigationStackAction;
  popFromNavStack: () => PopFromNavigationStackAction;
  fetchDodaysForDate: () => FetchDodayForDate;
  fetchAllGoalsActionCreator: () => FetchAllGoalsAction;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  fetchSelectedDodayWithProgressActionCreator: (
    did: string
  ) => FetchSelectedDodayAction;
  toggleDoday: (doday: Doday) => ToggleDodayAction;
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

  handleDodayCellClick = (route: string, doday: Doday) => {
    this.props.history.push(route);
  };

  getGoalsToRender = () => {
    const navStack = this.props.navStack;
    if (navStack.length > 0) {
      return navStack[navStack.length - 1].children || [];
    } else {
      return this.props.goals || [];
    }
  };

  handleGoalCellClick = (goal: Goal) => {
    // push goal to navigation stack
    this.props.pushToNavStack(goal);
  };

  renderCellByDodayType = (item: Doday | Goal, index) => {
    switch (item.type) {
      case DodayTypes.Activity:
        if (item.public) {
          return (
            <PublicCell
              doday={item}
              key={cuid()}
              onClick={this.handleDodayCellClick}
              onComplete={(doday: Doday) => this.props.toggleDoday(doday)}
            />
          );
        }
        return (
          <DodayCell
            doday={item}
            key={cuid()}
            onClick={this.handleDodayCellClick}
            onComplete={(doday: Doday) => this.props.toggleDoday(doday)}
          />
        );
      case DodayTypes.Goal:
        return (
          <GoalCell
            goal={item as Goal}
            key={cuid()}
            onClick={this.handleGoalCellClick}
          />
        );
      default:
        <DodayCell
          doday={item}
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
      navStack,
    } = this.props;

    const totalDurationOfTheDay = this.getDodaysToRender()
      .filter(
        progress =>
          progress.doday.type === DodayTypes.Activity && !progress.completed
      )
      .map((a: Progress) => durationToMinutes(a.doday.duration))
      .reduce((a, b) => a + b, 0);

    switch (path) {
      case 'goals':
        return (
          <>
            <DefaultTopBar
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
            />
          </>
        );
      case 'memos':
        return <div>Memos</div>;
      case 'public':
        return (
          <>
            <Grid
              loading={loading}
              items={this.props.publicDodays}
              renderCell={this.renderCellByDodayType}
            />
          </>
        );
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
