import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import plusIcon from '../../assets/images/plusIcon.png';
import DraggableItem from './DragableItem';
import './TripPlanner.scss'

interface ITripPlanner {
  selectedCard: string | null
}

const TripPlanner = ({ selectedCard } :ITripPlanner) => {
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
      <div className="w-100 py-5 trip-planner-main">
        {items.map((item, index) => (
          <div>
          <DraggableItem
            key={item.id}
            item={item}
            index={index}
            items={items}
            moveItem={moveItem}
            setItems={setItems}
            selectedCard={selectedCard}
          />
          </div>
        ))}
      </div>
    </DndProvider>
  );
};

export default TripPlanner;
