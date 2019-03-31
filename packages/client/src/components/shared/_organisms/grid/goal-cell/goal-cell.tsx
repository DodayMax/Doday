import * as React from 'react';
import classnames from 'classnames';
import { Doday, TypographySize } from '@lib/common-interfaces';
import { Icons, Text } from '@components';

const styles = require('./_goal-cell.module.scss');

interface GoalCellProps {
  doday: Doday;
  active?: boolean;
  onClick?: (goal: Doday) => void;
}

export const GoalCell: React.SFC<GoalCellProps> = ({ doday, active = false, onClick }) => {
  const classNames = classnames({
    [styles.cell]: true,
    [styles.active]: active,
  });

  return (
    <li
      className={classNames}
      key={doday.id}
      onClick={() => onClick && onClick(doday)}
    >
      {<Icons.Goal width={30} height={30} />}
      <Text
        ellipsize
        text={doday.name}
        size={TypographySize.s}
        className={styles.cellTitle}
      />
    </li>
  );
};