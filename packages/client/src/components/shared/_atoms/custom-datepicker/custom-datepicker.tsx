import * as React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import * as moment from 'moment';
import { Button } from '../button';

const css = require('./custom-datepicker.scss');

interface DatePickerProps {
  lightBorder?: boolean;
  borderless?: boolean;
  icon?: React.ReactElement<any>;
  onClick?: () => void;
}

export const CustomDatePicker = ({
  lightBorder,
  icon,
  onClick,
  borderless,
  ...props
}: DatePickerProps & ReactDatePickerProps) => {
  return (
    <div>
      <DatePicker
        customInput={
          <Button
            icon={icon}
            borderless={borderless}
            text={moment(props.selected).format('ll')}
            onClick={onClick}
            className={css.customDatepicker}
          />
        }
        selected={props.selected}
        onChange={props.onChange}
        {...props}
      />
    </div>
  );
};
