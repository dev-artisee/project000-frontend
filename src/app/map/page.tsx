import React from 'react';

// import MapSection from '@/app/map/_components/map-section';

const MapPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  console.log(searchParams);
  return <div>{/* <MapSection /> */}</div>;
};

export default MapPage;
