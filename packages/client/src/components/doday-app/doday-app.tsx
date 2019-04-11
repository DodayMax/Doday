import * as React from 'react';
import { connect } from 'react-redux';
import * as cuid from 'cuid';
import { actions as appActions } from '@ducks/doday-app';
import { actions as dodayDetailsActions } from '@ducks/doday-details';
import { actions as settingsActions } from '@ducks/hero-settings';
import { TodayTopBar } from './today-top-bar/today-top-bar';
import { DefaultTopBar } from './default-top-bar/default-top-bar';
import { Grid } from '@components';
import { dodayApp } from '@lib/constants';
import {
  ChangeDodayAppDateAction,
  FetchAllGoalsAction,
  PushToNavigationStackAction,
  ToggleDodayAction,
} from '@root/ducks/doday-app/actions';
import {
  PopFromNavigationStackAction,
  FetchDodayForDate,
} from '@root/ducks/doday-app/actions';
import { DodayCell, GoalCell } from '../shared/_organisms/grid';
import { RouteComponentProps } from 'react-router';
import { Doday } from '@root/lib/models/entities/Doday';
import { DodayTypes } from '@root/lib/models/entities/dodayTypes';
import { Goal } from '@root/lib/models/entities/Goal';
import { FetchSelectedDodayAction } from '@root/ducks/doday-details/actions';

const styles = require('./_doday-app.module.scss');

interface DodayAppProps {
  path?: string;
}

interface PropsFromConnect {
  loading: boolean;
  dodays: (Doday | Goal)[];
  goals: Goal[];
  chosenDate?: Date;
  changeDateActionCreator?: (date: Date) => ChangeDodayAppDateAction;
  navStack: Goal[];
  pushToNavStack: (doday: Goal) => PushToNavigationStackAction;
  popFromNavStack: () => PopFromNavigationStackAction;
  fetchDodaysForDate: () => FetchDodayForDate;
  fetchAllGoalsActionCreator: () => FetchAllGoalsAction;
  fetchSelectedDodayActionCreator: (did: string) => FetchSelectedDodayAction;
  toggleDoday: (doday: Doday) => ToggleDodayAction;
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

  handleDodayCellClick = (route: string, did: string) => {
    this.props.history.push(route);
    this.props.fetchSelectedDodayActionCreator(did);
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
      case DodayTypes.Doday:
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
            goal={item}
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
      changeDateActionCreator,
      loading,
      navStack,
    } = this.props;

    switch (path) {
      case dodayApp.paths.goals:
        return (
          <>
            <DefaultTopBar
              title={
                (navStack.length > 0 && navStack[navStack.length - 1].name) ||
                'Goals'
              }
              back={navStack.length > 0}
              backAction={this.props.popFromNavStack}
            />
            <Grid
              loading={loading}
              items={this.getGoalsToRender()}
              renderCell={this.renderCellByDodayType}
            />
          </>
        );
      case dodayApp.paths.memos:
        return <div>Memos</div>;
      case dodayApp.paths.createdByMe:
        return <div>CreatedByMe</div>;
      default:
        return (
          <>
            <TodayTopBar
              date={chosenDate!}
              changeDate={changeDateActionCreator!}
            />
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
      <section className={styles.dodayappContainer}>
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
  navStack: dodayApp.navStack,
});

export default connect(
  mapState,
  { ...appActions, ...settingsActions, ...dodayDetailsActions }
)(DodayAppComponent);
