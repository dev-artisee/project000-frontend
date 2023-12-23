'use client';

import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';

import { getRecommendPlace } from '@/api/map/api';
import KakaoMap, { LocType } from '@/app/map/_components/kakao-map';
import MapMenu from '@/app/map/_components/map-menu';
import { userLocAtom } from '@/lib/atoms/base';

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
  const userLoc = useAtomValue(userLocAtom);
  const [loc, setLoc] = useState<LocType>(userLoc);
  const [centerLoc, setCenterLoc] = useState<LocType>(userLoc);
  const [radius, setRadius] = useState<string>('50');
  const [dinerInfo, setDinerInfo] = useState(testData);

  useEffect(() => {
    getRecommendPlace({ latitude: userLoc.lat, longitude: userLoc.lng })
      .then((response) => {
        console.log(response);
        const dinerInfoData =
          response.data[Math.floor(Math.random() * response.data.length)];
        setDinerInfo(dinerInfoData);
        setCenterLoc({
          lat: dinerInfoData.latitude,
          lng: dinerInfoData.longitude,
        });
      })
      .catch((error) => console.log(error));
  }, [userLoc]);

  const handleSearch = () => {
    getRecommendPlace({ latitude: centerLoc.lat, longitude: centerLoc.lng })
      .then((response) => {
        console.log(response);
        setLoc(centerLoc);
        const dinerInfoData =
          response.data[Math.floor(Math.random() * response.data.length)];
        setDinerInfo(dinerInfoData);
        // setCenterLoc({
        //   lat: dinerInfoData.latitude,
        //   lng: dinerInfoData.longitude,
        // });
      })
      .catch((error) => console.log(error));
  };

  return (
    <section>
      <div className="flex gap-2 fixed z-50 bottom-6 left-[50%] translate-x-[-50%]">
        <MapMenu
          searchRadius={radius}
          setSearchRadius={setRadius}
          handleSearch={handleSearch}
        />
      </div>
      <div className="h-screen w-screen">
        {dinerInfo && (
          <KakaoMap
            loc={loc}
            setLoc={setLoc}
            centerLoc={centerLoc}
            setCenterLoc={setCenterLoc}
            searchRadius={radius}
            dinerInfoData={dinerInfo}
          />
        )}
      </div>
    </section>
  );
};

export default MapSection;
