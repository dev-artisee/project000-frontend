'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

import KakaoMap from '@/app/map/_components/kakao-map';
import MapMenu from '@/app/map/_components/map-menu';

const MapPage = () => {
  const searchParams = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div>
      <div className="flex gap-2 fixed z-50 bottom-6 left-[50%] translate-x-[-50%]">
        <MapMenu />
      </div>
      <div className="h-screen w-screen">
        {lat && lng && <KakaoMap lat={lat} lng={lng} />}
      </div>
    </div>
  );
};

export default MapPage;
