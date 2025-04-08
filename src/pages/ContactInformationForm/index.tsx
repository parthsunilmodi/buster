import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import CustomDropdown from '../../components/CustomDropdown';
import reviewers from '../../assets/images/reviewers.png';
import { handleSubmitData } from '../../api/index';
import InputField from '../../components/Input';
import ReviewAndSubmit from '../ReviewAndSubmit';
import './ContactInformationForm.scss';

interface IContactInformationType {
  setSubmitData?: any;
  submitData?: any;
  selectedCard?: string;
}

const ContactInformationForm: React.FC<IContactInformationType> = ({ setSubmitData, submitData, selectedCard }) => {
  const preferenceTypes = [{ label: "E-mail", value: "E-mail" }];

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
    sms_opt_in: false,
  });

  const handleCheckboxChange = () => {
    const newValue = !formData.sms_opt_in;
    setFormData((prev) => ({ ...prev, sms_opt_in: newValue }));
    updateSubmitData("sms_opt_in", newValue);
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
        [name]: value.trim()
          ? name === "phoneNumber"
            ? !/^\d+$/.test(value)
              ? "The phone field may only contain numeric characters."
              : value.length < 10
                ? "The phone field must be at least 10 characters."
                : ""
            : name === "email"
              ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? "The email field must be a valid email."
                : ""
              : ""
          : `${formatFieldName(name)} is required`,
      };

      return newErrors;
    });
  };

  const updateSubmitData = (key: string, value: any) => {
    setSubmitData((prev: any) =>
      prev.map((trip: any) => ({ ...trip, [key]: value }))
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    updateSubmitData(
      name === "firstName" ? "first_name" :
        name === "lastName" ? "last_name" :
          name === "phoneNumber" ? "phone" :
            name,
      value
    );

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

    if (Object.keys(newErrors).length === 0 && submitData) {
      handleSubmitData(submitData)
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
                defaultOption="E-mail"
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
            className={`checkbox-icon ${formData.sms_opt_in ? 'checked' : ''}`}
            onClick={handleCheckboxChange}
          >
            {formData.sms_opt_in && <i className="bi bi-check-lg"></i>}
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
        <ReviewAndSubmit
          selectedCard={selectedCard}
          submitData={submitData}
          showModal={showReviewModal}
          handleHide={handleModalClose}
        />
      )}
    </>
  )
}

export default ContactInformationForm;