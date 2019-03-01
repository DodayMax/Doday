import * as React from 'react';
import * as cuid from 'cuid';
import classnames from 'classnames';
import { Icons } from '@components';
import { DrawerMenuItem } from '@root/components/drawer';

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

  if (collapsed) {
    return (
      <li
        className={classNames}
        key={cuid()}
        onClick={onClick}
      >
        {<Icon />}
      </li>
    );
  } else {
    return (
      <li
        className={classNames}
        key={cuid()}
        onClick={onClick}
      >
        {<Icon />}
        <span id="#cell-title" className={styles.cellTitle}>{item.text}</span>
      </li>
    );
  }
};