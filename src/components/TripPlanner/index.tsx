import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from './DragableItem';
import './TripPlanner.scss'


const TripPlanner = () => {
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-100 py-5 trip-planner-main">
        {items.map((item, index) => (
          <DraggableItem
            key={item.id}
            item={item}
            index={index}
            items={items}
            moveItem={moveItem}
            setItems={setItems}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default TripPlanner;
