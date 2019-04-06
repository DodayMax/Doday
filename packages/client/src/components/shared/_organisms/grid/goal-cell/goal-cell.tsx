import * as React from 'react';
import classnames from 'classnames';
import { TypographySize } from '@lib/common-interfaces';
import { Icons, Text } from '@components';
import { Goal } from '@root/lib/models/entities/Goal';

const styles = require('./_goal-cell.module.scss');

interface GoalCellProps {
  goal: Goal;
  active?: boolean;
  onClick?: (goal: Goal) => void;
}

export const GoalCell: React.SFC<GoalCellProps> = ({
  goal,
  active = false,
  onClick,
}) => {
  const classNames = classnames({
    [styles.cell]: true,
    [styles.active]: active,
  });

  return (
    <li
      className={classNames}
      key={goal.did}
      onClick={() => onClick && onClick(goal)}
    >
      {<Icons.Goal width={30} height={30} />}
      <Text
        ellipsize
        text={goal.name}
        size={TypographySize.s}
        className={styles.cellTitle}
      />
    </li>
  );
};
