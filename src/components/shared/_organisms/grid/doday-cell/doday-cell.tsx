import * as React from 'react';
import classnames from 'classnames';
import { Doday } from '@lib/common-interfaces';
import { Checkbox } from '@components';

const styles = require('./_doday-cell.module.scss');

interface DodayCellProps {
  doday: Doday;
  active?: boolean;
  onClick?: (route: string) => void;
}

export const DodayCell: React.SFC<DodayCellProps> = ({ doday, active = false, onClick }) => {
  const classNames = classnames({
    [styles.cell]: true,
    [styles.active]: active,
  });

  return (
    <li
      className={classNames}
      key={doday.id}
      onClick={() => onClick && onClick(`/dodays/${doday.id}`)}
    >
      {<Checkbox onClick={(e) => console.log('complete')} checked={doday.completed} />}
      <span className={styles.cellTitle}>{doday.name}</span>
    </li>
  );
};