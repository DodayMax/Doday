import * as React from 'react';
import { TopBar } from './top-bar/TopBar';
import { Doday } from '@lib/common-interfaces';
import { Grid } from '@components';

const styles = require('./_doday-app.module.scss');

interface DodayAppProps {
  dodays: Doday[];
}

export class DodayApp extends React.Component<DodayAppProps> {
  render() {
    return (
      <section className={styles.dodayappContainer}>
        <TopBar />
        <Grid items={this.props.dodays || []} />
      </section>
    );
  }
}