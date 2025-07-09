import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { sendTripData } from '../../api/index';
import { DestinationSVG, Location } from '../../assets/svg/index';
import { tripType } from '../../constants/data.constant';
import { useDataContext } from '../../context/dataContext';
import './ReviewAndSubmit.scss';

interface IReviewAndSubmit {
  showModal: boolean;
  handleHide: () => void;
}

const ReviewAndSubmit: React.FC<IReviewAndSubmit> = ({ showModal, handleHide }) => {
  const { formData, selectedCard, storeFile, setInitialData } = useDataContext();

  const [loading, toggleLoading] = useState(false);

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

  const downloadFile = async (file: { filename: string; url: string }) => {
    if (file?.url && file?.filename) {
      try {
        const response = await fetch(file.url);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error(`Failed to download file ${file.filename}:`, err);
      }
    }
  };

  const formattedDate = (depart_date: string) => {
    const formattedDate = moment(depart_date, 'M/D/YYYY', true).isValid()
      ? moment(depart_date, 'M/D/YYYY').format('D MMMM YYYY')
      : '';

    if (!formattedDate) return null;
    return <span style={{ paddingLeft: '10px' }}>· {formattedDate}</span>;
  };

  const formattedTime = (arrive_time: string) => {
    const formattedTime = moment(arrive_time, 'hh:mmA', true).isValid()
      ? moment(arrive_time, 'hh:mmA').format('h:mm a')
      : '';

    if (!formattedTime) return null;
    return <span style={{ paddingLeft: '10px' }}>· {formattedTime} Departure</span>;
  };

  const handleSubmit = async () => {
    try {
      toggleLoading(true);
      const fileUrls: string[] = Array.isArray(storeFile) ? storeFile?.map((file) => file.url) : [];
      const response = await sendTripData(formData, selectedCard?.key || '', fileUrls);
      if (response.success) {
        handleHide();
        setInitialData();
      }
    } catch (e) {
      console.log(e);
    } finally {
      toggleLoading(false);
    }
  };

  const isValidStop = (stop: any) => {
    const hasAddress = stop?.location?.formatted_address?.trim();
    const hasDateTime = stop?.depart_date?.trim() || stop?.arrive_date?.trim();
    return hasAddress || hasDateTime || stop?.isDataFilledWithAPI;
  };

  const stopsData = useMemo(() => {
    const validStops = stops.filter(isValidStop);

    if (selectedCard?.key === tripType.roundTrip && validStops.length > 1) {
      return validStops?.map((stop, index) => {
        if (index === validStops.length - 1) {
          return { ...stop, isVirtualEnd: true };
        }
        return stop;
      });
    }

    return validStops;
  }, [selectedCard, stops]);

  return (
    <div className="mt-3">
      <Modal
        size="lg"
        show={showModal}
        onHide={handleHide}
        centered
        className="review-modal-container"
        backdrop="static"
      >
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
                  : isLast &&
                      (selectedCard?.key === tripType.roundTrip ||
                        selectedCard?.key === tripType.localShuttle ||
                        selectedCard?.key === tripType.oneWay)
                    ? 'Ending At'
                    : 'Destination';
                if (!step?.location?.formatted_address) return null;
                return (
                  <div key={index} className="d-flex position-relative timeline-stepper-main">
                    {isFirst || isLast ? <Location /> : <DestinationSVG className="add-stop-icon" />}
                    <div className="timeline-content">
                      <h5>{renderLabel}</h5>
                      <div className="gap-2 address-time-wrapper">
                        <p>{step?.location?.formatted_address}</p>
                        <span className="date-range">{formattedTime(step?.arrive_time || step.depart_time)}</span>
                        <span className="date-range">{formattedDate(step.depart_date || step.arrive_date)}</span>
                      </div>
                    </div>
                    {!step?.location?.formatted_address ||
                      (!isLast && <hr className="timeline-hr-wrapper position-absolute" />)}
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
                <div className="description pointer">
                  {Array.isArray(storeFile) &&
                    storeFile?.map((file, index) => (
                      <div key={index} className="description pointer" onClick={() => downloadFile(file)}>
                        {file.filename}
                      </div>
                    ))}
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
          <Button disabled={loading} className="btn-wrapper" onClick={handleSubmit}>
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
