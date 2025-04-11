import React from 'react';
import CustomCard from '../../components/CustomCard';
import { data } from '../../constants';
import './TripInformationForm.scss';
import { useDataContext } from '../../context/dataContext';
import { getInitialStop } from '../../context/data';
import constants from '../../constants/data.constant';

const TripCards: React.FC = () => {
  const { selectedCard, setSelectedCard, setFormData } = useDataContext();

  const onCardChange = (key: string) => () => {
    const selectedTrip = data.TRIP_CARD_DATA.find((trip) => trip.key === key);
    if (!selectedTrip) return;
    setSelectedCard(selectedTrip);
    if (selectedTrip?.key === constants.tripType.roundTrip) {
      // add 3 stops to the formData
      const newStops = Array.from({ length: 3 }, () => getInitialStop());
      setFormData((prev) => ({
        ...prev,
        stops: newStops,
      }));
    }
    if (selectedTrip?.key === constants.tripType.localShuttle || selectedTrip?.key === constants.tripType.oneWay) {
      // add 2 stops to the formData
      const newStops = Array.from({ length: 2 }, () => getInitialStop());
      setFormData((prev) => ({
        ...prev,
        stops: newStops,
      }));
    }
    if (selectedTrip?.key === constants.tripType.other) {
      setFormData((prev) => ({
        ...prev,
        stops: [],
      }));
    }
  };

  return (
    <div className="trip-cards">
      {data.TRIP_CARD_DATA.map((trip, index) => (
        <CustomCard
          key={index}
          title={trip.title}
          description={trip.description}
          icon={trip.key === selectedCard?.key ? trip.selectedIcon : trip.icon}
          selected={trip.key === selectedCard?.key}
          onClick={onCardChange(trip.key)}
        />
      ))}
    </div>
  );
};

export default TripCards;
