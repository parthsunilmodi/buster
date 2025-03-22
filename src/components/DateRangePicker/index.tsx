import React, { useRef } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import Button from '../Button';
import './DateRangePicker.scss';

type IInput = {
  startDate: string;
  endDate: string;
  handleChange: (el?: any) => void;
  handleChangeRaw: (el?: any) => void;
  placeholder: string;
  dateFormat: string;
  setStartDate: (value: any) => void
  setEndDate: (value: any) => void
};

const CustomDateRange = (props:IInput) => {
  const { handleChange, placeholder, handleChangeRaw, startDate, endDate, dateFormat, setEndDate, setStartDate } = props;
  const datePickerRef = useRef<any>(null);

  const handleCancel = () => {
    setStartDate('')
    setEndDate('')
    handleChange(['', ''])
    datePickerRef?.current?.setOpen(false);
  };

  const handleDone = () => {
    if (startDate && endDate) {
      handleChange([startDate, endDate]);
    }
    datePickerRef?.current?.setOpen(false);
  };

  const updateDate = (date:any) => {
    setStartDate(date[0])
    setEndDate(date[1])
  }

  const CalenderContainerWrapper = ({ className, children }: {className: string; children: React.ReactNode | React.ReactNode[] | undefined;}) => {
    return (
      <div className="pb-3 calender-bottom-wrapper shadow rounded justify-content-end d-flex flex-column align-items-end">
        <CalendarContainer className={`${ className } border-0`}>
          {children}
        </CalendarContainer>
        <hr className="m-0 hr-wrapper"/>
        <div className="d-flex align-items-end w-75 justify-content-end gap-3 pe-3">
          <Button
            title="Cancel"
            className="cancel-btn-wrapper"
            onClick={handleCancel}
          />
          <Button
            title="Done"
            className="apply-btn-wrapper"
            onClick={handleDone}
            disabled={!(startDate || endDate)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="date-range-main">
      <div className="date-range-contain">
        <DatePicker
          ref={datePickerRef}
          maxDate={new Date()}
          showIcon
          selectsRange
          // @ts-ignore
          startDate={startDate}
          // @ts-ignore
          endDate={endDate}
          dayClassName={(date) => date ? 'day-text-wrapper' : ''}
          toggleCalendarOnIconClick
          onChange={(dates: any) => {
            if (Array.isArray(dates)) updateDate(dates);
          }}
          dateFormat={dateFormat}
          placeholderText={placeholder}
          onChangeRaw={handleChangeRaw}
          shouldCloseOnSelect={false}
          calendarContainer={CalenderContainerWrapper}

        />
      </div>
    </div>
  )
}
export default CustomDateRange;
