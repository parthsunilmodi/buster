import React, { useState } from 'react';
import CustomCard from '../../components/CustomCard';
import { data } from '../../constants';
import './TripInformationForm.scss';

interface ITripCard {
  selectedCard: string | null;
  setSelectedCard: (value: string) => void
}

const TripCards: React.FC<ITripCard> = ({ selectedCard, setSelectedCard}) => {
  const { TRIP_CARD_DATA } = data;

  return (
    <div className="trip-cards">
      {TRIP_CARD_DATA.map((trip, index) => (
        <CustomCard
          key={index}
          title={trip.title}
          description={trip.description}
          icon={selectedIndex === index ? trip.selectedIcon : trip.icon}
          selected={trip.key === selectedCard}
          onClick={() => setSelectedCard(trip.key)}
        />
      ))}
    </div>
  );
};

export default TripCards;
