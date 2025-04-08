import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from './DragableItem';
import { data } from '../../constants/index';
import './TripPlanner.scss'

interface ITripPlanner {
  selectedCard: string | null;
  setSubmitData?: any;
}

const TripPlanner = ({ selectedCard, setSubmitData }: ITripPlanner) => {
  const { tripType } = data
  const initialData = selectedCard !== tripType.roundTrip ? [
    { id: Date.now(), location: "", date: new Date(), at: "" },
    { id: Date.now(), location: "", date: new Date(), at: "" },
  ] : [
    { id: Date.now(), location: "", date: new Date(), at: "" },
    { id: Date.now(), location: "", date: new Date(), at: "" },
    { id: Date.now(), location: "", date: new Date(), at: "" },
  ];
  const [items, setItems] = useState(initialData);

  const [locationData, setLocationData] = useState();

  useEffect(() => {
    if (locationData) {
      setSubmitData((prev: any) => {
        return prev.map((trip: any) => {
          let updatedStops = [...trip.stops];
          if (updatedStops.length > 0) {
            if (!updatedStops[updatedStops.length - 1].location.city) {
              updatedStops[updatedStops.length - 1] = {
                ...updatedStops[updatedStops.length - 1],
                location: { ...locationData },
              };
            } else {
              updatedStops.push({
                location: { ...locationData },
                arrive_date: "",
                arrive_time: "",
                depart_date: "",
                depart_time: "",
              });
            }
          } else {
            updatedStops.push({
              location: { ...locationData },
              arrive_date: "",
              arrive_time: "",
              depart_date: "",
              depart_time: "",
            });
          }
          return {
            ...trip,
            origincity_c: locationData?.city,
            originstate_c: locationData?.state,
            stops: updatedStops,
          };
        });
      });
    }
  }, [locationData, setSubmitData]);


  useEffect(() => {
    setSubmitData((prev: any) =>
      prev.map((trip: any) => ({
        ...trip,
        stops: [], // Clear all existing stops
      }))
    );
  }, [selectedCard]);

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
              setLocationData={setLocationData}
              setSubmitData={setSubmitData}
            />
          </div>
        ))}
      </div>
    </DndProvider>
  );
};

export default TripPlanner;
