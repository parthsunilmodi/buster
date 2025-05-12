import React from 'react';
import dayjs from 'dayjs';
import moment, { Moment } from 'moment';
import { TimePicker } from 'antd';
import './CustomTimePicker.scss';

type TimePickerProps = {
  value?: Moment | null; // Accepts a pre-set time like "03:15PM"
  onChange?: (time: Moment) => void;
};

const CustomTimePicker = ({ value, onChange }: TimePickerProps) => {
  return (
    <div className="custom-time-picker">
      <TimePicker
        use12Hours
        minuteStep={15}
        className="custom-time-picker-input"
        popupClassName="custom-time-picker-popup"
        value={value ? dayjs(value.toDate()) : null}
        onChange={(time) => {
          if (time && time.isValid() && onChange) {
            onChange(moment(time.toDate()));
          }
        }}
        format="h:mm A"
        allowClear={false}
        placeholder="Select time"
      />
    </div>
  );
};

export default CustomTimePicker;
