import * as React from 'react';
import { TopBar } from './top-bar/TopBar';

const styles = require('./_doday-app.module.scss');

export class DodayApp extends React.Component {
  render() {
    return (
      <section className={styles.dodayappContainer}>
        <TopBar />
      </section>
    );
  }
}