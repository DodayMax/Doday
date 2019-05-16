import * as React from 'react';
import classnames from 'classnames';
import { Icons, Badge, Text } from '@shared';
import { TypographySize, DrawerMenuItem } from '@root/lib/common-interfaces';

const css = require('./_doday-app-menu-cell.module.scss');

interface DodayAppMenuCellProps {
  item: DrawerMenuItem;
  active: boolean;
  onClick: (item: DrawerMenuItem) => void;
  collapsed: boolean;
}

export const DodayAppMenuCell: React.FC<DodayAppMenuCellProps> = ({
  item,
  active,
  onClick,
  collapsed,
}) => {
  const Icon = Icons[item.icon];
  const classNames = classnames({
    [css.cell]: true,
    [css.active]: active,
    [css.center]: collapsed,
    [css.paddingLeft]: !collapsed,
  });
  const badgeContainer = classnames({
    [css.badgeContainer]: !collapsed,
    [css.badgeBg]: true,
  });

  if (collapsed) {
    return (
      <li className={classNames} onClick={() => onClick(item)}>
        {item.badge == null && <Icon />}
        {item.badge != null && (
          <div className={badgeContainer}>
            <Badge value={item.badge} />
          </div>
        )}
      </li>
    );
  } else {
    return (
      <>
        <li className={classNames} onClick={() => onClick(item)}>
          {<Icon />}
          <Text size={TypographySize.s} className={css.cellTitle}>
            {item.text}
          </Text>
          {item.badge != null && (
            <div className={badgeContainer}>
              <Badge value={item.badge} />
            </div>
          )}
        </li>
      </>
    );
  }
};
