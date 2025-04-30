import React from 'react';
import { RoundTripSVG, OneWayTripSVG, LocalShuttleSVG, LargeTripSVG } from '../assets/svg';
import { TripCard } from '../context/types';

const tripType = {
  roundTrip: 'roundTrip',
  localShuttle: 'localShuttle',
  oneWay: 'oneWay',
  other: 'other',
} as const;

const TRIP_CARD_DATA: TripCard[] = [
  {
    key: tripType.roundTrip,
    title: 'Roundtrip',
    description: 'Point A to B and back to A with optional steps in between.',
    icon: RoundTripSVG,
    // selectedIcon: selectedImg1,
  },
  {
    key: tripType.oneWay,
    title: 'One way',
    description: 'A simple one-way trip, with optional stops in-between.',
    icon: OneWayTripSVG,
    // selectedIcon: selectedImg3,
  },
  {
    key: tripType.localShuttle,
    title: 'Continuous local shuttle',
    description: (
      <div>
        <span>For businesses and large events</span> to move people in between location in two or more trips.
      </div>
    ),
    icon: LocalShuttleSVG,
    // selectedIcon: selectedImg2,
  },
  {
    key: tripType.other,
    title: 'Other: Large trip or details pending',
    description: 'For complex or pending transportation needs.',
    icon: LargeTripSVG,
    // selectedIcon: selectedImg4,
  },
];

const groupType: { label: string; value: string }[] = [
  { label: 'Academic - K-12, Charter Schools, College/Uni', value: 'Academic - K-12, Charter Schools, College/Uni' },
  { label: 'Athletics & Team Travel', value: 'Athletics & Team Travel' },
  { label: 'Camps & After School Programs', value: 'Camps & After School Programs' },
  { label: 'Conventions, Large Events & Festivals', value: 'Conventions, Large Events & Festivals' },
  { label: 'Corporate Travel & Meeting Management', value: 'Corporate Travel & Meeting Management' },
  { label: 'Emergency / Disaster Relief (Priority Access)', value: 'Emergency / Disaster Relief (Priority Access)' },
  { label: 'Faith Based Travel', value: 'Faith Based Travel' },
  { label: 'Government, Political Campaigns & Military', value: 'Government, Political Campaigns & Military' },
  { label: 'Non-Profit and Associations', value: 'Non-Profit and Associations' },
  { label: 'Recurring Shuttles - Employee, Labor, etc', value: 'Recurring Shuttles - Employee, Labor, etc' },
  { label: 'Social, Family, Fraternity/Sorority', value: 'Social, Family, Fraternity/Sorority' },
  { label: 'Tour Operators & Travel Industry', value: 'Tour Operators & Travel Industry' },
  { label: 'Wedding', value: 'Wedding' },
  { label: 'Other', value: 'Other' },
];

const busTypes: { label: string; value: string }[] = [
  { label: 'Deluxe Motorcoach: up to 56 passengers', value: 'Deluxe Motorcoach' },
  { label: 'Mini Bus: 20 to 40', value: 'Mini Bus' },
  { label: 'School Bus: up to 44', value: 'School Bus' },
  { label: 'Executive Coach: up to 40', value: 'Executive Coach' },
];

const constants = {
  TRIP_CARD_DATA,
  tripType,
  groupType,
  busTypes,
};

// export all constants
export default constants;
export { TRIP_CARD_DATA, tripType, groupType, busTypes };
