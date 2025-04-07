export const getPlaceDetails = (selectedPlaceId, callback) => {
  if (!window.google || !window.google.maps) return;

  const placesService = new window.google.maps.places.PlacesService(document.createElement("div"));

  placesService.getDetails(
    {
      placeId: selectedPlaceId,
      fields: [
        "address_components",
        "formatted_address",
        "geometry",
        "utc_offset_minutes",
        "url",
        "formatted_phone_number",
        "name",
        "types",
      ],
    },
    (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.address_components) {
        let locationData = {
          street_1: "",
          street_2: "",
          city: "",
          state: "",
          postalcode: "",
          lat: place.geometry?.location?.lat() || null,
          lng: place.geometry?.location?.lng() || null,
          description: place.name || "",
          formatted_phone: place.formatted_phone_number || "",
          formatted_address: place.formatted_address || "",
          utc_offset: place.utc_offset_minutes || null,
          url: place.url || "",
        };

        place.address_components.forEach((component) => {
          if (component.types.includes("street_number")) {
            locationData.street_1 = component.long_name + " " + locationData.street_1;
          }
          if (component.types.includes("route")) {
            locationData.street_1 += component.long_name;
          }
          if (component.types.includes("sublocality") || component.types.includes("subpremise")) {
            locationData.street_2 = component.long_name;
          }
          if (component.types.includes("locality")) {
            locationData.city = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            locationData.state = component.short_name;
          }
          if (component.types.includes("postal_code")) {
            locationData.postalcode = component.long_name;
          }
        });

        // ✅ Call Reverse Geocoding if postalcode is missing
        if (!locationData.postalcode && locationData.lat && locationData.lng) {
          fetchPostalCodeFromCoords(locationData.lat, locationData.lng, locationData, callback);
        } else {
          callback(locationData);
        }
      }
    }
  );
}

// 🔹 Reverse Geocoding to Fetch Missing Postal Code
export const fetchPostalCodeFromCoords = (lat, lng, locationData, callback) => {
  const geocoder = new window.google.maps.Geocoder();
  const latlng = { lat, lng };

  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === "OK" && results?.length > 0) {
      results.forEach((result) => {
        result.address_components.forEach((component) => {
          if (component.types.includes("postal_code")) {
            locationData.postalcode = component.long_name; // ✅ Update existing object
          }
        });
      });
    }
    callback(locationData); // ✅ Return updated object
  });
};