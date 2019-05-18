import * as React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import * as moment from 'moment';
import { Button } from '../button';
import { ButtonGroup } from '../../_molecules/button-group';
import { Icons } from '@shared';
import { DodayColor } from '@root/lib/common-interfaces';

const css = require('./custom-datepicker.scss');

interface DatePickerProps {
  lightBorder?: boolean;
  borderless?: boolean;
  icon?: React.ReactElement<any>;
  onClick?: () => void;
  withLocker?: boolean;
  isLocked?: boolean;
  onLocked?: () => void;
}

export const CustomDatePicker = ({
  lightBorder,
  icon,
  onClick,
  borderless,
  withLocker,
  isLocked,
  onLocked,
  disabled,
  ...props
}: DatePickerProps & ReactDatePickerProps) => {
  return (
    <div>
      <ButtonGroup>
        <DatePicker
          customInput={
            <Button
              icon={icon}
              lightBorder={lightBorder}
              borderless={borderless}
              onClick={onClick}
              disabled={isLocked}
            >
              {moment(props.selected).format('ll')}
            </Button>
          }
          selected={props.selected}
          onChange={props.onChange}
          disabled={disabled}
          {...props}
        />
        {withLocker ? (
          <Button
            onClick={onLocked}
            active={isLocked}
            activeColor={DodayColor.gray4}
            disabled={disabled}
            lightBorder
          >
            {isLocked ? (
              <Icons.Locked width={24} height={24} />
            ) : (
              <Icons.Unlocked width={24} height={24} />
            )}
          </Button>
        ) : null}
      </ButtonGroup>
    </div>
  );
};
