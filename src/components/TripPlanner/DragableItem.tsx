import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import plusIcon from '../../assets/images/plusIcon.png';
import CustomTimePicker from '../CustomTimePicker/index';
import CustomDateRange from '../DateRangePicker';
import {
  Location,
  DestinationSVG,
  CloseDeleteIconSVG,
  DraggableIcon,
} from '../../assets/svg';
import { data } from '../../constants';
import SearchableSelect from '../SearchableSelect/index';
import { getPlaceDetails } from './api';

const ItemType = 'DRAGGABLE_ITEM';

const DraggableItem = ({ item, index, moveItem, items, setItems, selectedCard }) => {
  const { tripType } = data;
  const [isDrag, setIsDrag] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isDraggingIcon }, dragIcon] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDraggingIcon: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const renderLabel = useMemo(() => {
    if (index === 0) return 'Starting From';
    if (index === items.length - 1) return 'Ending At';
    return 'Destination';
  }, [index, items.length]);

  const renderIcon = useMemo(() => {
    return index === 0 || index === items.length - 1 ? <Location/> : <DestinationSVG/>;
  }, [index, items.length]);

  const handleAddItem = (index) => {
    const newItem = {
      id: Date.now(),
      text: `New Item ${Date.now()}`,
    };
    const updatedItems = [...items];
    updatedItems.splice(index + 1, 0, newItem);
    setItems(updatedItems);
  };

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleRemoveItem = () => {
    const updatedItems = items.filter((_, idx) => idx !== index);
    setItems(updatedItems);
  };

  const [places, setPlaces] = useState('');
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    if (!window.google || !window.google.maps) return;

    const autocompleteService = new window.google.maps.places.AutocompleteService();

    if (places) {
      autocompleteService.getPlacePredictions({ input: places }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const formattedResults = results.map((place) => ({
            value: place.place_id,
            label: place.description,
          }));
          setPredictions(formattedResults);
        } else {
          setPredictions([]);
        }
      });
    }
  }, [places]);

  const handleSelect = (selectedPlaceId) => {
    setPlaces(selectedPlaceId);

    getPlaceDetails(selectedPlaceId, (locationData) => {
      // console.log("Final Location Data:", locationData);
    });
  };

  const [selectedTime, setSelectedTime] = useState("02:00AM");

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <div className="position-relative" ref={drop}>
      <div className="render-icon-wrapper d-flex stepper-main justify-content-center align-items-center flex-column">
        <div onMouseEnter={() => setIsDrag(true)} onMouseLeave={() => setIsDrag(false)}>
          {renderIcon}
        </div>
        {items.length - 1 !== index && <hr className="hr-wrapper position-absolute"/>}
      </div>

      <div
        className="draggable-icon"
        ref={dragIcon}
        onMouseEnter={() => setIsDrag(true)}
        onMouseLeave={() => setIsDrag(false)}
      >
        {index !== items.length - 1 && isDrag && <DraggableIcon/>}
      </div>

      <div
        ref={drag}
        onMouseEnter={() => setIsDrag(true)}
        onMouseLeave={() => setIsDrag(false)}
        className={`item-container d-flex position-relative main-wrapper items-center gap-4 w-100 ${
          isDragging ? 'dragging' : ''
        }`}
      >
        <div className="location d-flex gap-4 align-items-lg-start">
          <div className="d-flex flex-column justify-content-end w-100">
            {selectedCard === tripType.roundTrip && index === items.length - 1 ? (
              <div className="d-flex flex-column gap-2">
                <span className="label required">Ending At</span>
                <span className="description-wrapper">
                  Round trip: end point will be the same as the start point
                </span>
              </div>
            ) : (
              <SearchableSelect
                options={predictions}
                value={places}
                onChange={setPlaces}
                onSelect={handleSelect}
                placeholder="Search location"
                label="Location"
                name="location"
                isRequired
              />
            )}
          </div>
        </div>

        {(items.length - 1 !== index || selectedCard === tripType.localShuttle) && (
          <>
            <div className="on-at">
              <div className="label required">On</div>
              <CustomDateRange
                startDate={selectedDate}
                handleChange={(date) => handleChange(date)}
              />
            </div>
            <div className="on-at">
              <div className="label">At</div>
              <CustomTimePicker
                value={selectedTime}
                onChange={handleTimeChange}
              />
            </div>
          </>
        )}

        {index !== 0 && items.length - 1 !== index && (
          <>
            <div className="delete-icon" onClick={handleRemoveItem}>
              {isDrag && <CloseDeleteIconSVG/>}
            </div>
            <div className="remove-stop" onClick={handleRemoveItem}>
              Remove stop
            </div>
          </>
        )}
      </div>

      {index !== items.length - 1 && (
        <button className="common-btn mb-5 mt-5" onClick={() => handleAddItem(index)}>
          <img src={plusIcon} alt="PlusIcon"/> Add a Stop
        </button>
      )}
    </div>
  );
};

export default DraggableItem;
