import React from 'react';
import CustomDropdown from '../../components/CustomDropdown';
import { useDataContext } from '../../context/dataContext';
import FileSelector from '../../components/FileSelector';
import constants from '../../constants/data.constant';
import InputField from '../../components/Input';
import TripPlanner from '../TripPlanner';
import TripCards from './TripCards';
import './TripInformationForm.scss';

const TripInformationForm = () => {
  const { storeFile, formData, errors, selectedCard, handleSetFormData, handleSetErrors } = useDataContext();

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    handleSetFormData({ description: value });

    if (value.trim().length && errors.passengers) {
      handleSetErrors({ ...errors, passengers: undefined });
    }
    if (value.trim().length && errors.segment_c) {
      handleSetErrors({ ...errors, segment_c: undefined });
    }
    if (value.trim().length && errors.preferred_coach_type_c) {
      handleSetErrors({ ...errors, preferred_coach_type_c: undefined });
    }
  };

  return (
    <div className="main-trip-information">
      <div className="trip-header-wrapper">
        <div className="trip-header">Trip Information</div>
        <div className="step-text">Step 1 of 2</div>
      </div>
      <div className="trip-sub-titile mt-4 w-100">First, select trip type</div>
      <TripCards />
      {selectedCard !== null && selectedCard.key !== constants.tripType.other && <TripPlanner />}
      <div className="main-form-container">
        <div className="trip-form-container flex-column flex-lg-row">
          <div className="trip-form-sub-container">
            <div className="trip-titile mb-2">Tell us about your transportation needs:</div>
            <InputField
              className="tell-us-textarea"
              placeholder="The more details , the better. We'll take it from there."
              type="textarea"
              value={formData.description}
              onChange={onDescriptionChange}
            />
          </div>
          <div className="w-100">
            <div className="trip-titile mb-2">If you have one, upload a trip file or itinerary:</div>
            <FileSelector />
          </div>
        </div>
        <div className="d-flex gap-3">
          {errors?.file && (
            <>
              <p className="dynamic-wrap"></p> <p className="error-message">{errors?.file}</p>
            </>
          )}
          {Array.isArray(storeFile) && storeFile?.length > 0 && (
            <>
              <p className="dynamic-wrap"></p>
              <p className="selected-file">
                Files selected:&nbsp;
                {storeFile?.map((file, index) => (
                  <span key={index}>
                    {file.filename}
                    {index < storeFile?.length - 1 && ', '}
                  </span>
                ))}
              </p>
            </>
          )}
        </div>
        <div className="d-flex gap-3"></div>
        <div className="trip-form-container  mt-3">
          <div className="trip-form-sub-container">
            <InputField
              isRequired={formData.description.trim().length === 0}
              inputStyle="number-input"
              label="Est. number of passengers"
              placeholder="0"
              type="number"
              value={formData.passengers.toString()}
              error={errors.passengers}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const value = e.target.value;
                if (value.length === 1 && value === ' ') return;
                handleSetFormData({ passengers: value ? Number(value) : 0 });
              }}
            />
          </div>

          <div className="trip-form-sub-container">
            <CustomDropdown
              isRequired={formData.description.trim().length === 0}
              label="Group type"
              options={constants.groupType}
              defaultOption="Please choose your group type"
              selectedValue={formData.segment_c}
              error={errors.segment_c}
              onSelect={(value: string) => {
                if (value.length === 1 && value === ' ') return;
                handleSetFormData({ segment_c: value });
              }}
            />
          </div>
          <div className="trip-form-sub-container">
            <CustomDropdown
              isRequired={formData.description.trim().length === 0}
              label="Preferred Bus Type"
              options={constants.busTypes}
              selectedValue={formData.preferred_coach_type_c}
              error={errors.preferred_coach_type_c}
              onSelect={(value: string) => {
                if (value.length === 1 && value === ' ') return;
                handleSetFormData({ preferred_coach_type_c: value });
              }}
              placeholder="Select Prefrred Bus Type"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripInformationForm;
