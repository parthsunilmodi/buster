import React, { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import moment from 'moment';
import { useDataContext } from '../../context/dataContext';
import constants from '../../constants/data.constant';
import SearchableSelect from '../../components/SearchableSelect';
import type { Stop } from '../../context/types';
import { fetchPlaceDetails, fetchPredictions } from '../../api';
import { CloseDeleteIconSVG } from '../../assets/svg';
import CustomDateRange from '../../components/DateRangePicker';
import { getInitialStop } from '../../context/data';
import CustomTimePicker from '../../components/CustomTimePicker';

interface SortableStopItemProps {
  data: Stop;
  index: number;
  setIsRouteValid: (isValid: boolean) => void;
}

const SortableStopItem: React.FC<SortableStopItemProps> = ({ data, index, setIsRouteValid }) => {
  const { selectedCard, formData, setFormData, errors, handleSetErrors, setTimeDuration, timeDuration } =
    useDataContext();
  const [predictions, setPredictions] = useState<{ value: string; label: string }[]>([]);
  const [touchedTime, setTouchedTime] = useState<boolean>(false);

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
            const legs = response?.routes[0]?.legs;
            const durations = legs?.map((leg) => leg?.duration?.value);
            setTimeDuration(durations as number[]);
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
    handleSetErrors({
      [`stops-${formData.stops?.[index]?.id}`]: {
        ...errors[`stops-${formData.stops?.[index]?.id}`],
        description: undefined,
      },
    });
    verifyValidRoute();
  };

  const handleAddItem = (index: number) => {
    const updatedStops = [...formData.stops];
    const newStop = getInitialStop();
    updatedStops.splice(index + 1, 0, newStop);
    setFormData((prev) => ({ ...prev, stops: updatedStops }));
  };

  const handleCustomDateRange = (date: string) => {
    const selectedDate = moment(date, 'M/D/YYYY');
    const updatedStops = [...formData.stops];
    const updatedErrors = { ...errors };
    const currentStopId = formData.stops[index]?.id;

    // Update date first
    updatedStops[index].depart_date = selectedDate.format('M/D/YYYY');

    // Validate previous stop
    let prevDateError;
    if (index > 0) {
      const prevStop = updatedStops[index - 1];
      const prevDate = moment(prevStop?.depart_date, 'M/D/YYYY');
      if (prevDate.isValid() && selectedDate.isBefore(prevDate, 'day')) {
        prevDateError = 'Invalid date: this stop is before the previous one';
      }
    }

    updatedErrors[`stops-${currentStopId}`] = {
      ...updatedErrors[`stops-${currentStopId}`],
      depart_date: prevDateError,
    };

    // Validate next stop (if it now becomes earlier than the updated one)
    if (index < updatedStops.length - 1) {
      const nextStop = updatedStops[index + 1];
      const nextStopId = nextStop?.id;
      const nextDate = moment(nextStop?.depart_date, 'M/D/YYYY');

      let nextDateError;
      if (nextDate.isValid() && nextDate.isBefore(selectedDate, 'day')) {
        nextDateError = 'Invalid date: this stop is before the previous one';
      }

      updatedErrors[`stops-${nextStopId}`] = {
        ...updatedErrors[`stops-${nextStopId}`],
        depart_date: nextDateError,
      };
    }

    setFormData((prev) => ({
      ...prev,
      stops: updatedStops,
    }));

    handleSetErrors(updatedErrors);

    // 🔁 Trigger time validation with new date
    const currentTime = updatedStops[index]?.depart_time;
    if (currentTime && moment(currentTime, 'hh:mmA', true).isValid()) {
      const parsedMoment = moment(currentTime, 'hh:mmA');
      onTimeChange(parsedMoment);
    }
  };

  useEffect(() => {
    if (!timeDuration || timeDuration.length === 0) return;

    const currentStop = formData.stops[index];
    const currentTime = currentStop?.depart_time;

    // Only run validation if current time exists and is valid
    if (currentTime && moment(currentTime, 'hh:mmA', true).isValid()) {
      const parsedMoment = moment(currentTime, 'hh:mmA');
      onTimeChange(parsedMoment);
    }
  }, [timeDuration]);

  const onTimeChange = (value: moment.Moment | null) => {
    setTouchedTime(true);
    let formattedTime = value ? value.format('hh:mmA') : '';
    const updatedStops = [...formData.stops];
    updatedStops[index].depart_time = formattedTime;
    setFormData((prev) => ({ ...prev, stops: updatedStops }));

    const timeRegex = /^(0[1-9]|1[0-2]):([0-5][0-9])(AM|PM)$/;
    const isValidFormat = timeRegex.test(formattedTime);
    let errorMessage: string | undefined;

    if (!isValidFormat && touchedTime) {
      errorMessage = 'Time is not correct';
    }

    if (index > 0 && isValidFormat && timeDuration?.[index - 1]) {
      const prevStop = formData.stops[index - 1];
      const currentDate = updatedStops[index].depart_date;
      const prevDate = prevStop.depart_date;

      if (prevStop.depart_time && prevDate && currentDate) {
        const prevDateTime = moment(`${prevDate} ${prevStop.depart_time}`, 'M/D/YYYY hh:mmA');
        const currentDateTime = moment(`${currentDate} ${formattedTime}`, 'M/D/YYYY hh:mmA');

        const travelDurationInSeconds = timeDuration[index - 1];
        const arrivalMoment = moment(prevDateTime).add(travelDurationInSeconds, 'seconds');

        if (!currentDateTime.isSameOrAfter(arrivalMoment)) {
          const minimumTime = arrivalMoment.format('MMM D, YYYY [at] h:mm A');
          errorMessage = `Departure time can't be before estimated arrival time (${minimumTime})`;
        }
      }
    }

    handleSetErrors({
      [`stops-${formData.stops?.[index]?.id}`]: {
        ...errors[`stops-${formData.stops?.[index]?.id}`],
        depart_time: errorMessage,
      },
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

  const getMinDate = () => {
    if (index > 0) {
      const prevDateStr = formData.stops[index - 1]?.depart_date;
      if (prevDateStr) {
        const prevDate = moment(prevDateStr, 'M/D/YYYY');
        if (prevDate.isValid()) {
          return prevDate.toDate();
        }
      }
    }
    return null;
  };

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
                  name={`searchable-${Math.random().toString(36).substring(2, 15)}`}
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
              <CustomDateRange startDate={getDate()} minDate={getMinDate()} handleChange={handleCustomDateRange} />
              {index === 0 && errors?.[`stops-${data.id}`]?.depart_date && (
                <span className="error-message">{errors?.[`stops-${data.id}`]?.depart_date}</span>
              )}
              {index !== 0 && errors?.[`stops-${data.id}`]?.depart_date && (
                <span className="error-message">{errors?.[`stops-${data.id}`]?.depart_date}</span>
              )}
            </div>
            <div className="on-at">
              <div className="label">At</div>
              <CustomTimePicker
                value={data.depart_time ? moment(data.depart_time, 'hh:mmA') : null}
                onChange={onTimeChange}
              />
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
            <div className="delete-icon cursor-pointer" onClick={onClose}>
              <CloseDeleteIconSVG />
            </div>
            <div className="remove-stop cursor-pointer" onClick={onClose}>
              Remove stop
            </div>
          </>
        )}
      </div>
      {index !== formData.stops.length - 1 && (
        <button
          className={`common-btn add-stop-btn ${Object.values(errors?.[`stops-${data.id}`] || {}).some((v) => v !== undefined) ? 'has-error' : ''}`}
          onClick={() => handleAddItem(index)}
        >
          <span className="plus-icon">+</span> Add a Stop
        </button>
      )}
    </div>
  );
};

export default SortableStopItem;
