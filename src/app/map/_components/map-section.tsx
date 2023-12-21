'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { getRecommendPlace } from '@/api/map/api';
import KakaoMap, { CurrentLocType } from '@/app/map/_components/kakao-map';

const testData = {
  addressName: '서울 종로구 내수동 73',
  categoryName: '음식점 > 술집',
  latitude: '37.57267668070279',
  longitude: '126.97242914810151',
  phone: '',
  placeName: '카이라',
  placeUrl: 'http://place.map.kakao.com/2144057499',
  roadAddressName: '서울 종로구 새문안로3길 23',
};

const MapSection = () => {
  const searchParams = useSearchParams();
  const [dinerInfo, setDinerInfo] = useState();
  const [originalLoc, setOriginalLoc] = useState<CurrentLocType>();
  const [currentLoc, setCurrentLoc] = useState<CurrentLocType>();
  const [radius, setRadius] = useState<string>('');
  const [categoryList, setCategoryList] = useState<string>('');

  useEffect(() => {
    let latitude = searchParams.get('latitude');
    let longitude = searchParams.get('longitude');
    if (!latitude || !longitude) {
      const locItem = localStorage.getItem('loc') || '';
      const locJson = JSON.parse(locItem);
      latitude = `${locJson.lat}`;
      longitude = `${locJson.lng}`;
    }
    setOriginalLoc({ lat: latitude, lng: longitude });
    setCurrentLoc({ lat: latitude, lng: longitude });

    const radius = searchParams.get('radius') || '';
    setRadius(radius);

    const category = searchParams.get('category') || '';
    setCategoryList(category);

    console.log(latitude, longitude, radius, category);

    getRecommendPlace({ latitude, longitude, radius, category })
      .then((response) => {
        const dinerInfoData =
          response.data[Math.floor(Math.random() * response.data.length)];
        console.log(dinerInfoData);
        setDinerInfo(dinerInfoData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams]);

  return (
    <section>
      {/* <div className="flex gap-2 fixed z-50 bottom-6 left-[50%] translate-x-[-50%]">
        <MapMenu radius={radius} setRadius={setRadius} />
      </div>
      <div className="h-screen w-screen"> */}
      {originalLoc && dinerInfo && (
        <KakaoMap
          originalLoc={originalLoc}
          originalRadius={radius}
          dinerInfoData={dinerInfo}
        />
      )}
      {/* </div> */}
    </section>
  );
};

export default MapSection;
