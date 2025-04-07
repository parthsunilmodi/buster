import React, { useEffect, useState } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchableSelect.scss';

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label: string;
  labelStyle?: string;
  name: string;
  isRequired?: boolean;
  onSelect?: (value: string) => void;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
   options = [],
   value = '',
   onChange,
   placeholder,
   disabled = false,
   label,
   labelStyle,
   onSelect,
   name,
   isRequired = false
  }) => {
  const [searchValue, setSearchValue] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchValue(query);
    onChange(query);
    setShowDropdown(query.length > 0 && options.length > 0); // Only show dropdown if there are options
  };

  const handleSelect = (option: Option) => {
    setSearchValue(option.label);
    setShowDropdown(false);
    onSelect?.(option.value); // Ensure selected value updates parent state
  };

  return (
    <div className="searchable-select-container">
      <Form.Label className={`label ${isRequired ? 'required' : ''} ${labelStyle || ''}`}>
        {label}
      </Form.Label>
      <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen && options.length > 0)}>
        <Dropdown.Toggle className="search-input" disabled={disabled}>
          <Form.Control
            type="text"
            name={name}
            value={searchValue}
            placeholder={placeholder}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(options.length > 0)}
            disabled={disabled}
          />
        </Dropdown.Toggle>
        {options.length > 0 && (
          <Dropdown.Menu className="dropdown-menu">
            {options.map((option) => (
              <Dropdown.Item key={option.value} onClick={() => handleSelect(option)}>
                {option.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
      </Dropdown>
    </div>
  );
};

export default SearchableSelect;
