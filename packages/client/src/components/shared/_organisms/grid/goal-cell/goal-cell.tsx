import * as React from 'react';
import classnames from 'classnames';
import { TypographySize } from '@lib/common-interfaces';
import { Icons, Text } from '@components';
import { Goal } from '@root/lib/models/entities/Goal';

const css = require('./_goal-cell.module.scss');

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
    [css.cell]: true,
    [css.active]: active,
  });

  return (
    <li
      className={classNames}
      key={goal.did}
      onClick={() => onClick && onClick(goal)}
    >
      {<Icons.Goal width={30} height={30} />}
      <Text ellipsize size={TypographySize.s} className={css.cellTitle}>
        {goal.name}
      </Text>
      <div className={css.goalStatsContainer}>
        <span>{`${Math.round(
          (goal.children.filter(goal => goal.completed).length /
            goal.children.length) *
            100
        )}%`}</span>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 0,
          width: '.6rem',
          height: '100%',
          backgroundColor: goal.color,
        }}
      />
    </li>
  );
};
