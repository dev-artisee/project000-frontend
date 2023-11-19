'use client';

import React from 'react';

const MapPage = () => {
  if (!navigator.geolocation) {
    console.log('브라우저가 위치 정보를 지원하지 않음');
  } else {
    console.log('위치 파악 중…');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log((position.coords.latitude, position.coords.longitude));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <div>
      <div>map</div>
    </div>
  );
};

export default MapPage;
