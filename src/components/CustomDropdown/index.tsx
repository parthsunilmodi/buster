import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import DownArrow from '../../assets/images/downArrow.png';
import './CustomDropdown.scss';

interface OptionType {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  isRequired?: boolean;
  options: OptionType[];
  placeholder?: string;
  selectedValue?: string;
  onSelect?: (value: string) => void;
  onBlur?: () => void;
  defaultOption?: string;
  error?: string | boolean;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  label,
  isRequired = false,
  options,
  defaultOption,
  error,
  placeholder = 'Select an option',
  onSelect,
  onBlur,
}) => {
  const [selected, setSelected] = useState<string>(defaultOption ?? placeholder);

  const handleSelect = (eventKey: string | null) => {
    const selectedOption = options.find((option) => option.value === eventKey);
    if (selectedOption) {
      setSelected(selectedOption.label);
      onSelect?.(selectedOption.value);
    }
  };

  return (
    <div className="dropdown-container">
      <label className="label">
        {label && <label className={`label  ${isRequired ? 'required' : ''}`}>{label}</label>}
      </label>
      <Dropdown onSelect={handleSelect} onBlur={onBlur}>
        <Dropdown.Toggle variant="light" className={`dropdown-toggle ${error ? 'dropdown-error' : ''}`}>
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
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CustomDropdown;
