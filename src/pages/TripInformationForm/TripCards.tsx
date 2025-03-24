import React, { useState } from 'react';
import CustomCard from '../../components/CustomCard';
import { data } from '../../constants';
import './TripInformationForm.scss';

const TripCards: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { TRIP_CARD_DATA } = data;

  return (
    <div className="trip-cards">
      {TRIP_CARD_DATA.map((trip, index) => (
        <CustomCard
          key={index}
          title={trip.title}
          description={trip.description}
          icon={trip.icon}
          selected={selectedIndex === index}
          onClick={() => setSelectedIndex(index)}
        />
      ))}
    </div>
  );
};

export default TripCards;
