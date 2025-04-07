import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import DownArrow from '../../assets/images/downArrow.png'
import './CustomDropdown.scss';

interface DropdownProps {
  label: string;
  options: string[];
  placeholder?: string;
  onSelect: (value: string) => void;
  defaultOption?: string;
}

const CustomDropdown: React.FC<DropdownProps> = ({ label, options, defaultOption, placeholder, onSelect }) => {
  const [selected, setSelected] = useState<string>(defaultOption ? defaultOption : placeholder);

  const handleSelect = (eventKey: string | null) => {
    const selectedOption = options.find(option => option.value === eventKey);
    if (selectedOption) {
      setSelected(selectedOption.label);
      onSelect(selectedOption.value);
    }
  };


  return (
    <div className="dropdown-container">
      <label className="label">{label}</label>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="light" className="dropdown-toggle">
          {selected}
          <img src={DownArrow} alt="Dropdown Arrow" className="customArrow" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {defaultOption && <Dropdown.Item disabled>{defaultOption}</Dropdown.Item>}
          {options.map((option, index) => (
            <Dropdown.Item key={index} eventKey={option.value}>
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CustomDropdown;
