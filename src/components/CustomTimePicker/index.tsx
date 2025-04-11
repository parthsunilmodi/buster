import React, { useState, useRef, useEffect } from 'react';
import clockIcon from '../../assets/images/clock-icon.png';
import downArrow from '../../assets/images/downArrow.png';
import './CustomTimePicker.scss';

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutes = ['00', '15', '30', '45'];
const periods = ['AM', 'PM'];

type TimePickerProps = {
  value?: string; // Accepts a pre-set time like "03:15PM"
  onChange?: (time: string) => void;
};

const CustomTimePicker = ({ value, onChange }: TimePickerProps) => {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Parse initial value on mount
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

  // ✅ Trigger onChange when all parts are selected
  useEffect(() => {
    if (selectedHour && selectedMinute && selectedPeriod) {
      onChange?.(`${selectedHour}:${selectedMinute}${selectedPeriod}`);
    }
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
                className={`dropdown-item ${selectedHour === hour ? 'selected' : ''}`}
                onClick={() => handleSelect('hour', hour)}
              >
                {hour}
              </div>
            ))}
          </div>

          <div className="timepicker-dropdown-column">
            <span className="label">mm</span>
            {minutes.map((minute) => (
              <div
                key={minute}
                className={`dropdown-item ${selectedMinute === minute ? 'selected' : ''}`}
                onClick={() => handleSelect('minute', minute)}
              >
                {minute}
              </div>
            ))}
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
