import React, { useState } from 'react';
import moment from 'moment';
import { Row, Col, Button } from 'react-bootstrap';
import { useDataContext } from '../../context/dataContext';
import reviewers from '../../assets/images/reviewers.png';
import { FormDataType, Stop } from '../../context/types';
import ReviewAndSubmit from '../ReviewAndSubmit/index';
import InputField from '../../components/Input';
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

const ContactInformationForm = () => {
  const { formData, handleSetFormData, errors, handleSetErrors } = useDataContext();
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleCheckboxChange = () => {
    handleSetFormData({ sms_opt_in: !formData.sms_opt_in });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (value.length === 1 && value === ' ') return;

    let sanitizedValue = value;
    if (name === 'phone') {
      sanitizedValue = value.replace(/\D/g, '');
    }
    handleSetFormData({ [name]: sanitizedValue });

    if (errors[name]) {
      handleSetErrors({ ...errors, [name]: undefined });
    }
  };
  const hasComments = formData.description?.trim().length > 0;
  const validateField = () => {
    let errors: any = {};
    const validateFields = [
      'first_name',
      'last_name',
      'email',
      'phone',
      'account_name',
      'passengers',
      'stops',
      'segment_c',
      'preferred_coach_type_c',
    ];

    Object.keys(formData).forEach((key) => {
      
      if (validateFields.includes(key)) {
        const value = formData[key as keyof FormDataType];
        if (key === 'stops') {
          if (hasComments) return; 

          const stops = value as Array<Stop>;
          stops.forEach((stop, index) => {
            if (index === stops.length - 1) return;
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
              const phoneRegex = /^\d+$/;
              const digitsOnly = valueAsString.replace(/\D/g, ''); // remove non-digits
              if (!phoneRegex.test(digitsOnly)) {
                errors[key] = 'The phone field may only contain numeric characters.';
              } else if (valueAsString.length < 10) {
                errors[key] = 'The phone field must be at least 10 characters.';
              }
            }
          }
        }
      }
    });
    return errors;
  };

  const handleFormSubmit = () => {
    const errors = validateField();
    if (Object.keys(errors).length) {
      return handleSetErrors(errors);
    } else {
      handleSetErrors(errors);
      setShowReviewModal(true);
    }
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
              <InputField
                label="Phone number"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                isRequired={true}
                error={errors.phone}
                value={formData.phone}
                onChange={handleInputChange}
                name="phone"
              />
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
          <div className={`checkbox-icon ${formData.sms_opt_in ? 'checked' : ''}`} onClick={handleCheckboxChange}>
            {formData.sms_opt_in && <i className="bi bi-check-lg"></i>}
          </div>
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
