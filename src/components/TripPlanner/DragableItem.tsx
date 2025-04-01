import React, { useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import plusIcon from '../../assets/images/plusIcon.png';
import CustomTimePicker from '../CustomTimePicker/index';
import InputField from '../Input';
import CustomDateRange from '../DateRangePicker';
import { Location, DestinationSVG, CloseDeleteIconSVG, DraggableIcon } from '../../assets/svg';
import { data } from '../../constants'

const ItemType = "DRAGGABLE_ITEM";

const DraggableItem = ({ item, index, moveItem, items, setItems, selectedCard }) => {
  const { tripType } = data;
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
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
    if (index === 0) {
      return 'Starting From';
    } else if (index === items.length - 1) {
      return 'Ending At';
    } else {
      return 'Destination';
    }
  }, [index, items.length]);

  const renderIcon = useMemo(() => {
    if (index === 0 || index === items.length - 1) {
      return <Location />;
    } else {
      return <DestinationSVG />;
    }
  }, [index, items.length]);

  const handleAddItem = (index) => {
    const newItem = {
      id: Date.now(),
      text: `New Item ${Date.now()}`,
    };

    const updatedItems = [...items];
    updatedItems.splice(index + 1, 0, newItem); // Insert after the clicked item
    setItems(updatedItems);
  };

  const handleChange = (keyName, value) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index], [keyName]: value
    }
    setItems(updatedItems);
  }

  const handleRemoveItem = () => {
    const updatedItems = items.filter((_, idx) => idx !== index);
    setItems(updatedItems);
  }

  return (
    <>
    <div className="item-container d-flex position-relative main-wrapper items-center gap-4 w-100" >
      <div className="position-absolute draggable-icon"  ref={(node) => ref(drop(node))}>
        {index !== 0 && index !== items.length - 1 &&  ( <DraggableIcon />)}
      </div>
      <div className="location d-flex gap-4 align-items-lg-start">
        <div className="d-flex position-relative stepper-main justify-content-center align-items-center flex-column">
          {renderIcon}
          {
            items.length - 1 !== index &&  (
              <hr className="hr-wrapper position-absolute"/>
            )
          }
        </div>
        <div className="d-flex flex-column justify-content-end w-100">
          {
            selectedCard === tripType.roundTrip && index === items.length - 1 ?
              <div className="d-flex flex-column gap-2">
                <span className="label required">Ending At</span>
                <span className="description-wrapper">Round trip: end point will be the same as the start point</span>
              </div>
              :
              <InputField
                isRequired={true}
                name="location"
                value={item.location}
                label={renderLabel}
                labelStyle="label-style"
                onChange={(e)=> handleChange("location", e.target.value)}
              />
          }
        </div>
      </div>
      {
        (items.length - 1 !== index || selectedCard === tripType.localShuttle)  && (
          <>
          <div className="on-at">
            <div className="label required">On</div>
            <CustomDateRange
              startDate={item.date}
              handleChange={(date)=> handleChange("date", date)}
            />
          </div>
          <div className="on-at">
            <div className="label">At </div>
            <CustomTimePicker value={item.at} onChange={(time) => handleChange("at", time )}  />
          </div>
        </>
        )
      }
      {
        (index !== 0 && items.length - 1 !== index) &&
        <div className="delete-icon" onClick={handleRemoveItem}>
          <CloseDeleteIconSVG />
        </div>
      }
      {
        (index !== 0 && items.length - 1 !== index) &&
        <div className="remove-stop" onClick={handleRemoveItem}>
           Remove stop
        </div>
      }
    </div>
  {index !== items.length - 1 && (
    <button className="common-btn mb-5 mt-5" onClick={() => handleAddItem(index)}>
      <img src={plusIcon} alt="PlusIcon" /> Add a Stop
    </button>
  )}
  </>
  );
};

export default DraggableItem
