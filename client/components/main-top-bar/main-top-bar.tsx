import * as React from 'react';
import * as moment from 'moment';

const styles = require('./_maintopbar.module.scss');

interface DodayTopBarProps {
  coins: string | number;
  energy: string | number;
}

export const DodayTopBar = ({ coins, energy }: DodayTopBarProps) => {
  const today = moment().format('ll');
  return (
    <div className={styles.dodaytopbarContainer}>
      <div className="coins">{coins}</div>
      <div className="logo">{today}</div>
      <div className="energy">{energy}</div>
    </div>
  );
}