
import CustomDropdown from '../../components/CustomDropdown';
import FileSelector from '../../components/FileSelector';
import TripCards from './TripCards';
import './TripInformation.scss';

const TripInformation = () => {

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
      <div className="trip-titile mt-4 w-100">First, select trip type</div>
      <TripCards />
      <div className="container py-4">
      <div className="row g-3">
        {/* Textarea for transportation needs */}
        <div className="col-md-6">
          <label className="form-label">Tell us about your transportation needs:</label>
        </div>

        {/* File upload section */}
        <div className="col-md-6">
          <FileSelector/>
        </div>

        {/* Estimated passengers */}
        <div className="col-md-4">
          <label className="form-label">Est. number of passengers:</label>
          <input type="number" className="form-control" placeholder="Enter number" />
        </div>

        {/* Group type dropdown */}
        <div className="col-md-4">
        <CustomDropdown label="Group type:" options={busTypes} onSelect={handleSelection} />
        </div>

        {/* Preferred bus type dropdown */}
        <div className="col-md-4">
        <CustomDropdown label="Preferred bus type:" options={busTypes} onSelect={handleSelection} />
        </div>
      </div>
    </div>
    </div>
  )
}

export default TripInformation;