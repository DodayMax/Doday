import * as React from 'react';

interface DodayTopBarProps {
  coins: string | number;
  energy: string | number;
  toggle: () => void;
}

export const DodayTopBar = ({ coins, energy, toggle }: DodayTopBarProps) => {
  return (
    <div className="dodaytopbar__container">
      <button onClick={toggle}>=</button>
      <div className="coins">{coins}</div>
      <div className="logo">logo</div>
      <div className="energy">{energy}</div>
    </div>
  );
}