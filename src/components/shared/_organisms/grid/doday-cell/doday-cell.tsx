import * as React from 'react';
import { Doday } from '@lib/common-interfaces';
import { Checkbox } from '@components';

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
      {<Checkbox onClick={(e) => console.log('complete')} checked={doday.completed} />}
      <span className={styles.cellTitle}>{doday.name}</span>
    </li>
  );
};