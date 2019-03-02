import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import classnames from 'classnames';
import { Doday } from '@lib/common-interfaces';
import { Checkbox } from '@components';

const styles = require('./_doday-cell.module.scss');

interface DodayCellProps {
  doday: Doday;
  active?: boolean;
}

export const DodayCell: React.ComponentClass<DodayCellProps & any, any> = withRouter<DodayCellProps & RouteComponentProps>(({ history, doday, active = false }) => {
  const classNames = classnames({
    [styles.cell]: true,
    [styles.active]: active,
  });

  return (
    <li
      className={classNames}
      key={doday.id}
      onClick={() => history.push(`/dodays/${doday.id}`)}
    >
      {<Checkbox onClick={(e) => console.log('complete')} checked={doday.completed} />}
      <span className={styles.cellTitle}>{doday.name}</span>
    </li>
  );
});