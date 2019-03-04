import * as React from 'react';
import { connect } from 'react-redux';
import { actions as appActions } from '@ducks/doday-app';
import { actions as settingsActions } from '@ducks/hero-settings';
import { TodayTopBar } from './today-top-bar/today-top-bar';
import { DefaultTopBar } from './default-top-bar/default-top-bar';
import { Grid } from '@components';
import { dodayApp } from '@lib/constants';
import { ChangeDateAction, FetchAllGoals } from '@root/ducks/doday-app/actions';
import { Doday } from '@root/lib/common-interfaces';
import { PopFromNavigationStackAction, FetchDodayForDate } from '@root/ducks/doday-app/actions';

const styles = require('./_doday-app.module.scss');

interface DodayAppProps {
  path?: string;
}

interface PropsFromConnect {
  loading: boolean;
  dodays: Doday[];
  goals: Doday[];
  chosenDate?: Date;
  changeDate?: (date: Date) => ChangeDateAction;
  navStack: Doday[];
  popFromNavStack: () => PopFromNavigationStackAction;
  fetchDodaysForDate: () => FetchDodayForDate;
  fetchAllGoals: () => FetchAllGoals;
}

export class DodayAppComponent extends React.Component<DodayAppProps & PropsFromConnect> {
  componentDidMount() {
    this.props.fetchDodaysForDate();
    this.props.fetchAllGoals();
  }

  getDodaysToRender = () => {
    return this.props.dodays || [];
  }

  getGoalsToRender = () => {
    const navStack = this.props.navStack;
    if (navStack.length > 0) {
      return navStack[navStack.length - 1].children || [];
    } else {
      return this.props.goals || [];
    }
  }

  renderContent() {
    const { path, chosenDate, changeDate, loading, navStack } = this.props;

    switch (path) {
      case dodayApp.paths.goals:
        return (
          <>
            <DefaultTopBar
              title={(navStack.length > 0 && navStack[navStack.length - 1].name) || 'Goals'}
              back={navStack.length > 0}
              backAction={this.props.popFromNavStack} />
            <Grid loading={loading} items={this.getGoalsToRender()} /> 
          </>
        );
      case dodayApp.paths.memos:
        return (
          <div>Memos</div>
        );
      case dodayApp.paths.createdByMe:
        return (
          <div>CreatedByMe</div>
        );
      default:
        return (
          <>
            <TodayTopBar
              back={this.props.navStack.length > 0}
              backAction={this.props.popFromNavStack}
              date={chosenDate!}
              changeDate={changeDate!} />
            <Grid loading={loading} items={this.getDodaysToRender()} />
          </>
        );
    }
  }

  render() {
    return (
      <section className={styles.dodayappContainer}>
        { this.renderContent() }
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

export default connect(mapState, { ...appActions, ...settingsActions })(DodayAppComponent);