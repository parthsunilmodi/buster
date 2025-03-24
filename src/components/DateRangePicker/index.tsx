import { useRef, forwardRef } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import downArrow from '../../assets/images/downArrow.png';
import calendarIcon from '../../assets/images/calendar-icon.png';
import './DateRangePicker.scss';

type IInput = {
  startDate: string;
  endDate?: string;
  handleChange?: (el: any) => void;
  placeholder?: string;
  dateFormat?: string;
  setStartDate?: (value: any) => void
  setEndDate?: (value: any) => void
};

const CustomDateRange = (props:IInput) => {
  const { handleChange, placeholder, startDate, dateFormat} = props;
  const datePickerRef = useRef<any>(null);

  const updateDate = (date: Date | null) => {
    if (handleChange) {
      handleChange(date);
    }
  };
  const CalenderContainerWrapper = ({ className, children }: {className: string; children: React.ReactNode | React.ReactNode[] | undefined;}) => {
    return (
      <div className="pb-3 calender-bottom-wrapper shadow rounded justify-content-end d-flex flex-column align-items-end">
        <CalendarContainer className={`${ className } border-0`}>
          {children}
        </CalendarContainer>
      </div>
    );
  };
  const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <div className="custom-date-input" onClick={onClick} ref={ref}>
      {value || "Select Date"}
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
          maxDate={new Date()}
          selected={startDate}
          onChange={updateDate}
          dateFormat={dateFormat}
          calendarContainer={CalenderContainerWrapper}
          icon={
            <img src={calendarIcon} alt="calendarIcon" />
          }
          shouldCloseOnSelect={false}
          placeholderText={placeholder}
          dayClassName={(date) => date ? 'day-text-wrapper' : ''}
          customInput={<CustomInput />}
        />
      </div>
    </div>
  )
}
export default CustomDateRange;
