import React from 'react';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import './DateRangePicker.scss';

type IInput = {
  startDate: Date | null;
  handleChange?: (date: string) => void;
  placeholder?: string;
  dateFormat?: string;
  minDate?: Date | null;
};

// Convert the input dateFormat (if provided) from JavaScript format to dayjs format
const getDayjsFormat = (format: string): string => {
  // Convert from JavaScript date format to dayjs format
  return format
    .replace('yyyy', 'YYYY')
    .replace('yy', 'YY')
    .replace('MM', 'MM')
    .replace('dd', 'DD')
    .replace('d', 'D')
    .replace('m', 'M');
};

const CustomDateRange = (props: IInput) => {
  const { handleChange, minDate, placeholder, dateFormat = 'M/d/yyyy' } = props;

  const dayjsFormat = getDayjsFormat(dateFormat);

  const updateDate = (date: Dayjs | null) => {
    // Check if date is valid
    if (!date || !date.isValid()) {
      return;
    }

    // Format the date using dayjs
    const formattedDate = date.format(dayjsFormat);

    if (handleChange) {
      handleChange(formattedDate);
    }
  };

  const minDateDayjs = minDate ? dayjs(minDate) : undefined;

  return (
    <div className="date-range-main">
      <div className="date-range-contain">
        <DatePicker
          onChange={updateDate}
          format={dayjsFormat}
          minDate={minDateDayjs || dayjs()}
          placeholder={placeholder}
          className="antd-custom-date-range-picker"
          popupClassName="antd-custom-date-range-popup"
        />
      </div>
    </div>
  );
};

export default CustomDateRange;
