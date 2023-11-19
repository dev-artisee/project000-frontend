import { useEffect, useState } from 'react';

import { getAddress } from '@/app/home/_api/getAdress';

export interface locationType {
  loaded: boolean;
  coordinates?: { lat: number; lng: number; adress: string };
  error?: { code: number; message: string };
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0, adress: '' },
  });

  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    const locationInfo = {
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        adress: '',
      },
    };
    getAddress(location.coords.latitude, location.coords.longitude)
      .then((response) => {
        console.log(response);
        locationInfo.coordinates.adress = response;
      })
      .finally(() => setLocation(locationInfo));
  };
  const onError = (error: { code: number; message: string }) => {
    setLocation({ loaded: true, error });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({ code: 0, message: 'Geolocation not supported' });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};
