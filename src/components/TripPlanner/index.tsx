import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DatePicker from 'react-datepicker';
import ClockIcon from '../../assets/images/clock-icon.png';
import CalenderIcon from '../../assets/images/clock-icon.png';
import InputField from '../Input/Input';
const ItemType = "DRAGGABLE_ITEM";

const DraggableItem = ({ item, index, moveItem }) => {
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

  return (
    <div className="d-flex flex-row items-center gap-4 p-4" ref={(node) => ref(drop(node))}>
      {/* Starting From Input */}
      <div className="w-50">
        <InputField value={item.text} label="Starting From*"  />
      </div>
      <div className="w-25">
        <InputField value={"disldj"} label="Starting From*" />
      </div>
      <div className="w-25">
        <InputField value="hduksh" label="Starting From*" />
      </div>

      {/*/!* Date Picker *!/*/}
      {/*<div className="flex flex-col">*/}
      {/*  <label className="text-sm font-medium">*/}
      {/*    On <span className="text-red-500">*</span>*/}
      {/*  </label>*/}
      {/*  <div className="relative">*/}
      {/*    <DatePicker*/}
      {/*      selected={startDate}*/}
      {/*      onChange={(date) => setStartDate(date)}*/}
      {/*      className="w-32 p-2 border rounded-md bg-gray-100"*/}
      {/*      placeholderText="Select date"*/}
      {/*    />*/}
      {/*    <img src={CalenderIcon} alt="calender" />*/}
      {/*    /!*<CalendarIcon className="w-5 h-5 absolute right-2 top-3 text-gray-500" />*!/*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*/!* Time Picker *!/*/}
      {/*<div className="flex flex-col">*/}
      {/*  <label className="text-sm font-medium">At</label>*/}
      {/*  <div className="relative">*/}
      {/*    <DatePicker*/}
      {/*      selected={startTime}*/}
      {/*      onChange={(time) => setStartTime(time)}*/}
      {/*      showTimeSelect*/}
      {/*      showTimeSelectOnly*/}
      {/*      timeIntervals={15}*/}
      {/*      timeCaption="Time"*/}
      {/*      dateFormat="h:mm aa"*/}
      {/*      className="w-32 p-2 border rounded-md bg-gray-100"*/}
      {/*      placeholderText="Select time"*/}
      {/*    />*/}
      {/*    <img src={ClockIcon} alt="calender" />*/}
      {/*    /!*<ClockIcon className="w-5 h-5 absolute right-2 top-3 text-gray-500" />*!/*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

const DraggableList = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Harsh Common Service Center, Shop No-" },
    { id: 2, text: "xzCs" },
    { id: 3, text: "Another Item" },
  ]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-100 border p-4">
        {items.map((item, index) => (
          <DraggableItem
            key={item.id}
            item={item}
            index={index}
            moveItem={moveItem}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DraggableList;
