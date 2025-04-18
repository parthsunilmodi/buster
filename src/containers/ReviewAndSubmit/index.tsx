import moment from 'moment';
import React, { useMemo } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { sendTripData } from '../../api/index';
import { DestinationSVG, Location } from '../../assets/svg/index';
import constants, { tripType } from '../../constants/data.constant';
import { useDataContext } from '../../context/dataContext';
import './ReviewAndSubmit.scss';

interface IReviewAndSubmit {
  showModal: boolean;
  handleHide: () => void;
}

const ReviewAndSubmit: React.FC<IReviewAndSubmit> = ({ showModal, handleHide }) => {
  const { formData, selectedCard, storeFile, setInitialData } = useDataContext();

  const {
    stops = [],
    first_name,
    last_name,
    email,
    phone,
    passengers,
    segment_c,
    preferred_coach_type_c,
    description,
  } = formData;

  const getTripHeading = (tripType: string | undefined) => {
    switch (tripType) {
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

  const downloadFileDirectly = async () => {
    if (storeFile?.url && storeFile?.filename) {
      try {
        const response = await fetch(storeFile.url);
        const blob = await response.blob();
  
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = storeFile.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Failed to download file:', err);
      }
    }
  };

  const formatDepartureInfo = (arrive_time: string, depart_date: string, isFirst: boolean) => {
    const formattedTime = moment(arrive_time, 'hh:mmA', true).isValid()
      ? moment(arrive_time, 'hh:mmA').format('h:mm a')
      : '';
    const formattedDate = moment(depart_date, 'M/D/YYYY', true).isValid()
      ? moment(depart_date, 'M/D/YYYY').format('MMMM D')
      : '';
    if (!formattedTime && !formattedDate) return '';
    return ` · ${formattedTime} ${isFirst ? 'Departure' : 'Arrival'} · ${formattedDate}`;
  };

  const handleSubmit = async () => {
    try {
      const response = await sendTripData(formData, selectedCard?.key || '');
      if (response.success) {
        handleHide();
        setInitialData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const stopsData = useMemo(() => {
    if (selectedCard?.key === tripType.roundTrip) {
      return stops.map((stop, index) => {
        if (index === stops.length - 1) {
          return { ...stop, isVirtualEnd: true };
        }
        return stop;
      });
    } else {
      return stops;
    }
  }, [selectedCard, stops]);

  return (
    <div className="mt-3">
      <Modal size="lg" show={showModal} onHide={handleHide} centered className="review-modal-container">
        <Modal.Header closeButton>
          <Modal.Title>Review & Submit</Modal.Title>
        </Modal.Header>
        <Modal.Body className="review-modal-body">
          <div className="review-modal-content">
            <h6 className="heading">{getTripHeading(selectedCard?.key)}</h6>
            <div className="timeline">
              {stopsData.map((step, index, stopsArray) => {
                const isFirst = index === 0;
                const isLast = index === stopsArray.length - 1;

                const renderLabel = isFirst
                  ? 'Starting From'
                  : isLast && (selectedCard?.key === tripType.localShuttle || selectedCard?.key === tripType.oneWay)
                    ? 'Ending At'
                    : 'Destination';

                return (
                  <div key={index} className="d-flex position-relative timeline-stepper-main">
                    {isFirst || isLast ? <Location /> : <DestinationSVG className="add-stop-icon" />}
                    <div className="timeline-content">
                      <h5>{renderLabel}</h5>
                      <div className="d-flex align-items-center gap-2 address-time-wrapper">
                        <p>
                          {step?.location?.formatted_address ||
                            'Round trip: end point will be the same as the start point'}
                        </p>
                        {selectedCard?.key !== constants.tripType.roundTrip && (
                          <span className="date-range">
                            {formatDepartureInfo(
                              step?.arrive_time || step.depart_time,
                              step.depart_date || step.arrive_date,
                              isFirst
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                    {!isLast && <hr className="timeline-hr-wrapper position-absolute" />}
                  </div>
                );
              })}
            </div>
            <hr className="horizontal" />
            <div className="round-trip-bottom-wrapper">
              <div className="_bottom">
                <p className="type-wrapper">Est. number of passengers</p>
                <span className="description">{passengers || 0}</span>
              </div>
              <div className="_bottom">
                <p className="type-wrapper">Group type</p>
                <span className="description">{segment_c || '-'}</span>
              </div>
              <div className="_bottom">
                <p className="type-wrapper">Preferred bus type</p>
                <span className="description">{preferred_coach_type_c || '-'}</span>
              </div>
            </div>
            <hr className="horizontal" />
            <div className="row file-comments-wrapper">
              <div className="col-md-6">
                <p className="type-wrapper">Comments</p>
                <span className="description">{description || '-'}</span>
              </div>
              <div className="col-md-6 file-wrapper">
                <p className="type-wrapper">Files</p>
                <div className="description pointer" onClick={downloadFileDirectly}>
                  {storeFile?.filename}
                </div>
              </div>
            </div>
            <hr className="horizontal" />
            <div className="contact-info">
              <span className="contact">
                {first_name} {last_name}, BusBank
              </span>
              <span className="contact">{email}</span>
              <span className="contact">{phone}</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-wrapper" onClick={handleSubmit}>
            Looks good! Submit my quote
          </Button>
          <Button className="btn-link-wrapper" onClick={handleHide}>
            Make changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReviewAndSubmit;
