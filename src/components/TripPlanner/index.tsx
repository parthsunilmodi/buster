import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CustomDateRange from '../DateRangePicker/index';
import InputField from '../Input/Input';
const ItemType = "DRAGGABLE_ITEM";
import './TripPlanner.scss'

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

  const renderLabel = () => {
    if(index === items.length - 1) {
      return 'Ending at'
    } else if(index === 0) {
      return 'Starting from'
    } else {
      return 'Destination'
    }
  };

  const handleChange = (keyName, value) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index], [keyName]: value
    }
    setItems(updatedItems);
  }

  return (
    <div className="d-flex flex-row items-center gap-4 p-4" ref={(node) => ref(drop(node))}>
      <div className="w-50">
        <InputField name="location" value={item.location} label={renderLabel()} onChange={(e)=>handleChange("location", e.target.value)} />
      </div>
      <div>
        <div className="label">On *</div>
        <CustomDateRange startDate={item.date} handleChange={(date)=>handleChange("date", date)}   />
      </div>
      <div>
        <div className="label">At</div>
        <input type="time" />
      </div>
    </div>
  );
};

const DraggableList = () => {
  const [items, setItems] = useState([
    { id: 322, text: "Harsh Common Service Center, Shop No-", location: "", date: new Date(), at:"" },
    { id: 34, text: "xzCs", location: "", date: new Date(), at:"" },
    { id: 423, text: "Another Item", location: "", date: new Date(), at:"" },
  ]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  const handleAddItem = (index: string|number) => {
    const newItem = {
      id: Date.now(), // Unique ID based on current timestamp
      text: `New Item ${Date.now()}`, // Default text for the new item
    };

    const updatedItems = [...items];
    updatedItems.splice(index + 1, 0, newItem); // Insert after the clicked item
    setItems(updatedItems);
  }


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-100 border p-4">
        {items.map((item, index) => (
          <div>
          <DraggableItem
            key={item.id}
            item={item}
            index={index}
            items={items}
            moveItem={moveItem}
            setItems={setItems}
          />
            {
              items.length - 1 !== index && (
                <button className="common-btn" onClick={() => handleAddItem(index)}>Add Scope</button>
              )
            }
          </div>
        ))}
      </div>
    </DndProvider>
  );
};

export default DraggableList;
