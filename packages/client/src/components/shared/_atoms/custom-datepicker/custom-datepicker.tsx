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
            onClick={onClick}
            className={css.customDatepicker}
          >{moment(props.selected).format('ll')}</Button>
        }
        selected={props.selected}
        onChange={props.onChange}
        {...props}
      />
    </div>
  );
};
