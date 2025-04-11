import React, { useRef, useState } from 'react';
import { debounce } from 'lodash';
import moment from 'moment';
import { useDataContext } from '../../context/dataContext';
import constants from '../../constants/data.constant';
import SearchableSelect from '../../components/SearchableSelect';
import type { Stop } from '../../context/types';
import { fetchPlaceDetails, fetchPredictions } from '../../api';
import { CloseDeleteIconSVG } from '../../assets/svg';
import CustomDateRange from '../../components/DateRangePicker';
import CustomTimePicker from '../../components/CustomTimePicker';
import { getInitialStop } from '../../context/data';

interface SortableStopItemProps {
  data: Stop;
  index: number;
  setIsRouteValid: (isValid: boolean) => void;
}

const SortableStopItem: React.FC<SortableStopItemProps> = ({ data, index, setIsRouteValid }) => {
  const { selectedCard, formData, setFormData, errors } = useDataContext();
  const [predictions, setPredictions] = useState<{ value: string; label: string }[]>([]);

  const onFetchPredictions = useRef(
    debounce((value: string) => {
      fetchPredictions(value, setPredictions);
    }, 300)
  );

  const onLocationChange = (value: string) => {
    if (value === '') {
      setPredictions([]);
    }
    const updatedStops = [...formData.stops];
    updatedStops[index].location.description = value;
    setFormData((prev) => ({ ...prev, stops: updatedStops }));
    onFetchPredictions.current?.(value);
  };

  const verifyValidRoute = () => {
    try {
      if (!window.google || !window.google.maps) {
        console.error('Google Maps API is not loaded');
        return;
      }
      const arr = formData.stops.filter((v) => v.isDataFilledWithAPI);
      if (arr.length >= 2) {
        const origin = { lat: formData.stops[0]?.location?.lat, lng: arr[0]?.location?.lng };
        const destination = { lat: arr[arr.length - 1]?.location?.lat, lng: arr[arr.length - 1]?.location?.lng };

        const payload = {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
          optimizeWaypoints: false,
        };

        const waypoints = arr.slice(1, arr.length - 1).map((stop) => ({
          location: {
            lat: stop?.location?.lat,
            lng: stop?.location?.lng,
          },
          stopover: true,
        }));

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(waypoints.length ? { ...payload, waypoints } : { ...payload }, (response, status) => {
          if (response?.routes.length) {
            console.log('Route is valid:', response);
            setIsRouteValid(true);
          } else {
            console.error('Error fetching route:', status);
            setIsRouteValid(false);
          }
        });
      }
    } catch (error) {
      console.error('Error verifying valid route:', error);
    }
  };

  const onLocationSelect = async (value: string) => {
    const data = await fetchPlaceDetails(value);
    const updatedStops = [...formData.stops];
    updatedStops[index].location.description = data.description;
    updatedStops[index].location.street_1 = data.street_1;
    updatedStops[index].location.street_2 = data.street_1;
    updatedStops[index].location.city = data.city;
    updatedStops[index].location.state = data.state;
    updatedStops[index].location.postalcode = data.postalcode;
    updatedStops[index].location.lat = data.lat;
    updatedStops[index].location.lng = data.lng;
    updatedStops[index].location.formatted_phone = data.formatted_phone;
    updatedStops[index].location.formatted_address = data.formatted_address;
    updatedStops[index].location.utc_offset = data.utc_offset;
    updatedStops[index].location.url = data.url;
    updatedStops[index].isDataFilledWithAPI = true;
    if (selectedCard?.key === constants.tripType.roundTrip && index === 0) {
      const lastIndex = formData.stops.length - 1;
      updatedStops[lastIndex].location.description = data.description;
      updatedStops[lastIndex].location.street_1 = data.street_1;
      updatedStops[lastIndex].location.street_2 = data.street_1;
      updatedStops[lastIndex].location.city = data.city;
      updatedStops[lastIndex].location.state = data.state;
      updatedStops[lastIndex].location.postalcode = data.postalcode;
      updatedStops[lastIndex].location.lat = data.lat;
      updatedStops[lastIndex].location.lng = data.lng;
      updatedStops[lastIndex].location.formatted_phone = data.formatted_phone;
      updatedStops[lastIndex].location.formatted_address = data.formatted_address;
      updatedStops[lastIndex].location.utc_offset = data.utc_offset;
      updatedStops[lastIndex].location.url = data.url;
    }
    setFormData((prev) => ({ ...prev, stops: updatedStops }));
    verifyValidRoute();
  };

  const handleAddItem = (index: number) => {
    const updatedStops = [...formData.stops];
    const newStop = getInitialStop();
    updatedStops.splice(index + 1, 0, newStop);
    setFormData((prev) => ({ ...prev, stops: updatedStops }));
  };

  const handleCustomDateRange = (date: string) => {
    setFormData((prev) => {
      const updatedStops = [...prev.stops];
      updatedStops[index].depart_date = moment(date).format('M/D/YYYY');
      return { ...prev, stops: updatedStops };
    });
  };

  const onTimeChange = (time: string) => {
    setFormData((prev) => {
      const updatedStops = [...prev.stops];
      updatedStops[index].depart_time = time;
      return { ...prev, stops: updatedStops };
    });
  };

  const onClose = () => {
    const updatedStops = [...formData.stops];
    updatedStops.splice(index, 1);
    setFormData((prev) => ({ ...prev, stops: updatedStops }));
  };

  const renderLabel = () => {
    if (index === 0) {
      return 'Starting from';
    } else if (index === formData.stops.length - 1) {
      return 'Ending at';
    } else {
      return 'Destination';
    }
  };

  const getDate = () => {
    if (index === 0) {
      if (data.depart_date) return moment(data.depart_date).toDate();
      return null;
    } else {
      if (data.depart_date) return moment(data.depart_date).toDate();
      return null;
    }
  };

  console.log(formData.stops[0].location);

  return (
    <div className="position-relative w-100">
      <div className="item-container d-flex position-relative main-wrapper items-center gap-4 w-100">
        <div className="location d-flex gap-4 align-items-lg-start">
          <div className="d-flex flex-column justify-content-end w-100">
            {selectedCard?.key === constants.tripType.roundTrip && index === formData.stops.length - 1 ? (
              <div className="d-flex flex-column gap-2">
                <span className="label required">Ending At</span>
                <span className="description-wrapper">
                  {formData.stops[0].location.formatted_address ||
                    'Round trip: end point will be the same as the start point'}
                </span>
              </div>
            ) : (
              <>
                <SearchableSelect
                  isRequired
                  options={predictions}
                  value={data.location.description}
                  onChange={onLocationChange}
                  onSelect={onLocationSelect}
                  placeholder="Search location"
                  label={renderLabel()}
                  name="location"
                />
                {errors?.[`stops-${data.id}`]?.description && (
                  <span className="error-message">{errors?.[`stops-${data.id}`]?.description}</span>
                )}
              </>
            )}
          </div>
        </div>
        {(formData.stops.length - 1 !== index || selectedCard?.key === constants.tripType.localShuttle) && (
          <>
            <div className="on-at">
              <div className="label required">On</div>
              <CustomDateRange startDate={getDate()} handleChange={handleCustomDateRange} />
              {index === 0 && errors?.[`stops-${data.id}`]?.depart_date && (
                <span className="error-message">{errors?.[`stops-${data.id}`]?.depart_date}</span>
              )}
              {index !== 0 && errors?.[`stops-${data.id}`]?.depart_date && (
                <span className="error-message">{errors?.[`stops-${data.id}`]?.depart_date}</span>
              )}
            </div>
            <div className="on-at">
              <div className="label">At</div>
              <CustomTimePicker value={data.depart_time} onChange={onTimeChange} />
              {index === 0 && errors?.[`stops-${data.id}`]?.depart_time && (
                <span className="error-message">{errors?.[`stops-${data.id}`]?.depart_time}</span>
              )}
              {index !== 0 && errors?.[`stops-${data.id}`]?.depart_time && (
                <span className="error-message">{errors?.[`stops-${data.id}`]?.depart_time}</span>
              )}
            </div>
          </>
        )}

        {index !== 0 && formData.stops.length - 1 !== index && (
          <>
            <div className="delete-icon" onClick={onClose}>
              <CloseDeleteIconSVG />
            </div>
            <div className="remove-stop" onClick={onClose}>
              Remove stop
            </div>
          </>
        )}
      </div>
      {index !== formData.stops.length - 1 && (
        <button
          className={`common-btn add-stop-btn ${errors?.[`stops-${data.id}`] ? 'has-error' : ''}`}
          onClick={() => handleAddItem(index)}
        >
          <span className="plus-icon">+</span> Add a Stop
        </button>
      )}
    </div>
  );
};

export default SortableStopItem;
