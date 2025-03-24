import { useDrag, useDrop } from 'react-dnd';
import React, { useMemo, useState } from 'react';
import LocationIcon from '../../assets/images/location.png';
import DestinationIcon from '../../assets/images/destination.png';
import InputField from '../Input/Input';

const ItemType = "DRAGGABLE_ITEM";

const DraggableItem = ({ item, index, moveItem, items, setItems }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

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
    if (index === 0) {
      return 'Starting From';
    } else if (index === items.length - 1) {
      return 'End Destination';
    } else {
      return 'Destination';
    }
  }, [index, items.length]);

  const renderIcon = useMemo(() => {
    if (index === 0) {
      return LocationIcon;
    } else if (index === items.length - 1) {
      return LocationIcon;
    } else {
      return DestinationIcon;
    }
  }, [index, items.length]);

  const handleAddItem = (index) => {
    const newItem = {
      id: Date.now(), // Unique ID based on current timestamp
      text: `New Item ${Date.now()}`, // Default text for the new item
    };

    const updatedItems = [...items];
    updatedItems.splice(index + 1, 0, newItem); // Insert after the clicked item
    setItems(updatedItems);
  };

  return (
    <div className="d-flex flex-row items-center gap-4" ref={(node) => ref(drop(node))}>
      {/* Starting From Input */}
      <div className="d-flex stepper-main justify-content-center align-items-center flex-column">
        <img src={renderIcon} alt="location" width={30} />
        <hr className="hr-wrapper"/>
      </div>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-row items-center gap-4">
          <div className="w-50">
            <InputField value={item.text} label={renderLabel} />
          </div>
          <div className="w-25">
            <InputField value={"disldj"} label="Starting From*" />
          </div>

          <div className="w-25">
            <InputField value="hduksh" label="Starting From*" />
          </div>
        </div>
        {index !== items.length - 1 && (
          <button className="common-btn mb-3" onClick={() => handleAddItem(index)}>
            + Add Scope
          </button>
        )}
      </div>

    </div>
  );
};

export default DraggableItem
