import * as React from 'react';
import { Icons } from '@components';

const styles = require('./_checkbox.module.scss');

interface CheckboxProps {
  checked?: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void; 
}

export const Checkbox = ({ checked = false, onClick }: CheckboxProps) => {
  return (
    <div className={styles.checkboxConainer} role="checkbox" onClick={onClick}>
      <Icons.Checkbox width={30} height={30} checked={checked} />
    </div>
  );
}