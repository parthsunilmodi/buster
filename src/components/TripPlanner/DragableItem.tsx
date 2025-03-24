import { useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import InputField from '../Input';
import CustomDateRange from '../DateRangePicker';
import { Location, DestinationSVG } from '../../assets/svg';

const ItemType = "DRAGGABLE_ITEM";

const DraggableItem = ({ item, index, moveItem, items, setItems }) => {
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
      return 'End Destination';
    } else {
      return 'Destination';
    }
  }, [index, items.length]);

  const renderIcon = useMemo(() => {
    if (index === 0) {
      return <Location />;
    } else if (index === items.length - 1) {
      return <Location />;
    } else {
      return <DestinationSVG />;
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

  const handleChange = (keyName, value) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index], [keyName]: value
    }
    setItems(updatedItems);
  }


  return (
    <div className="d-flex flex-row items-center gap-4 w-100" ref={(node) => ref(drop(node))}>
      {/* Starting From Input */}
      {/*<div className="d-flex stepper-main justify-content-center align-items-center flex-column">*/}
      {/*  <img src={renderIcon} alt="location" width={30} />*/}
      {/*  <hr className="hr-wrapper"/>*/}
      {/*</div>*/}
      <div className="d-flex flex-column gap-3 w-100">
        <div className="d-flex flex-row items-center gap-4">
          <div className="d-flex gap-4 align-items-lg-start w-75">
            <div className="d-flex position-relative stepper-main justify-content-center align-items-center flex-column">
              {/*<img src={renderIcon} alt="location" width={30} />*/}
              {renderIcon}
              {
                items.length - 1 !== index && (
                  <hr className="hr-wrapper position-absolute"/>
                )
              }
            </div>
            <div className="d-flex flex-column w-100">
              <InputField
                name="location"
                value={item.location}
                label={renderLabel}
                onChange={(e)=> handleChange("location", e.target.value)}
              />
              {index !== items.length - 1 && (
                <button className="common-btn mb-5 mt-5" onClick={() => handleAddItem(index)}>
                  + Add Scope
                </button>
              )}
            </div>

          </div>
          <div className="w-25">
            <div className="label">On *</div>
            <CustomDateRange
              startDate={item.date}
              handleChange={(date)=> handleChange("date", date)}
            />
          </div>

          <div className="w-25">
            <div className="label">At</div>
            <input type="time" />
          </div>
        </div>

      </div>

    </div>
  );
};

export default DraggableItem
