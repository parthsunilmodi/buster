import { ISVGType } from '../assets/svg/SVGType';
import { tripType } from '../constants/data.constant';

export interface Location {
  street_1: string;
  street_2: string;
  city: string;
  state: string;
  postalcode: string;
  lat: number;
  lng: number;
  description: string;
  formatted_phone: string;
  formatted_address: string;
  utc_offset: number;
  url: string;
}

export interface Stop {
  id: string;
  location: Location;
  arrive_date: string;
  arrive_time: string;
  depart_date: string;
  depart_time: string;
  isDataFilledWithAPI: boolean;
}

export interface FormDataType {
  travelstartdate_c: string;
  travelenddate_c: string;
  origincity_c: string;
  originstate_c: string;
  passengers: number | string;
  sms_opt_in: boolean;
  stops: Stop[];
  description: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  submitted: string;
  account_name: string;
  lead_source_description: string;
  segment_c: string;
  preferred_coach_type_c: string;
}

// Extract a union type of the possible trip type values
export type TripType = (typeof tripType)[keyof typeof tripType];

// Define the shape of each trip card
export interface TripCard {
  key: TripType;
  title: string;
  description: string;
  icon: (props: ISVGType) => React.JSX.Element;
  // selectedIcon: string;
}

// error object type based on the form data
export interface ErrorType {
  stops?:
    | {
        description?: string;
        arrive_date?: string;
        arrive_time?: string;
        depart_date?: string;
        depart_time?: string;
      }[]
    | string; // This allows 'stops' to either be an array of objects or a string
  [key: string]: any; // Other keys can be string, boolean, or undefined, excluding 'stops'
}
