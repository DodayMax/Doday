import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from '@ducks/doday-app';
import { TopBar } from './top-bar/top-bar';
import { Doday } from '@lib/common-interfaces';
import { Grid } from '@components';
import { dodayApp } from '@lib/constants';

const styles = require('./_doday-app.module.scss');

interface DodayAppProps {
  dodays: Doday[];
  path?: string;
}

export class DodayAppComponent extends React.Component<DodayAppProps> {
  renderContent() {
    const path = this.props.path;

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
            <TopBar />
            <Grid items={this.props.dodays || []} cellType="DodayCell" />
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
  path: dodayApp.path
});

export default connect(mapState, { ...actions })(DodayAppComponent);