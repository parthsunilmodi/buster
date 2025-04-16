import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import clockIcon from '../../assets/images/clock-icon.png';
import downArrow from '../../assets/images/downArrow.png';
import './CustomTimePicker.scss';

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutes = ['00', '15', '30', '45'];
const periods = ['AM', 'PM'];

type TimePickerProps = {
  value?: string; // Accepts a pre-set time like "03:15PM"
  onChange?: (time: string) => void;
  minTime?: string;
};

const CustomTimePicker = ({ value, onChange, minTime }: TimePickerProps) => {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const timeMatch = value.match(/^(\d{2}):(\d{2})(AM|PM)$/);
      if (timeMatch) {
        const [, hour, minute, period] = timeMatch;
        setSelectedHour(hour);
        setSelectedMinute(minute);
        setSelectedPeriod(period);
      }
    }
  }, [value]);

  useEffect(() => {
    onChange?.(`${selectedHour}:${selectedMinute}${selectedPeriod}`);
  }, [selectedHour, selectedMinute, selectedPeriod]);

  const handleSelect = (type: string, value: string) => {
    if (type === 'hour') setSelectedHour(value);
    if (type === 'minute') setSelectedMinute(value);
    if (type === 'period') setSelectedPeriod(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isDisabled = (hour: string, minute: string, period: string) => {
    if (!minTime) return false;

    if (!minute || !period) return false;

    const selectedTime = moment(`${hour}:${minute}${period}`, 'hh:mmA');
    const minTimeMoment = moment(minTime, 'hh:mmA');

    return selectedTime.isBefore(minTimeMoment);
  };

  const isDisabledMinute = (minute: string) => {
    if (!minTime || !selectedHour || !selectedPeriod) return false;
  
    const selectedTime = moment(`${selectedHour}:${minute}${selectedPeriod}`, 'hh:mmA');
    const minTimeMoment = moment(minTime, 'hh:mmA');
  
    const sameHour = selectedTime.hour() === minTimeMoment.hour();
    if (sameHour) {
      return selectedTime.minute() < minTimeMoment.minute();
    }
  
    return selectedTime.isBefore(minTimeMoment);
  };
  
  return (
    <div className="custom-time-picker">
      <div className="time-input" onClick={() => setIsOpen(!isOpen)}>
        <img src={clockIcon} alt="clockIcon" />
        <span>
          {selectedHour} {selectedHour ? ':' : ''}
          {selectedMinute}
          {selectedPeriod}
        </span>
        <img src={downArrow} alt="dropdownIcon" />
      </div>

      {isOpen && (
        <div className="timepicker-dropdown-container" ref={dropdownRef}>
          <div className="timepicker-dropdown-column">
            <span className="label">hh</span>
            {hours.map((hour) => (
              <div
                key={hour}
                className={`dropdown-item ${selectedHour === hour ? 'selected' : ''} ${
                  isDisabled(hour, selectedMinute || '00', selectedPeriod || 'AM') ? 'disabled' : ''
                }`}
                onClick={() => {
                  if (!isDisabled(hour, selectedMinute || '00', selectedPeriod || 'AM')) {
                    handleSelect('hour', hour);
                  }
                }}
              >
                {hour}
              </div>
            ))}
          </div>

          <div className="timepicker-dropdown-column">
            <span className="label">mm</span>
            {minutes.map((minute) => {
              const disabled = isDisabledMinute(minute);
              return (
                <div
                  key={minute}
                  className={`dropdown-item ${selectedMinute === minute ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                  onClick={() => {
                    if (!disabled) handleSelect('minute', minute);
                  }}
                >
                  {minute}
                </div>
              );
            })}
          </div>

          <div className="timepicker-dropdown-column">
            <span className="label">A</span>
            {periods.map((period) => (
              <div
                key={period}
                className={`dropdown-item ${selectedPeriod === period ? 'selected' : ''}`}
                onClick={() => handleSelect('period', period)}
              >
                {period}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTimePicker;
