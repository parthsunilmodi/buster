import { v4 as uuidv4 } from 'uuid';

export const getInitialLocation = () => ({
  street_1: '',
  street_2: '',
  city: '',
  state: '',
  postalcode: '',
  lat: 0,
  lng: 0,
  description: '',
  formatted_phone: '',
  formatted_address: '',
  utc_offset: 0,
  url: '',
});

export const getInitialStop = () => ({
  id: uuidv4(),
  location: getInitialLocation(),
  arrive_date: '',
  arrive_time: '',
  depart_date: '',
  depart_time: '',
  isDataFilledWithAPI: false,
});

export const initialFormData = {
  travelstartdate_c: '',
  travelenddate_c: '',
  origincity_c: '',
  originstate_c: '',
  passengers: '',
  sms_opt_in: false,
  stops: [],
  description: '',
  email: '',
  first_name: '',
  last_name: '',
  phone: '',
  submitted: '',
  account_name: '',
  lead_source_description: 'Static Quote v2',
  segment_c: '',
  preferred_coach_type_c: '',
};
