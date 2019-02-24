import * as React from 'react';
import { Icons } from '@components';

const styles = require('./_checkbox.module.scss');

interface CheckboxProps {
  checked?: boolean;
  onClick: () => void; 
}

export const Checkbox = ({ checked = false, onClick }: CheckboxProps) => {
  return (
    <div role="checkbox" onClick={onClick}>
      <Icons.Checkbox checked={checked} />
    </div>
  );
}