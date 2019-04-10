import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import { Button } from '../button';

const css = require('./editable-datepicker.scss');

interface EditableDatePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
  onClick?: () => void;
}

export const EditableDatePicker = ({
  selectedDate,
  onChange,
  onClick,
}: EditableDatePickerProps) => {
  return (
    <DatePicker
      minDate={new Date()}
      customInput={
        <Button
          borderless
          text={moment(selectedDate).format('ll')}
          onClick={onClick}
          className={css.editableDatepicker}
        />
      }
      selected={selectedDate}
      onChange={onChange}
    />
  );
};
