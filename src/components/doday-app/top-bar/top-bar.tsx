import * as React from 'react';

const styles = require('./_top-bar.module.scss');

export class TopBar extends React.Component {
  render() {
    return (
      <div className={styles.topbarContainer}>
        <div>{'<'}</div>
        <div>12 feb (Tue)</div>
        <div>{'>'}</div>
      </div>
    );
  }
}