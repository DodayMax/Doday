import * as React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import * as moment from 'moment';
import { Button } from '../button';

const css = require('./editable-datepicker.scss');

interface EditableDatePickerProps {
  onClick?: () => void;
}

export const EditableDatePicker = ({
  onClick,
  ...props
}: EditableDatePickerProps & ReactDatePickerProps) => {
  return (
    <DatePicker
      customInput={
        <Button
          borderless
          text={moment(props.selected).format('ll')}
          onClick={onClick}
          className={css.editableDatepicker}
        />
      }
      selected={props.selected}
      onChange={props.onChange}
      {...props}
    />
  );
};
