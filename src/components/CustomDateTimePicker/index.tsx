import React from 'react';
import { TimePicker } from 'antd';
import type { TimePickerProps } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
// import './TimePicker.scss';

interface CustomDateTimePickerProps {
  onChange: (value: moment.Moment | null, dateString: string) => void;
  value?: moment.Moment | null;
  disabled?: boolean;
  placeholder?: string;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  onChange,
  value,
  disabled = false,
  placeholder,
}) => {
  const onLocalTimeChange: TimePickerProps['onChange'] = (time, timeString) => {
    if (time && time.isValid()) {
      const localTime = time.clone().locale();
      onChange(moment(localTime), typeof timeString === 'string' ? timeString : '');
    }
  };

  // convert the value from moment to dayjs
  const convertedValue = value ? dayjs(value.toDate()) : null;

  return (
    <TimePicker
      use12Hours
      className="custom-time-picker"
      popupClassName="custom-time-picker-popup"
      value={convertedValue}
      placeholder={placeholder}
      disabled={disabled}
      format="h:mm A"
      onChange={onLocalTimeChange}
    />
  );
};

export default CustomDateTimePicker;
