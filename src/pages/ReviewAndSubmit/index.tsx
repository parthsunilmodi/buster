import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import location from '../../assets/images/location.png';
import destination from '../../assets/images/destination.png';
import './ReviewAndSubmit.scss'

interface IReviewAndSubmit {
  showModal: boolean;
  handleHide: () => void;
}

const ReviewAndSubmit: React.FC<IReviewAndSubmit> = ({ showModal, handleHide }) => {
  return (
    <div className="mt-3">
      <Modal
        size="lg"
        show={showModal}
        onHide={handleHide}
        centered
        className="review-modal-container"
      >
        <Modal.Header closeButton>
          <Modal.Title>Review & Submit</Modal.Title>
        </Modal.Header>
        <Modal.Body className="review-modal-body">
          <div className="review-modal-content">
            <h6>Roundtrip</h6>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-icon">
                  <img src={location} alt="Starting location" width="18" height="22" />
                </div>
                <div className="timeline-content">
                  <h5>Starting from</h5>
                  <p>
                    522 McGilvra Blvd E., Seattle, WA 98112
                    <strong>· Departing 10:00 AM</strong>
                    <strong>· January 28</strong>
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon">
                  <img src={destination} alt="Destination" width="22" height="22" />
                </div>
                <div className="timeline-content">
                  <h5>Destination</h5>
                  <p>
                    1234 Street Name E., Seattle, WA 98112
                    <strong>· Arriving 11:00 AM</strong>
                    <strong>· January 28</strong>
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon">
                  <img src={location} alt="Starting location" width="18" height="22" />
                </div>
                <div className="timeline-content">
                  <h5>Ending at</h5>
                  <p>Roundtrip (end point is the same as starting point)</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="row text-md-start align-items-start">
              <div className="col-12 col-md-4 mb-2 mb-md-0">
                <p className="fw-bold">Est. number of passengers:</p>
                <p>75</p>
              </div>
              <div className="col-12 col-md-4 mb-2 mb-md-0">
                <p className="fw-bold">Group type:</p>
                <p>Conference</p>
              </div>
              <div className="col-12 col-md-4">
                <p className="fw-bold">Preferred bus type:</p>
                <p>Coach bus</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <p><strong>Comments</strong></p>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Diam quis donec eget pellentesque tellus. Tempor eu augue
                  nullam pulvinar pharellus neque. Ut. Diam quis don.
                </p>
              </div>
              <div className="col-md-6">
                <p><strong>Files</strong></p>
                <p>Trip_Itinerary.pdf</p>
              </div>
            </div>
            <hr />
            <div className="contact-info">
              <p>Anna Dawson, BusBank</p>
              <p>dawsonag1@gmail.com</p>
              <p>+1 (206) 963-4560</p>
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Looks good! Submit my quote</Button>
          <Button variant="secondary" onClick={handleHide}>
            Make changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReviewAndSubmit;