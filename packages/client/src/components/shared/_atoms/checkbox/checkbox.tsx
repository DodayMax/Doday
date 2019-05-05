import * as React from 'react';
import { Icons } from '@shared';

const css = require('./_checkbox.module.scss');

interface CheckboxProps {
  checked?: boolean;
  colorMarker?: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Checkbox = ({
  checked = false,
  onClick,
  colorMarker,
}: CheckboxProps) => {
  return (
    <div className={css.checkboxContainer} role="checkbox" onClick={onClick}>
      {colorMarker && (
        <div
          className={css.colorMarker}
          style={{ backgroundColor: colorMarker }}
        />
      )}
      <Icons.Checkbox width={30} height={30} checked={checked} />
    </div>
  );
};
