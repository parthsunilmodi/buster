import cardImg1 from '../assets/images/trip-icon1.png';
import cardImg2 from '../assets/images/trip-icon2.png';
import cardImg3 from '../assets/images/trip-icon3.png';
import cardImg4 from '../assets/images/trip-icon4.png';
import selectedImg1 from '../assets/images/trip-icon5.png';
import selectedImg2 from '../assets/images/trip-icon6.png';
import selectedImg3 from '../assets/images/trip-icon7.png';
import selectedImg4 from '../assets/images/trip-icon8.png';

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
    selectedIcon: selectedImg1,
  },
  {
    key: tripType.localShuttle,
    title: "Continuous local shuttle",
    description: "Move people in between locations in 2 or more trips.",
    icon: cardImg2,
    selectedIcon: selectedImg2,
  },
  {
    key: tripType.oneWay,
    title: "One way",
    description: "A simple one-way trip, with optional stops in-between.",
    icon: cardImg3,
    selectedIcon: selectedImg3,
  },
  {
    key: tripType.other,
    title: "Other: Large trip or details pending",
    description: "For complex or pending transportation needs.",
    icon: cardImg4,
    selectedIcon: selectedImg4,
  }
];

const groupType = [
  { label: "Academic - K-12, Charter Schools, College/Uni", value: "Academic - K-12, Charter Schools, College/Uni" },
  { label: "Athletics & Team Travel", value: "Athletics & Team Travel" },
  { label: "Camps & After School Programs", value: "Camps & After School Programs" },
  { label: "Conventions, Large Events & Festivals", value: "Conventions, Large Events & Festivals" },
  { label: "Corporate Travel & Meeting Management", value: "Corporate Travel & Meeting Management" },
  { label: "Emergency / Disaster Relief (Priority Access)", value: "Emergency / Disaster Relief (Priority Access)" },
  { label: "Faith Based Travel", value: "Faith Based Travel" },
  { label: "Government, Political Campaigns & Military", value: "Government, Political Campaigns & Military" },
  { label: "Non-Profit and Associations", value: "Non-Profit and Associations" },
  { label: "Recurring Shuttles - Employee, Labor, etc", value: "Recurring Shuttles - Employee, Labor, etc" },
  { label: "Social, Family, Fraternity/Sorority", value: "Social, Family, Fraternity/Sorority" },
  { label: "Tour Operators & Travel Industry", value: "Tour Operators & Travel Industry" },
  { label: "Wedding", value: "Wedding" },
  { label: "Other", value: "Other" },
];

const busTypes = [
  { label: "Deluxe Motorcoach: up to 56 passengers", value: "Deluxe Motorcoach" },
  { label: "Mini Bus: 20 to 40", value: "Mini Bus" },
  { label: "School Bus: up to 44", value: "School Bus" },
  { label: "Executive Coach: up to 40", value: "Executive Coach" },
];

const data = {
  TRIP_CARD_DATA,
  tripType,
  groupType,
  busTypes
}

export default data;