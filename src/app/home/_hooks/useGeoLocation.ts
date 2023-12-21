import { useEffect, useState } from 'react';

import { getAddress } from '@/app/home/_api/getAddress';

export type CoordinateType = {
  lat: number;
  lng: number;
  address: string;
};
export interface LocationType {
  loaded: boolean;
  coordinates?: CoordinateType;
  error?: { code: number; message: string };
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<LocationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0, address: '' },
  });

  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    const locationInfo = {
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        address: '',
      },
    };
    getAddress(location.coords.latitude, location.coords.longitude)
      .then((response) => {
        console.log(response);
        locationInfo.coordinates.address = response;
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
