import * as React from 'react';
import { Icons } from '@shared';
import { ActivityType } from '@root/lib/common-interfaces';
import { activityIconByType } from '@root/tools/activity/components/builders/activity-builder';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';

interface CheckboxProps {
  checked?: boolean;
  colorMarker?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  activityType: ActivityType;
}

const css = (theme: Theme) =>
  createStyles({
    checkboxContainer: {
      position: 'relative',
      height: '3.6rem',
    },
    colorMarker: {
      position: 'absolute',
      left: 0,
      width: '0.8rem',
      height: '0.8rem',
      borderRadius: '100%',
      border: `1px solid ${theme.palette.grey[900]}`,
    },
  });

export const Checkbox = withStyles(css)(
  ({
    checked = false,
    onClick,
    colorMarker,
    classes,
  }: CheckboxProps & WithStyles) => {
    return (
      <div
        className={classes.checkboxContainer}
        role="checkbox"
        onClick={onClick}
      >
        {colorMarker && (
          <div
            className={classes.colorMarker}
            style={{ backgroundColor: colorMarker }}
          />
        )}
        <Icons.Checkbox width={30} height={30} checked={checked} />
      </div>
    );
  }
);
