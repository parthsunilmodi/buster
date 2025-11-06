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

export interface PhoneValidateData {
  phone_number: string;
  valid: boolean;
  phone_format: {
    international: string;
    national: string;
  };
  phone_location: {
    country_code: string;
    country_name: string;
    country_prefix: string;
  };
  phone_validation: {
    is_valid: boolean;
  }
}

export interface PhoneValidateResponse {
  success: boolean;
  data?: PhoneValidateData;
  message?: string;
}

export interface EmailValidateData {
  email_address: string;
  valid: boolean;
  email_deliverability: {
    status: string;
    is_format_valid: boolean;
  };
}

export interface EmailValidateResponse {
  success: boolean;
  data?: EmailValidateData;
  message?: string;
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
  phoneWithCode: string;
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
  description: string | React.JSX.Element;
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
