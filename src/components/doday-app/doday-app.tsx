import * as React from 'react';
import { connect } from 'react-redux';
import { actions as appActions } from '@ducks/doday-app';
import { actions as settingsActions } from '@ducks/hero-settings';
import { TodayTopBar } from './today-top-bar/today-top-bar';
import { Grid } from '@components';
import { dodayApp } from '@lib/constants';
import { ChangeDateAction } from '@root/ducks/hero-settings/actions';
import { Doday } from '@root/lib/common-interfaces';

const styles = require('./_doday-app.module.scss');

interface DodayAppProps {
  dodays: Doday[];
  path?: string;
}

interface StateProps {
  chosenDate?: Date;
  changeDate?: (date: Date) => ChangeDateAction;
}

export class DodayAppComponent extends React.Component<DodayAppProps & StateProps> {
  renderContent() {
    const { path, chosenDate, changeDate } = this.props;

    switch (path) {
      case dodayApp.paths.actions:
        return (
          <div>Actions</div>
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
            <TodayTopBar date={chosenDate!} changeDate={changeDate!} />
            <Grid items={this.props.dodays || []} />
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

const mapState = ({ dodayApp, heroSettings }) => ({
  path: dodayApp.path,
  chosenDate: heroSettings.chosenDate,
});

export default connect(mapState, { ...appActions, ...settingsActions })(DodayAppComponent);