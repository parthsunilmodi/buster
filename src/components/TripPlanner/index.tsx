import { useState } from 'react';
import InputField from '../Input/Input';
import plusIcon from '../../assets/images/plusIcon.png'
import './TripPlanner.scss';
import CustomDateRange from '../DateRangePicker/index';

const TripPlanner = () => {
  const stopsList = [
    { location: '', date: '', time: '' },
    { location: '', date: '', time: '' },
  ];
  const [stops, setStops] = useState(stopsList);
  const [trip, setTrip] = useState({ start: '', destination: '', date: '', time: '' });

  const addStop = () => {
    setStops([...stops, { location: '', date: '', time: '' }]);
  };

  return (
    <div className="">
      <div className="trip-planner">
        <div className="stepper-container">
          <div className="stepper-line"></div>
          <div className="stepper-item start"></div>
          {stops.map((_, index) => (
            <div key={index} className="stepper-item stop">....</div>
          ))}
          <div className="stepper-item end"></div>
        </div>

        <div>
          <div className="single-location">
            <div>
              <InputField type="text" label="Starting from *"/>
            </div>
            <div>
              <div>On *</div>
              <CustomDateRange />
            </div>
            <div>
              <div>At</div>
              <input type="time"/>
            </div>
          </div>
          <button className="common-btn" onClick={addStop}> <img src={plusIcon} alt="PlusIcon" /> Add a stop</button>

          {stops.map((stop, index) => (
            <div className="mb-3" key={index}>
              <div>
                <input type="text" placeholder="Stop location"/>
              </div>
              <div>
                <input type="date"/>
              </div>
              <div>
                <input type="time"/>
              </div>
            </div>
          ))}

          <button variant="outline-primary" onClick={addStop}>+ Add a stop</button>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;