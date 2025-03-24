import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import InputField from '../../components/Input/Input';
import './ContactInformationForm.scss';
import Button from 'react-bootstrap/Button';
import CustomDropdown from '../../components/CustomDropdown/index';
import reviewers from '../../assets/images/reviewers.png';

const ContactInformationForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const preferenceTypes = ["E-mail"];

  const handleSelection = (selectedValue: string) => {
    console.log("Selected Preference Type:", selectedValue);
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
              />
            </Col>
            <Col md={6} sm={6} xs={6}>
              <InputField
                label="Last Name"
                type="text"
                isRequired={true}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={4} className="mt-3">
              <InputField
                label="E-mail address"
                type="text"
                isRequired={true}
              />
            </Col>
            <Col md={4} className="mt-3">
              <InputField
                label="Phone number"
                type="text"
                isRequired={true}
              />
            </Col>
            <Col md={4} className="mt-3">
              <InputField
                label="Company"
                type="text"
              />
            </Col>
          </Row>

          <Row className="mt-3">
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
              [Optional] I agree to receive SMS notifications from Busbank, a Global Charter Services Company, regarding trip details, followups and any clarification need for my itinerary.
            </p>
            <p>
              You will receive up to 2 follow up messages within 7 business days after submitting this form. Reply STOP to unsubscribe at any time.
              Please refer to our Privacy Policy to know about how this information will be used.
            </p>
          </div>
        </div>

        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" className="review-submit-button">
            Review and Submit
          </Button>
        </div>
      </div>

      <div className="reviewers">
        <img src={reviewers} className="reviewers-img" alt="reviewers"/>
      </div>
    </>
  )
}

export default ContactInformationForm;