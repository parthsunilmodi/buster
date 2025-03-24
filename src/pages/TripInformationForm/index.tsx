
import React from 'react';
import CustomDropdown from '../../components/CustomDropdown';
import FileSelector from '../../components/FileSelector';
import InputField from '../../components/Input';
import TripCards from './TripCards';
import TripPlanner from '../../components/TripPlanner/index';
import './TripInformationForm.scss';

const TripInformationForm = () => {

  const busTypes = ["Standard", "Luxury", "Mini", "Double Decker"];

  const handleSelection = (selectedValue: string) => {
    console.log("Selected Bus Type:", selectedValue);
  };

  return (
    <div className="main-trip-information">
      <div className="trip-header-wrapper">
        <div className="trip-header">Trip Information</div>
        <div className="step-text">Step 1 of 2</div>
      </div>
      <div className="trip-sub-titile mt-4 w-100">First, select trip type</div>
      <TripCards />
      <TripPlanner />
      <div className="main-form-container">
        <div className="trip-form-container flex-column flex-lg-row">
          <div className="trip-form-sub-container">
            <div className="trip-titile mb-2">
              Tell us about your transportation needs:
            </div>
            <InputField
              className="tell-us-textarea"
              placeholder="The more details , the better. We'll take it from there."
              type='textarea'
            />
          </div>
          <div className="w-100">
            <div className="trip-titile mb-2">
              If you have one, upload a trip file or itinerary:
            </div>
            <FileSelector />
          </div>
        </div>
        <div className="trip-form-container flex-column flex-md-row mt-3">
          <div className="trip-form-sub-container">
            <InputField
              inputStyle="number-input"
              label="Est. number of passengers:"
            />
          </div>
          <div className="trip-form-sub-container">
            <CustomDropdown
              label="Group type:"
              options={busTypes}
              onSelect={handleSelection}
            />
          </div>
          <div className="trip-form-sub-container">
            <CustomDropdown
              label="Preferred bus type:"
              options={busTypes}
              onSelect={handleSelection}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripInformationForm;