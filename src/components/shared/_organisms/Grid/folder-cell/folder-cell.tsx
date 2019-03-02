import * as React from 'react';
import classnames from 'classnames';
import { Doday } from '@lib/common-interfaces';
import { Icons } from '@components';

const styles = require('./_folder-cell.module.scss');

interface FolderCellProps {
  doday: Doday;
  active?: boolean;
  onClick?: (folder: Doday) => void;
}

export const FolderCell: React.SFC<FolderCellProps> = ({ doday, active = false, onClick }) => {
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
      {<Icons.FolderPlus />}
      <span className={styles.cellTitle}>{doday.name}</span>
    </li>
  );
};