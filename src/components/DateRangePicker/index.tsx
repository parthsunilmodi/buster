import React, { useRef, forwardRef } from 'react';
import moment from 'moment';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import downArrow from '../../assets/images/downArrow.png';
import calendarIcon from '../../assets/images/calendar-icon.png';
import './DateRangePicker.scss';

type IInput = {
  startDate: Date | null;
  handleChange?: (date: string) => void;
  placeholder?: string;
  dateFormat?: string;
  minDate?: Date | null;
};

const CustomDateRange = (props: IInput) => {
  const { handleChange, minDate, placeholder, startDate, dateFormat = 'M/d/yyyy' } = props;

  const datePickerRef = useRef<any>(null);

  const minDateToUse = minDate || moment().add(1, 'day').toDate();

  const updateDate = (date: Date | null) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return;
    }
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    if (handleChange) {
      handleChange(formattedDate);
    }
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };

  const CalenderContainerWrapper = ({
    className,
    children,
  }: {
    className: string;
    children: React.ReactNode | React.ReactNode[] | undefined;
  }) => {
    return (
      <div className="pb-3 calender-bottom-wrapper shadow rounded justify-content-end d-flex flex-column align-items-end">
        <CalendarContainer className={`${className} border-0`}>{children}</CalendarContainer>
      </div>
    );
  };

  const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <div className="custom-date-input" onClick={onClick} ref={ref}>
      {value || 'Select Date'}
      <img src={downArrow} alt="dropdownIcon" />
    </div>
  ));

  return (
    <div className="date-range-main">
      <div className="date-range-contain">
        <DatePicker
          showIcon
          toggleCalendarOnIconClick
          ref={datePickerRef}
          selected={startDate}
          onChange={updateDate}
          dateFormat={dateFormat}
          minDate={minDateToUse} 
          calendarContainer={CalenderContainerWrapper}
          icon={<img src={calendarIcon} alt="calendarIcon" />}
          placeholderText={placeholder}
          customInput={<CustomInput />}
        />
      </div>
    </div>
  );
};

export default CustomDateRange;
