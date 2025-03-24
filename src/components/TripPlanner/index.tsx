import React, { useMemo, useState } from 'react';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DatePicker from 'react-datepicker';
import ClockIcon from '../../assets/images/clock-icon.png';
import CalenderIcon from '../../assets/images/clock-icon.png';
import DraggableItem from './DragableItem';
import './TripPlanner.scss'

const DraggableList = () => {
  const [items, setItems] = useState([
    { id: 322, text: "Harsh Common Service Center, Shop No-" },
    { id: 34, text: "xzCs" },
    { id: 423, text: "Another Item" },
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
          <div key={item.id}>
            <DraggableItem
              key={item.id}
              item={item}
              index={index}
              items={items}
              moveItem={moveItem}
              setItems={setItems}
            />
          </div>
        ))}
      </div>
    </DndProvider>
  );
};

export default DraggableList;
