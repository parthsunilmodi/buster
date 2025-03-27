import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import CustomDropdown from '../../components/CustomDropdown';
import reviewers from '../../assets/images/reviewers.png';
import InputField from '../../components/Input';
import ReviewAndSubmit from '../ReviewAndSubmit';
import './ContactInformationForm.scss';

const ContactInformationForm = () => {
  const preferenceTypes = ["E-mail"];

  const [isChecked, setIsChecked] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  const handleSelection = (selectedValue: string) => {
    console.log('Selected Preference Type:', selectedValue);
  };

  const formatFieldName = (name: string) => {
    if (name === "email") return "E-mail address";
    const formattedName = name
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .toLowerCase();

    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => {
      const newErrors = {
        ...prevErrors,
        [name]: value.trim() ? '' : `${formatFieldName(name)} is required`,
      };
      console.log("Updated Errors:", newErrors);
      return newErrors;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Remove error only if the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() ? '' : prevErrors[name],
    }));
  };

  const handleSubmit = () => {
    const newErrors: any = {};

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email) {
      newErrors.email = 'E-mail address is required';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
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
                error={errors.firstName}
                value={formData.firstName}
                onBlur={handleBlur}
                onChange={(e: any) => handleInputChange(e)}
                name="firstName"
              />
            </Col>
            <Col md={6} sm={6} xs={6}>
              <InputField
                label="Last Name"
                type="text"
                isRequired={true}
                error={errors.lastName}
                value={formData.lastName}
                onBlur={handleBlur}
                onChange={(e: any) => handleInputChange(e)}
                name="lastName"
              />
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mt-4">
              <InputField
                label="E-mail address"
                type="text"
                isRequired={true}
                error={errors.email}
                value={formData.email}
                onBlur={handleBlur}
                onChange={(e: any) => handleInputChange(e)}
                name="email"
              />
            </Col>
            <Col md={4} className="mt-4">
              <InputField
                label="Phone number"
                type="text"
                isRequired={true}
                error={errors.phoneNumber}
                value={formData.phoneNumber}
                onBlur={handleBlur}
                onChange={(e: any) => handleInputChange(e)}
                name="phoneNumber"
              />
            </Col>
            <Col md={4} className="mt-4">
              <InputField
                label="Company"
                type="text"
                value={formData.company}
                onChange={(e: any) => handleInputChange(e)}
                name="company"
              />
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={4}>
              <CustomDropdown
                label="Contact Preference"
                options={preferenceTypes}
                onSelect={handleSelection}
              />
            </Col>
          </Row>
        </div>
      </div>
      <div className="bottom-section-main">
        <div className="check-box">
          <div
            className={`checkbox-icon ${isChecked ? 'checked' : ''}`}
            onClick={handleCheckboxChange}
          >
            {isChecked && <i className="bi bi-check-lg"></i>}
          </div>
          <div className="checkbox-text">
            <p>
              [Optional] I agree to receive SMS notifications from Busbank, a Global Charter Services Company, regarding
              trip details, followups and any clarification need for my itinerary.
            </p>
            <p>
              You will receive up to 2 follow up messages within 7 business days after submitting this form. Reply STOP
              to unsubscribe at any time.
              Please refer to our Privacy Policy to know about how this information will be used.
            </p>
          </div>
        </div>

        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" className="review-submit-button" onClick={handleSubmit}>
            Review and Submit
          </Button>
        </div>
      </div>

      <div className="reviewers">
        <img src={reviewers} className="reviewers-img" alt="reviewers" />
      </div>

      {showReviewModal && (
        <ReviewAndSubmit showModal={showReviewModal} handleHide={handleModalClose} />
      )}
    </>
  )
}

export default ContactInformationForm;