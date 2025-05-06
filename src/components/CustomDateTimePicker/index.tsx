import React from 'react';
import { DatePicker, TimePicker } from 'antd';
import type { DatePickerProps, TimePickerProps } from 'antd';
import moment from 'moment';

type PickerType = 'time' | 'date';

interface CustomDateTimePickerProps {
  type: PickerType;
  onChange: (value: moment.Moment | null, dateString: string) => void;
  value?: moment.Moment | null;
  disabled?: boolean;
  placeholder?: string;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  type,
  onChange,
  value,
  disabled = false,
  placeholder,
}) => {
  if (type === 'time') {
    return (
      <TimePicker
        onChange={onChange as TimePickerProps['onChange']}
        value={value as any}
        format="hh:mm A"
        use12Hours
        disabled={disabled}
        placeholder={placeholder || 'Select time'}
      />
    );
  }

  if (type === 'date') {
    return (
      <DatePicker
        onChange={onChange as DatePickerProps['onChange']}
        value={value as any}
        format="MM/DD/YYYY"
        disabled={disabled}
        placeholder={placeholder || 'Select date'}
      />
    );
  }

  return null;
};

export default CustomDateTimePicker;