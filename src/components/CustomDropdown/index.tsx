import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import DownArrow from '../../assets/downArrow.png'
import "./CustomDropdown.scss";

interface DropdownProps {
  label: string;
  options: string[];
  placeholder?: string;
  onSelect: (value: string) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({ label, options, placeholder = "Select an option", onSelect }) => {
  const [selected, setSelected] = useState<string>(placeholder);

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSelected(eventKey);
      onSelect(eventKey);
    }
  };

  return (
    <div className="dropdownContainer">
      <label>{label}</label>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="light" className="dropdownToggle">
          {selected}
          <img src={DownArrow} alt="Dropdown Arrow" className="customArrow" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((option, index) => (
            <Dropdown.Item key={index} eventKey={option}>
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CustomDropdown;
