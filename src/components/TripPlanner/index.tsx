import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from './DragableItem';
import { data } from '../../constants/index';
import './TripPlanner.scss'

interface ITripPlanner {
  selectedCard: string | null
}

const TripPlanner = ({ selectedCard }: ITripPlanner) => {
  const { tripType } = data
  const initialData = selectedCard !== tripType.roundTrip ? [
    { id: '', location: "", date: new Date(), at: "" },
    { id: '', location: "", date: new Date(), at: "" },
  ] : [
    { id: '', location: "", date: new Date(), at: "" },
    { id: '', location: "", date: new Date(), at: "" },
    { id: '', location: "", date: new Date(), at: "" },
  ];


  const [items, setItems] = useState(initialData);

  useEffect(() => {
    setItems(initialData)
  }, [selectedCard])

  const moveItem = (fromIndex: any, toIndex: any) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

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
