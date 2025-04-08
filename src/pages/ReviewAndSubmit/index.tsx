import React  from 'react';
import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import { Location, DestinationSVG } from '../../assets/svg/index';
import './ReviewAndSubmit.scss';

interface IReviewAndSubmit {
  showModal: boolean;
  handleHide: () => void;
  submitData?: any;
  selectedCard?: string;
}

const ReviewAndSubmit: React.FC<IReviewAndSubmit> = ({ showModal, handleHide, submitData, selectedCard }) => {
  const getTripHeading = (tripType: string | undefined) => {
    switch(tripType) {
      case 'roundTrip':
        return 'Roundtrip';
      case 'localShuttle':
        return 'Local Shuttle';
      case 'oneWay':
        return 'One Way';
      case 'other':
        return 'Other';
      default:
        return 'Trip Details';
    }
  };

  const downloadFileDirectly = () => {
    if (submitData[ 0 ]?.tripFile) {
      const fileBlob = new Blob([submitData[ 0 ]?.tripFile], { type: submitData[ 0 ]?.tripFile.type });
      const fileURL = URL.createObjectURL(fileBlob);

      const link = document.createElement('a');
      link.href = fileURL;
      link.download = submitData[ 0 ]?.tripFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(fileURL);
    }
  };

  const formatDepartureInfo = (
    arrive_time: string,
    depart_date: string,
    isFirst: boolean
  ) => {
    const formattedTime = moment(arrive_time, "hh:mmA", true).isValid()
      ? moment(arrive_time, "hh:mmA").format("h:mm a") : "";
    const formattedDate = moment(depart_date, "M/D/YYYY", true).isValid()
      ? moment(depart_date, "M/D/YYYY").format("MMMM D") : "";
    if (!formattedTime && !formattedDate) return "";
    return ` · ${formattedTime} ${isFirst ? "Departure" : "Arrival"} · ${formattedDate}`;
  };

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
            <h6 className="heading">{getTripHeading(selectedCard)}</h6>
            <div className="timeline">
              {(
                selectedCard === 'roundTrip'
                  ? [...submitData[ 0 ]?.stops, { isVirtualEnd: true }]
                  : submitData[ 0 ]?.stops
              )?.map((step, index, stopsArray) => {
                const isFirst = index === 0;
                const isLast = index === stopsArray.length - 1;

                const renderLabel = step?.isVirtualEnd
                  ? "Ending At"
                  : isFirst
                    ? "Starting From"
                    : (isLast && (selectedCard === "localShuttle" || selectedCard === "oneWay"))
                      ? "Ending At"
                      : "Destination";

                return (
                  <div key={index} className="d-flex position-relative timeline-stepper-main">
                    {isFirst || isLast ? <Location/> : <DestinationSVG className="add-stop-icon"/>}
                    <div className="timeline-content">
                      <h5>{renderLabel}</h5>
                      <div className="d-flex align-items-center gap-2 address-time-wrapper">
                        <p>{step?.location?.formatted_address || 'Round trip: end point will be the same as the start point'}</p>
                        {!step?.isVirtualEnd && (
                          <span className="date-range">
                           {formatDepartureInfo(step?.arrive_time, step?.depart_date, isFirst)}
                          </span>
                        )}
                      </div>
                    </div>
                    {!isLast && <hr className="timeline-hr-wrapper position-absolute"/>}
                  </div>
                );
              })}
            </div>
            <hr className="horizontal"/>
            <div className="roundtrip-bottom-wrapper">
              <div className="_bottom">
                <p className="type-wrapper">Est. number of passengers</p>
                <span className="description">{submitData[ 0 ]?.passengers}</span>
              </div>
              <div className="_bottom">
                <p className="type-wrapper">Group type</p>
                <span className="description">{submitData[ 0 ]?.segment_c}</span>
              </div>
              <div className="_bottom">
                <p className="type-wrapper">Preferred bus type</p>
                <span className="description">{submitData[ 0 ]?.preferred_coach_type_c}</span>
              </div>
            </div>
            <hr className="horizontal"/>
            <div className="row file-comments-wrapper">
              <div className="col-md-6">
                <p className="type-wrapper">Comments</p>
                <span className="description">
                  {submitData[ 0 ]?.description}
                </span>
              </div>
              <div className="col-md-6 file-wrapper">
                <p className="type-wrapper">Files</p>
                <div className="description pointer"
                     onClick={downloadFileDirectly}>{submitData[ 0 ]?.tripFile?.name}</div>
              </div>
            </div>
            <hr className="horizontal"/>
            <div className="contact-info">
              <span className="contact">{submitData[ 0 ]?.first_name} {submitData[ 0 ]?.last_name}, BusBank</span>
              <span className="contact">{submitData[ 0 ]?.email}</span>
              <span className="contact">{submitData[ 0 ]?.phone}</span>
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