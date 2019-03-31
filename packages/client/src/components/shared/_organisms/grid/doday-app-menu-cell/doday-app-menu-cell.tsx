import * as React from 'react';
import classnames from 'classnames';
import { Icons, Badge, Text } from '@components';
import { DrawerMenuItem } from '@root/components/drawer';
import { TypographySize } from '@root/lib/common-interfaces';

const styles = require('./_doday-app-menu-cell.module.scss');

interface DodayAppMenuCellProps {
  item: DrawerMenuItem;
  onClick: () => void;
  active: boolean;
  collapsed: boolean;
}

export const DodayAppMenuCell: React.SFC<DodayAppMenuCellProps> = ({ item, onClick, active, collapsed }) => {
  const Icon = Icons[item.icon];
  const classNames = classnames({
    [styles.cell]: true,
    [styles.active]: active,
    [styles.center]: collapsed,
  });
  const badgeContainer = classnames({
    [styles.badgeContainer]: !collapsed,
    [styles.badgeBg]: true,
  });

  if (collapsed) {
    return (
      <li
        className={classNames}
        onClick={onClick}
      >
        {item.badge == null && <Icon />}
        {item.badge != null &&
          <div className={badgeContainer}>
            <Badge value={item.badge} />
          </div>
        }
      </li>
    );
  } else {
    return (
      <li
        className={classNames}
        onClick={onClick}
      >
        {<Icon />}
        <Text
          text={item.text}
          size={TypographySize.s}
          className={styles.cellTitle} />
        {item.badge != null &&
          <div className={badgeContainer}>
            <Badge value={item.badge} />
          </div>
        }
      </li>
    );
  }
};