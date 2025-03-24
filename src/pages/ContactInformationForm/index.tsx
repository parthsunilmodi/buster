import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import InputField from '../../components/Input/Input';
import './ContactInformationForm.scss';

const ContactInformationForm = () => {
  return (
    <div className="contact-information-main">
      <div className="contact-header-wrapper">
        <div className="contact-header">Contact Information</div>
        <div className="step-text">Step 1 of 2</div>
      </div>
      <div>
        <Row>
          <Col md={6}>
            <InputField
              label="First Name"
              type="text"
            />
          </Col>
          <Col md={6}>
            <InputField
              label="Last Name"
              type="text"
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={4}>
            <InputField
              label="E-mail address"
              type="text"
            />
          </Col>
          <Col md={4}>
            <InputField
              label="Phone number"
              type="text"
            />
          </Col>
          <Col md={4}>
            <InputField
              label="Company"
              type="text"
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact Preference</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">E-mail</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ContactInformationForm;