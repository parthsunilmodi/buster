import moment from 'moment';
import { FormDataType } from '../context/types';
import constants from '../constants/data.constant';

export const generatePayload = (formData: FormDataType, selectedCardKey: string) => {
  const resultArr = {
    dev_code: 'Buster2025',
    current_page: 'ph-get-a-quote',
    data: {
      travelstartdate_c: moment(formData.stops[0].depart_date).format('M/D/YYYY'),
      travelenddate_c: moment(
        selectedCardKey === constants.tripType.oneWay
          ? formData.stops[0].depart_date
          : formData.stops[formData.stops.length - 1].arrive_date
      ).format('M/D/YYYY'),
      origincity_c: formData.stops[0].location.city,
      originstate_c: formData.stops[0].location.state,
      passengers: formData.passengers,
      sms_opt_in: formData.sms_opt_in,
      description: `Comments: ${formData.description}`,
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      submitted: moment().utc().format('ddd, DD MMM YYYY HH:mm:ss [GMT]'),
      account_name: formData.account_name,
      lead_source_description: 'Static Quote v2',
      segment_c: formData.segment_c,
      preferred_coach_type_c: formData.preferred_coach_type_c,
      stops: formData.stops.map((stop, index) => {
        if (index === 0) {
          return {
            ...stop,
            id: undefined,
            isDataFilledWithAPI: undefined,
            arrive_date: '',
            arrive_time: '',
            depart_date: stop.depart_date || moment().format('M/D/YYYY'),
            depart_time: stop.depart_time || moment().format('HH:mm A'),
          };
        }
        if (index === formData.stops.length - 1) {
          return {
            ...stop,
            id: undefined,
            isDataFilledWithAPI: undefined,
            arrive_date: stop.arrive_date || formData.stops[index - 1].depart_date,
            arrive_time: stop.arrive_time || formData.stops[index - 1].depart_time,
            depart_date: '',
            depart_time: '',
          };
        }
        return {
          ...stop,
          id: undefined,
          isDataFilledWithAPI: undefined,
          arrive_date: stop.arrive_date || formData.stops[index - 1].depart_date,
          arrive_time: stop.arrive_time || formData.stops[index - 1].depart_time,
          depart_date: stop.depart_date || formData.stops[index].depart_date,
          depart_time: stop.depart_time || formData.stops[index].depart_time,
        };
      }),
    },
  };
  // Remove stops if city, lat and lng are empty
  resultArr.data.stops = resultArr.data.stops.filter(
    (stop) => stop.location.city || stop.location.lat || stop.location.lng
  );

  if (resultArr.data.stops.length === 0) {
    // @ts-ignore
    delete resultArr.data.stops;
  }

  if (resultArr.data.travelenddate_c === 'invalid date') {
    resultArr.data.travelenddate_c = '';
  }

  if (resultArr.data.travelstartdate_c === 'invalid date') {
    resultArr.data.travelstartdate_c = '';
  }

  return resultArr;
};
