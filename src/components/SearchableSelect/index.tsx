import React, { useState } from 'react';
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
  name:string;
  isRequired?: boolean;
  onSelect?: (value: string) => void
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
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchValue(query);
    setFilteredOptions(
      options.filter((opt) => opt.label.toLowerCase().includes(query.toLowerCase()))
    );
    setShowDropdown(true);
    onChange(query);

  };

  const handleSelect = (option: Option) => {
    setSearchValue(option.label);
    setShowDropdown(false);
    onSelect(option.value);
  };

  return (
    <div className="searchable-select-container">
      <Form.Label className={`label ${isRequired ? "required" : ""} ${labelStyle || ''}`}>
        {label}
      </Form.Label>
      <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)}>
        <Dropdown.Toggle className="search-input" disabled={disabled}>
          <Form.Control
            type="text"
            name={name}
            value={searchValue}
            placeholder={placeholder}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(true)}
            disabled={disabled}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <Dropdown.Item key={option.value} onClick={() => handleSelect(option)}>
                {option.label}
              </Dropdown.Item>
            ))
          ) : (
             <Dropdown.Item disabled>Not Found</Dropdown.Item>
           )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SearchableSelect;
