import React, { useState } from 'react';
import CustomDropdown from '../../components/CustomDropdown';
import FileSelector from '../../components/FileSelector';
import InputField from '../../components/Input';
import TripCards from './TripCards';
import TripPlanner from '../../components/TripPlanner/index';
import { data } from '../../constants/index';
import './TripInformationForm.scss';


const TripInformationForm = () => {
  const { tripType, groupType, busTypes } = data

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [passengers, setPassengers] = useState<number | "">("");
  const [segment, setSegment] = useState<string>("");
  const [busType, setBusType] = useState<string>("Deluxe Motorcoach: up to 56 passengers");

  const handleSegmentSelection = (selectedValue: string) => {
    setSegment(selectedValue);
  };

  const handleBusSelection = (selectedValue: string) => {
    setBusType(selectedValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setComments(newValue);
  };

  const handlePassengerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = value === "" ? "" : Number(value);

    if (parsedValue === "" || (parsedValue > 0 && Number.isInteger(parsedValue))) {
      setPassengers(parsedValue);
    }
  };

  return (
    <div className="main-trip-information">
      <div className="trip-header-wrapper">
        <div className="trip-header">Trip Information</div>
        <div className="step-text">Step 1 of 2</div>
      </div>
      <div className="trip-sub-titile mt-4 w-100">First, select trip type</div>
      <TripCards setSelectedCard={setSelectedCard} selectedCard={selectedCard} />
      {
        selectedCard !== tripType.other && selectedCard !== null && (
          <TripPlanner selectedCard={selectedCard} />
        )
      }
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
              value={comments}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-100">
            <div className="trip-titile mb-2">
              If you have one, upload a trip file or itinerary:
            </div>
            <FileSelector
              setSelectedFile={setSelectedFile}
              setFileError={setFileError}
            />
          </div>
        </div>
        <div className="d-flex gap-3">
          {fileError &&<><p className="dynamic-wrap"></p> <p className="error-message">{fileError}</p></>}
          {selectedFile &&<><p className="dynamic-wrap"></p> <p className="selected-file">File selected: {selectedFile.name}</p></>}
        </div>
        <div className="trip-form-container flex-column flex-md-row mt-3">
          <div className="trip-form-sub-container">
            <InputField
              inputStyle="number-input"
              label="Est. number of passengers:"
              type="number"
              value={passengers}
              onChange={handlePassengerChange}
            />
          </div>
          <div className="trip-form-sub-container">
            <CustomDropdown
              label="Group type:"
              options={groupType}
              defaultOption="Please choose your group type."
              onSelect={handleSegmentSelection}
            />
          </div>
          <div className="trip-form-sub-container">
            <CustomDropdown
              label="Preferred Bus Type:"
              options={busTypes}
              onSelect={handleBusSelection}
              placeholder="Deluxe Motorcoach: up to 56 passengers"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripInformationForm;