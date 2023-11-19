'use client';

import React from 'react';

import KakaoMap from '@/app/map/_components/kakao-map';

const MapPage = () => {
  return (
    <div>
      <div className="h-screen w-screen">
        <KakaoMap lat={33.450701} lng={126.570667} />
      </div>
    </div>
  );
};

export default MapPage;
