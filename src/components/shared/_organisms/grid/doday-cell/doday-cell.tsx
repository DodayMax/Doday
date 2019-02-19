import * as React from 'react';
import { Doday } from '@lib/common-interfaces';

const styles = require('./_doday-cell.module.scss');

interface DodayCellProps {
  doday: Doday;
}

export const DodayCell: React.SFC<DodayCellProps> = ({ doday }) => {
  return (
    <li
      className={styles.cellContainer}
      key={doday.id}
    >
      {<input type="checkbox" className={styles.cellCheckbox} onChange={(e) => console.log('complete')} checked={doday.completed} />}
      <span className={styles.cellTitle}>{doday.name}</span>
    </li>
  );
};