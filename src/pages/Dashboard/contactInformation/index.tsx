import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputField from '../../../components/Input/Input';
import './contactInformation.scss';

const ContactInformation = () => {

  return (
    <>
      <div className="contact-information-main">
        <div className="form-title">
          <label>Contact Information</label>
          <p>Step 2 of 2</p>
        </div>

        <div>
          <Row>
            <Col md={6}>
              <InputField
                label={"First Name"}
                type={'text'}
              />
            </Col>
            <Col md={6}>
              <InputField
                label={"Last Name"}
                type={'text'}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={4}>
              <InputField
                label={"E-mail address"}
                type={'text'}
              />
            </Col>
            <Col md={4}>
              <InputField
                label={"Phone number"}
                type={'text'}
              />
            </Col>
            <Col md={4}>
              <InputField
                label={"Company"}
                type={'text'}
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
      <div className="bottom-section-main">
        <div className="check-box">
          <div className="checkbox-icon">

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

        <div>
          <Button variant="primary" size="lg">
            Review and Submit
          </Button>
        </div>
      </div>
    </>
  )
}

export default ContactInformation;