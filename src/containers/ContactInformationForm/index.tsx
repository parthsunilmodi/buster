import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Row, Col, Button, Dropdown } from 'react-bootstrap';
import { useDataContext } from '../../context/dataContext';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import reviewers from '../../assets/images/reviewers.png';
import { FormDataType, Stop } from '../../context/types';
import { ValidateEmail, ValidatePhoneNumber } from '../../api';
import ReviewAndSubmit from '../ReviewAndSubmit/index';
import InputField from '../../components/Input';
import { countryCodes } from '../../constants/data.constant';
import DownArrow from '../../assets/images/downArrow.png';
import './ContactInformationForm.scss';

const errorMappingObj: any = {
  first_name: 'First name is required',
  last_name: 'Last name is required',
  email: 'E-mail is required',
  phone: 'Phone number is required',
  account_name: 'Company is required',
  passengers: 'Passengers is required',
  stops: 'Stops are required',
  segment_c: 'Group type is required',
  preferred_coach_type_c: 'Bus type is required',
};

interface CountryCodeDropdownProps {
  options: { label: string; value: string; code: string }[];
  selectedValue: string;
  selectedDisplay: string;
  onSelect: (value: string) => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CountryCodeDropdown: React.FC<CountryCodeDropdownProps> = ({ options, selectedDisplay, onSelect }) => {
  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      onSelect(eventKey);
    }
  };

  return (
    <div className="dropdown-container">
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="light" className="dropdown-toggle">
          {selectedDisplay}
          <img src={DownArrow} alt="Dropdown Arrow" className="customArrow" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
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

const ContactInformationForm = () => {
  const { formData, handleSetFormData, errors, setErrors, handleSetErrors, timeDuration } = useDataContext();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [country, setCountry] = useState<{ countryCode: CountryCode | ''; countryCallingCode: string }>({
    countryCode: '',
    countryCallingCode: '',
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
  const [selectedCountryDisplay, setSelectedCountryDisplay] = useState('🇺🇸 +1');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data?.country_code && data?.country_calling_code) {
          setCountry({
            countryCode: data.country_code as CountryCode,
            countryCallingCode: data.country_calling_code,
          });
        }
      })
      .catch((err) => {
        console.error('Failed to detect country:', err);
        setCountry({
          countryCode: '',
          countryCallingCode: '',
        });
      });
  }, []);

  const handleCheckboxChange = () => {
    handleSetFormData({ sms_opt_in: !formData.sms_opt_in });
  };

  const validatePhone = (countryCode: string, number: string) => {
    if (countryCode && number) {
      try {
        const fullPhoneNumber = countryCode + number;
        const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber);
        if (phoneNumber && phoneNumber.isValid()) {
          handleSetFormData({ phoneWithCode: phoneNumber.number });
          setErrors((prev: any) => ({ ...prev, phone: undefined }));
        } else {
          setErrors((prev: any) => ({ ...prev, phone: 'Invalid phone number' }));
        }
      } catch (err) {
        console.error('Phone parse error:', err);
        setErrors((prev: any) => ({ ...prev, phone: 'Invalid phone number' }));
      }
    }
  };

  const handleCountryCodeChange = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
    // Find the country code object to get the country code for libphonenumber-js
    const countryData = countryCodes.find((cc) => cc.value === countryCode);
    if (countryData) {
      setSelectedCountryDisplay(`${countryData.label.split(' ')[0]} ${countryCode}`); // Show flag + code only
      setCountry({
        countryCode: countryData.code as CountryCode,
        countryCallingCode: countryCode,
      });
    }

    if (formData.phone) {
      validatePhone(countryCode, formData.phone);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (value.length === 1 && value === ' ') return;

    let sanitizedValue = value;
    if (name === 'phone') {
      // Allow only numbers (no + sign since it's handled by dropdown)
      sanitizedValue = value.replace(/[^0-9]/g, '');
    }

    handleSetFormData({ [name]: sanitizedValue });

    if (errors[name]) {
      handleSetErrors({ ...errors, [name]: undefined });
    }

    if (name === 'phone') {
      if (country.countryCode && sanitizedValue) {
        validatePhone(selectedCountryCode, sanitizedValue);
      }
    }

    if (name === 'email') {
      if (sanitizedValue && !emailRegex.test(sanitizedValue)) {
        setErrors((prev: any) => ({
          ...prev,
          email: 'Invalid email format',
        }));
      } else {
        setErrors((prev: any) => ({ ...prev, email: undefined }));
      }
    }
  };

  const validateField = () => {
    let errors: any = {};
    const validateFields = [
      'first_name',
      'last_name',
      'email',
      'phone',
      // 'account_name',
      'passengers',
      'stops',
      // 'segment_c',
      // 'preferred_coach_type_c',
    ];

    if (formData.description.trim().length === 0) {
      validateFields.push('passengers');
      validateFields.push('segment_c');
      validateFields.push('preferred_coach_type_c');
    }

    Object.keys(formData).forEach((key) => {
      if (validateFields.includes(key)) {
        const value = formData[key as keyof FormDataType];

        if (key === 'stops' && formData.description.trim().length === 0) {
          const stops = value as Array<Stop>;
          stops.forEach((stop, index) => {
            if (index === stops.length - 1) return;

            const prevStop = stops[index - 1];

            const travelDurationInSeconds = timeDuration?.[index - 1];

            if (prevStop && stop.depart_date && stop.depart_time && prevStop.depart_time && prevStop.depart_date) {
              const prevDateTime = moment(`${prevStop.depart_date} ${prevStop.depart_time}`, 'M/D/YYYY hh:mmA');
              const currentDateTime = moment(`${stop.depart_date} ${stop.depart_time}`, 'M/D/YYYY hh:mmA');

              if (travelDurationInSeconds) {
                const arrivalMoment = moment(prevDateTime).add(travelDurationInSeconds, 'seconds');

                if (!currentDateTime.isSameOrAfter(arrivalMoment)) {
                  const minimumTime = arrivalMoment.format('MMM D, YYYY [at] h:mm A');
                  errors = {
                    ...errors,
                    [`${key}-${stop.id}`]: {
                      ...errors[`${key}-${stop.id}`],
                      depart_time: `Departure time can't be before estimated arrival time (${minimumTime})`,
                    },
                  };
                }
              } else {
                if (!currentDateTime.isAfter(prevDateTime)) {
                  errors = {
                    ...errors,
                    [`${key}-${stop.id}`]: {
                      ...errors[`${key}-${stop.id}`],
                      depart_time: `Departure time must be after the previous stop.`,
                    },
                  };
                }
              }
            }

            if (index === 0) {
              if (!stop.isDataFilledWithAPI) {
                errors = {
                  ...errors,
                  [`${key}-${stop.id}`]: {
                    ...errors[`${key}-${stop.id}`],
                    description: 'Start point is required',
                  },
                };
              }
              if (!stop.depart_date) {
                errors = {
                  ...errors,
                  [`${key}-${stop.id}`]: {
                    ...errors[`${key}-${stop.id}`],
                    depart_date: 'Date is required',
                  },
                };
              }
              if (!stop.depart_time.trim()) {
                errors = {
                  ...errors,
                  [`${key}-${stop.id}`]: {
                    ...errors[`${key}-${stop.id}`],
                    depart_time: 'Time is required',
                  },
                };
                // check whether the depart_time is in the correct format hh:mm AM/PM
              } else if (stop.depart_time) {
                const timeRegex = /^(0[1-9]|1[0-2]):([0-5][0-9])(AM|PM)$/;
                if (!timeRegex.test(stop.depart_time)) {
                  errors = {
                    ...errors,
                    [`${key}-${stop.id}`]: {
                      ...errors[`${key}-${stop.id}`],
                      depart_time: 'Time is not correct',
                    },
                  };
                }
              }
            } else {
              if (!stop.isDataFilledWithAPI) {
                errors = {
                  ...errors,
                  [`${key}-${stop.id}`]: {
                    ...errors[`${key}-${stop.id}`],
                    description: 'End point is required',
                  },
                };
              }
              if (!stop.depart_date) {
                errors = {
                  ...errors,
                  [`${key}-${stop.id}`]: {
                    ...errors[`${key}-${stop.id}`],
                    depart_date: 'Date is required',
                  },
                };
              }
              if (!stop.depart_time.trim()) {
                errors = {
                  ...errors,
                  [`${key}-${stop.id}`]: {
                    ...errors[`${key}-${stop.id}`],
                    depart_time: 'Time is required',
                  },
                };
              } else if (stop.depart_time) {
                const timeRegex = /^(0[1-9]|1[0-2]):([0-5][0-9])(AM|PM)$/;
                if (!timeRegex.test(stop.depart_time)) {
                  errors = {
                    ...errors,
                    [`${key}-${stop.id}`]: {
                      ...errors[`${key}-${stop.id}`],
                      depart_time: 'Time is not correct',
                    },
                  };
                }
              }
              if (stop.depart_date) {
                const selectedDate = moment(stop.depart_date, 'M/D/YYYY');
                const prevStop = stops[index - 1];
                const prevDateStr = prevStop.depart_date;
                if (prevDateStr) {
                  const prevDate = moment(prevDateStr, 'M/D/YYYY');
                  if (selectedDate.isBefore(prevDate, 'day')) {
                    errors = {
                      ...errors,
                      [`${key}-${stop.id}`]: {
                        ...errors[`${key}-${stop.id}`],
                        depart_date: 'Invalid date: this stop is before the previous one',
                      },
                    };
                  }
                }
              }
            }
          });
        } else {
          const valueAsString: string = typeof value === 'object' ? JSON.stringify(value) : value.toString();

          if (!valueAsString) {
            errors = { ...errors, [key]: errorMappingObj[key] || '' };
          } else {
            if (key === 'email') {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(valueAsString)) {
                errors[key] = 'The email field must be a valid email.';
              }
            }

            if (key === 'phone') {
              // allow only digits (country code is handled by dropdown)
              const phoneRegex = /^[0-9]+$/;
              const digitsOnly = valueAsString.replace(/[^0-9]/g, '');

              if (!phoneRegex.test(valueAsString)) {
                errors[key] = 'The phone field may only contain numbers.';
              } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
                errors[key] = 'The phone number length must be between 7 and 15 digits.';
              }
            }

            if (key === 'passengers') {
              if (Number(valueAsString) < 0) {
                errors[key] = 'The passengers field must be greater than 0';
              }
            }
          }
        }

        if (key === 'stops' && formData.description.trim().length !== 0) {
          // if description is not empty, clear all the errors for stops
          const stops = value as Array<Stop>;
          stops.forEach((stop) => {
            if (stop.id) {
              errors = {
                ...errors,
                [`${key}-${stop.id}`]: undefined,
              };
            }
          });
        }
      }
    });
    // remove keys that have undefined values
    Object.keys(errors).forEach((key) => {
      if (errors[key] === undefined) {
        delete errors[key];
      }
    });
    return errors;
  };

  const handleFormSubmit = async () => {
    const errors = await validateField();

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    if (formData.phone) {
      try {
        const response = await ValidatePhoneNumber(formData.phoneWithCode);

        if (!(response.success && response.data?.phone_validation?.is_valid)) {
          setErrors((prev: any) => ({
            ...prev,
            phone: 'Invalid phone number',
          }));
          return;
        }
      } catch (err) {
        setErrors((prev: any) => ({
          ...prev,
          phone: 'Phone number validation failed',
        }));
        return;
      }
    }

    if (formData.email) {
      try {
        const response = await ValidateEmail(formData.email);

        if (!(response.success && response.data?.email_deliverability?.status === "deliverable")) {
          setErrors((prev: any) => ({
            ...prev,
            email: 'Invalid email address',
          }));
          return;
        }
      } catch (err) {
        console.error('Email validation error:', err);
        setErrors((prev: any) => ({
          ...prev,
          email: 'Email validation failed',
        }));
        return;
      }
    }

    setErrors({});
    setShowReviewModal(true);
  };

  const handleModalClose = () => {
    setShowReviewModal(false);
  };

  return (
    <>
      <div className="contact-information-main">
        <div className="contact-header-wrapper">
          <div className="contact-header">Contact Information</div>
          <div className="step-text">Step 2 of 2</div>
        </div>
        <div className="main-form-container">
          <Row>
            <Col md={6} sm={6} xs={6}>
              <InputField
                label="First Name"
                type="text"
                isRequired={true}
                error={errors.first_name}
                value={formData.first_name}
                onChange={handleInputChange}
                name="first_name"
              />
            </Col>
            <Col md={6} sm={6} xs={6}>
              <InputField
                label="Last Name"
                type="text"
                isRequired={true}
                error={errors.last_name}
                value={formData.last_name}
                onChange={handleInputChange}
                name="last_name"
              />
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mt-4">
              <InputField
                label="E-mail address"
                type="text"
                isRequired={true}
                value={formData.email}
                error={errors.email}
                onChange={handleInputChange}
                name="email"
              />
            </Col>
            <Col md={4} className="mt-4">
              <div className="phone-input-container">
                <label className="label required">Phone number</label>
                <div className="phone-input-row">
                  <div className="country-code-dropdown">
                    <CountryCodeDropdown
                      options={countryCodes}
                      selectedValue={selectedCountryCode}
                      selectedDisplay={selectedCountryDisplay}
                      onSelect={handleCountryCodeChange}
                    />
                  </div>
                  <div className="phone-number-input">
                    <InputField
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      isRequired={true}
                      error={errors.phone}
                      value={formData.phone}
                      onChange={handleInputChange}
                      name="phone"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4} className="mt-4">
              <InputField
                label="Company"
                type="text"
                error={errors.account_name}
                value={formData.account_name}
                onChange={handleInputChange}
                name="account_name"
              />
            </Col>
          </Row>

          {/* <Row className="mt-4">
            <Col md={4}>
              <CustomDropdown
                label="Contact Preference"
                defaultOption="E-mail"
                options={preferenceTypes}
                onSelect={handleSelection}
              />
            </Col>
          </Row> */}
        </div>
      </div>
      <div className="bottom-section-main">
        <div className="check-box">
          <label className="checkbox-container">
            <input type="checkbox" checked={formData.sms_opt_in} onChange={handleCheckboxChange} />
            <span className="checkmark"></span>
          </label>
          <div className="checkbox-text">
            <p>
              [Optional] I agree to receive SMS notifications from Busbank, a Global Charter Services Company, regarding
              trip details, followups and any clarification need for my itinerary.
            </p>
            <p>
              You will receive up to 2 follow up messages within 7 business days after submitting this form. Reply STOP
              to unsubscribe at any time. Please refer to our Privacy Policy to know about how this information will be
              used.
            </p>
          </div>
        </div>

        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" className="review-submit-button" onClick={handleFormSubmit}>
            Review and Submit
          </Button>
        </div>
      </div>

      <div className="reviewers">
        <img src={reviewers} className="reviewers-img" alt="reviewers" />
      </div>
      {showReviewModal && <ReviewAndSubmit showModal={showReviewModal} handleHide={handleModalClose} />}
    </>
  );
};

export default ContactInformationForm;