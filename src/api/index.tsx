import axios from 'axios';
import { FormDataType, Location } from '../context/types';
import { generatePayload } from './payloadFormat';

// 🔹 Reverse Geocoding to Fetch Missing Postal Code
export const fetchPostalCodeFromCoords = (lat: number, lng: number, locationData: Location, callback: any) => {
  const geocoder = new window.google.maps.Geocoder();
  const latlng = { lat, lng };

  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === 'OK' && results?.length) {
      results.forEach((result) => {
        result.address_components.forEach((component) => {
          if (component.types.includes('postal_code')) {
            locationData.postalcode = component.long_name; // ✅ Update existing object
          }
        });
      });
    }
    callback(locationData); // ✅ Return updated object
  });
};

// submit api call here
const API_URL = import.meta.env.VITE_APP_BASE_URL;

export const sendTripData = async (data: FormDataType, selectedCardKey: string, fileUrl: string[]) => {
  try {
    const config: any = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(API_URL, generatePayload(data, selectedCardKey, fileUrl), config);
    if (response.data) {
      window.location.href = `${window.location.origin}${response.data.redirect_path}`;
    }
    console.log('Response:', response.data);
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error submitting data:', error);
    return {
      success: false,
    };
  }
};

export const fetchPredictions = (value: string, setPredictions: any) => {
  try {
    if (!window.google || !window.google.maps) return;

    const autocompleteService = new window.google.maps.places.AutocompleteService();

    if (value) {
      autocompleteService.getPlacePredictions({ input: value }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          if (!results || !results.length) return;
          const formattedResults = results.map((place) => ({
            value: place.place_id,
            label: place.description,
          }));
          setPredictions(formattedResults);
        }
      });
    }
  } catch (error) {
    console.error('Error fetching predictions:', error);
  }
};

export const fetchPlaceDetails = (value: string): Promise<any> => {
  try {
    return new Promise((resolve) => {
      if (!window.google || !window.google.maps) resolve(false);
      const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));

      placesService.getDetails(
        {
          placeId: value,
          fields: [
            'address_components',
            'formatted_address',
            'geometry',
            'utc_offset_minutes',
            'url',
            'formatted_phone_number',
            'name',
            'types',
          ],
        },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.address_components) {
            let locationData: Location = {
              street_1: '',
              street_2: '',
              city: '',
              state: '',
              postalcode: '',
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
              description: place.name || '',
              formatted_phone: place.formatted_phone_number || '',
              formatted_address: place.formatted_address || '',
              utc_offset: place.utc_offset_minutes || 0,
              url: place.url || '',
            };

            place.address_components.forEach((component) => {
              if (component.types.includes('street_number')) {
                locationData.street_1 = component.long_name + ' ' + locationData.street_1;
              }
              if (component.types.includes('route')) {
                locationData.street_1 += component.long_name;
              }
              if (component.types.includes('sublocality') || component.types.includes('subpremise')) {
                locationData.street_2 = component.long_name;
              }
              if (component.types.includes('locality')) {
                locationData.city = component.long_name;
              }
              if (component.types.includes('administrative_area_level_1')) {
                locationData.state = component.short_name;
              }
              if (component.types.includes('country')) {
                if (!locationData.city) locationData.city = component.long_name; // If no city, use country
                if (!locationData.state) locationData.state = component.short_name; // If no state, use country code
              }
              if (component.types.includes('postal_code')) {
                locationData.postalcode = component.long_name;
              }
            });

            // ✅ Call Reverse Geocoding if postalcode is missing
            if (!locationData.postalcode && locationData.lat && locationData.lng) {
              fetchPostalCodeFromCoords(locationData.lat, locationData.lng, locationData, () => {
                resolve(locationData);
              });
            } else {
              resolve(locationData);
            }
          } else {
            resolve(false);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error fetching place details:', error);
    return Promise.resolve(false);
  }
};
