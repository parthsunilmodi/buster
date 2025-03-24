import { useState, useRef, useEffect } from 'react';
import clockIcon from '../../assets/images/clock-icon.png';
import downArrow from '../../assets/images/downArrow.png';
import './CustomTimePicker.scss';

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
const minutes = ["00", "15", "30", "45"];
const periods = ["AM", "PM"];

const CustomTimePicker = ({ onChange }: { onChange: (time: string) => void }) => {
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (type: string, value: string) => {
    if (type === "hour") setSelectedHour(value);
    if (type === "minute") setSelectedMinute(value);
    if (type === "period") setSelectedPeriod(value);

    onChange(`${selectedHour}:${selectedMinute} ${selectedPeriod}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="custom-time-picker">
      <div className="time-input" onClick={() => setIsOpen(!isOpen)}>
        <img src={clockIcon} alt="calendarIcon" />
        {selectedHour} {selectedMinute} {selectedPeriod}
        <img src={downArrow} alt="dropdownIcon" />
      </div>
      {isOpen && (
        <div className="timepicker-dropdown-container" ref={dropdownRef}>
          <div className="timepicker-dropdown-column">
            <span className="label">hh</span>
            {hours.map((hour) => (
              <div
                key={hour}
                className={`dropdown-item ${selectedHour === hour ? "selected" : ""}`}
                onClick={() => handleSelect("hour", hour)}
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
                className={`dropdown-item ${selectedMinute === minute ? "selected" : ""}`}
                onClick={() => handleSelect("minute", minute)}
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
                className={`dropdown-item ${selectedPeriod === period ? "selected" : ""}`}
                onClick={() => handleSelect("period", period)}
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
