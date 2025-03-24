import cardImg1 from '../assets/images/trip-icon1.png';
import cardImg2 from '../assets/images/trip-icon2.png';
import cardImg3 from '../assets/images/trip-icon3.png';
import cardImg4 from '../assets/images/trip-icon4.png';

const tripType = {
  roundTrip: 'roundTrip',
  localShuttle: 'localShuttle',
  oneWay: 'oneWay',
  other: 'other'
}

const TRIP_CARD_DATA = [
  {
    key: tripType.roundTrip,
    title: "Roundtrip",
    description: "Point A to B and back to A with optional steps in between.",
    icon: cardImg1,
  },
  {
    key: tripType.localShuttle,
    title: "Continuous local shuttle",
    description: "Move people in between locations in 2 or more trips.",
    icon: cardImg2,
  },
  {
    key: tripType.oneWay,
    title: "One way",
    description: "A simple one-way trip, with optional stops in-between.",
    icon: cardImg3,
  },
  {
    key: tripType.other,
    title: "Other: Large trip or details pending",
    description: "For complex or pending transportation needs.",
    icon: cardImg4,
  }
];

const data = {
  TRIP_CARD_DATA,
  tripType
}

export default data;