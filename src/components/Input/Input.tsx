import React, { ForwardedRef, forwardRef } from 'react';
import './InputField.scss';

interface IInputProps  {
  label?: any;
  className?: string;
  inputStyle?: string;
  htmlFor?: string;
  suffix?: React.ReactNode | React.ReactElement;
  type?: 'text' | 'textarea' | 'email' | 'number';
  error?: string;
  isRequired?: boolean;
  value?: string;
  name?: string;
  maxLength?: number;
  onBlur?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  touched?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const InputField = forwardRef(
  (
    {
      label,
      className = '',
      inputStyle = '',
      htmlFor,
      type = 'text',
      error,
      value,
      name,
      maxLength,
      touched,
      onBlur,
      placeholder,
      onChange,
      suffix,
      isRequired = false,
      disabled = false,
      ...rest
    }: IInputProps,
    ref: ForwardedRef<null>
  ) => {
    const formGroupClass = `form-input ${className} ${(error && value) && 'error-input'}`;

    return (
      <div className={formGroupClass}>
        <label className={`label  ${isRequired ? "required" : ""}`}>
          {label}
          {suffix && <div>{suffix}</div>}
        </label>
        <>
          {type === 'textarea' ? (
            <textarea
              className={`main-textarea ${className} ${(error && touched) && 'error-input'}`}
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
            <div className={`simple-input-wrapper ${disabled && "disabled-input"} ${inputStyle || ''} ${(error && touched) && 'error-input'}`}>
              <input
                ref={ref}
                type={type}
                value={value as string}
                name={name}
                maxLength={maxLength}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                onBlur={onBlur}
                className='input-fixes'
                {...rest}
              />
            </div>
          )}
        </>
      </div>
    );
  }
);

export default InputField;
