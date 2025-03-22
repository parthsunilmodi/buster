
import TripCards from './TripCards';
import './TripInformation.scss';

const TripInformation = () => {
  return (
    <div className="main-trip-information">
      <div className="trip-header-wrapper">
        <div className="trip-header">Trip Information</div>
        <div className="step-text">Step 1 of 2</div>
      </div>
      <div className="trip-titile mt-4 w-100">First, select trip type</div>
      <TripCards />
    </div>
  )
}

export default TripInformation;