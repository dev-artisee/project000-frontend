'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { CoordinateType } from '@/app/home/_hooks/useGeoLocation';
import KakaoMap from '@/app/map/_components/kakao-map';
import MapMenu from '@/app/map/_components/map-menu';

const testData = {
  addressName: '서울 종로구 당주동 128-14',
  categoryName: '음식점 > 한식 > 감자탕',
  latitude: '37.57206674297403',
  longitude: '126.97258332291042',
  phone: '02-722-5894',
  placeName: '광화문뚝감',
  placeUrl: 'http://place.map.kakao.com/18363906',
  roadAddressName: '서울 종로구 새문안로3길 21',
};

const MapSection = () => {
  const searchParams = useSearchParams();
  const [radius, setRadius] = useState(searchParams.get('radius') || '50');
  const [category, setCategory] = useState(searchParams.get('category'));
  const [loc, setLoc] = useState<CoordinateType | null>();

  useEffect(() => {
    const locItem = localStorage.getItem('loc');
    locItem ? setLoc(JSON.parse(locItem)) : setLoc(null);
  }, []);

  return (
    <section>
      <div className="flex gap-2 fixed z-50 bottom-6 left-[50%] translate-x-[-50%]">
        <MapMenu radius={radius} setRadius={setRadius} />
      </div>
      <div className="h-screen w-screen">
        {loc && <KakaoMap loc={loc} radius={radius} dinerInfoData={testData} />}
      </div>
    </section>
  );
};

export default MapSection;
