import * as React from 'react';
import './_dodaytopbar.scss';

interface DodayTopBarProps {
  coins: string | number;
  energy: string | number;
}

export const DodayTopBar = ({ coins, energy }: DodayTopBarProps) => {
  return (
    <div className="dodaytopbar__container">
      <div className="coins">{coins}</div>
      <div className="logo">logo</div>
      <div className="energy">{energy}</div>
    </div>
  );
}