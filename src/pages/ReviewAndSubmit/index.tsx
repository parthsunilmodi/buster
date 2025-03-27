import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Location, DestinationSVG } from '../../assets/svg/index';
import './ReviewAndSubmit.scss'


interface IReviewAndSubmit {
  showModal: boolean;
  handleHide: () => void;
}

type IStep = {
  label: string;
  address: string;
  time?: string;
}

const ReviewAndSubmit: React.FC<IReviewAndSubmit> = ({ showModal, handleHide }) => {

  const tripSteps: IStep[] = [
    { label: "Starting from", address: "522 McGilvra Blvd E., Seattle, WA 98112", time: " · 10:00 am Departure · January 28" },
    { label: "Destination", address: "1234 Street Name E., Seattle, WA 98112", time: " · 11:00 am Arrival · January 28" },
    { label: "Ending at", address: "Roundtrip (end point is the same as starting point"}
  ];

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
            <h6 className="heading">Roundtrip</h6>
            <div className="timeline">
              {tripSteps.map((step, index) => {
                const isFirst = index === 0;
                const isLast = index === tripSteps.length - 1;
                return (
                  <div key={index} className="d-flex position-relative timeline-stepper-main">
                    {isFirst || isLast ? <Location  /> : <DestinationSVG className="add-stop-icon"  />}
                    <div className="timeline-content">
                      <h5>{step.label}</h5>
                      <div className="d-flex align-items-center gap-2 address-time-wrapper">
                        <p>{step.address}</p>
                        <span className="date-range">{step?.time}</span>
                      </div>
                    </div>
                    { !isLast && <hr className="timeline-hr-wrapper position-absolute" /> }
                  </div>
                );
              })}
            </div>
            <hr className="horizontal" />
            <div className="roundtrip-bottom-wrapper">
              <div className="_bottom">
                <p className="type-wrapper">Est. number of passengers</p>
                <span className="description">75</span>
              </div>
              <div className="_bottom">
                <p className="type-wrapper">Group type</p>
                <span className="description">Conference</span>
              </div>
              <div className="_bottom">
                <p className="type-wrapper">Preferred bus type</p>
                <span className="description">Coach bus</span>
              </div>
            </div>
            <hr className="horizontal" />
            <div className="row file-comments-wrapper">
              <div className="col-md-6">
                <p className="type-wrapper">Comments</p>
                <span className="description">
                  Lorem ipsum dolor sit amet consectetur. Diam quis donec eget pellentesque tellus. Tempor eu augue
                  nullam pulvinar pharellus neque. Ut. Diam quis don.
                </span>
              </div>
              <div className="col-md-6 file-wrapper">
                <p className="type-wrapper">Files</p>
                <span className="description">Trip_Itinerary.pdf</span>
              </div>
            </div>
            <hr className="horizontal" />
            <div className="contact-info">
              <span className="contact">Anna Dawson, BusBank</span>
              <span className="contact">dawsonag1@gmail.com</span>
              <span className="contact">+1 (206) 963-4560</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-wrapper">Looks good! Submit my quote</Button>
          <Button className="btn-link-wrapper" onClick={handleHide}>
            Make changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReviewAndSubmit;