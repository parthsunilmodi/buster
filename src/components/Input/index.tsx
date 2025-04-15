import React, { ForwardedRef, forwardRef } from 'react';
import './InputField.scss';

interface IInputProps {
  label?: any;
  className?: string;
  inputStyle?: string;
  type?: 'text' | 'textarea' | 'email' | 'number' | 'tel';
  error?: string | boolean;
  isRequired?: boolean;
  value?: string;
  name?: string;
  maxLength?: number;
  onBlur?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  labelStyle?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  pattern?: string;
}

const InputField = forwardRef(
  (
    {
      label,
      className = '',
      inputStyle = '',
      type = 'text',
      error,
      value,
      name,
      maxLength,
      onBlur,
      placeholder,
      onChange,
      labelStyle,
      isRequired = false,
      disabled = false,
      inputMode,
      pattern,
      ...rest
    }: IInputProps,
    ref: ForwardedRef<null>
  ) => {
    return (
      <div className="form-input">
        {label && <label className={`label  ${isRequired ? 'required' : ''} ${labelStyle}`}>{label}</label>}
        <>
          {type === 'textarea' ? (
            <textarea
              className={`main-textarea ${className} ${error && 'error-input'}`}
              name={name}
              ref={ref}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              {...rest}
            />
          ) : (
            <div>
              <input
                ref={ref}
                type={type}
                inputMode={inputMode}
                pattern={pattern}
                value={value as string}
                name={name}
                maxLength={maxLength}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                onBlur={onBlur}
                className={`simple-input-wrapper ${disabled && 'disabled-input'} ${inputStyle || ''} ${error && 'error-input'}`}
                {...rest}
              />
            </div>
          )}
        </>
        {error && <p className="error-wrapper">{error}</p>}
      </div>
    );
  }
);

export default InputField;
