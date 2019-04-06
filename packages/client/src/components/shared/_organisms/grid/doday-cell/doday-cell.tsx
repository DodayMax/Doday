import * as React from 'react';
import classnames from 'classnames';
import { TypographySize } from '@lib/common-interfaces';
import { Checkbox, Text } from '@components';
import { Doday } from '@root/lib/models/entities/Doday';

const styles = require('./_doday-cell.module.scss');

interface DodayCellProps {
  doday: Doday;
  active?: boolean;
  onClick?: (route: string) => void;
}

export const DodayCell: React.SFC<DodayCellProps> = ({
  doday,
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
      key={doday.did}
      onClick={() => onClick && onClick(`/dodays/${doday.did}`)}
    >
      {
        <Checkbox
          onClick={e => console.log('complete')}
          checked={doday.completed}
        />
      }
      <Text
        text={doday.name}
        size={TypographySize.s}
        className={styles.cellTitle}
      />
    </li>
  );
};
