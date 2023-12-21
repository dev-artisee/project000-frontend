import React, { cache } from 'react';

import { apiClient } from '@/api/api-client';

// import MapSection from '@/app/map/_components/map-section';

// const getRecommendPlace = async (latitude, longitude, radius = '50') => {
//   const params = { latitude, longitude, radius, category: '' };
//   const queryString = new URLSearchParams(params).toString();
//   const url = `/api/recommend/place?${queryString}`;
//   console.log(url);
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

const getRecommendPlace = cache(async (latitude, longitude, radius = '100') => {
  try {
    const response = await apiClient().get(`/api/recommend/place`, {
      params: { latitude, longitude, radius, category: '' },
    });
    return response.data;
  } catch (error) {
    console.log('error');
    throw error;
  }
});

const MapPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const latitude = searchParams?.latitude;
  const longitude = searchParams?.longitude;
  const radius = searchParams?.radius;
  console.log(latitude, longitude, radius);

  const data = await getRecommendPlace(latitude, longitude, radius);
  return <div>{/* <MapSection /> */}</div>;
};

export default MapPage;
