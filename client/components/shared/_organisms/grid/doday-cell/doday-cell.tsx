import * as React from 'react';
import classnames from 'classnames';
import { Doday, TypographySize } from '@lib/common-interfaces';
import { Checkbox, Text } from '@components';

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
      <Text
        text={doday.name}
        size={TypographySize.s}
        className={styles.cellTitle}
      />
    </li>
  );
};