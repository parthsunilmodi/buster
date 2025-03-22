import { useRef } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import calendarIcon from '../../assets/images/calendar-icon.png';
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
      </div>
    );
  };

  return (
    <div className="date-range-main">
      <div className="date-range-contain">
        <DatePicker
          ref={datePickerRef}
          maxDate={new Date()}
          selectsRange
          startDate={startDate}
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
          showIcon
          icon={
            <img src={calendarIcon} alt="calendarIcon" />
          }

        />
      </div>
    </div>
  )
}
export default CustomDateRange;
