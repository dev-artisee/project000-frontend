import './diner-info/diner-info-card.css';

import React, { useEffect, useRef, useState } from 'react';

import {
  dinerCardElement,
  DinerInfoDataType,
} from '@/app/map/_components/diner-info/diner-info-markup';
import MapMenu from '@/app/map/_components/map-menu';

declare global {
  interface Window {
    kakao: any;
  }
}

export type CurrentLocType = {
  lat: string;
  lng: string;
};

const KakaoMap = ({
  originalLoc,
  originalRadius,
  dinerInfoData,
}: {
  originalLoc: CurrentLocType;
  originalRadius: string;
  dinerInfoData: DinerInfoDataType;
}) => {
  console.log('rendered');
  const [currentLoc, setCurrentLoc] = useState(originalLoc);
  const [radius, setRadius] = useState(originalRadius);
  const [dinerInfo, setDinerInfo] = useState(dinerInfoData);
  const mapRef = useRef<any>(null);
  const circleRef = useRef<any>(null);

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(
            parseFloat(originalLoc.lat),
            parseFloat(originalLoc.lng)
          ),
          level: 2,
        };
        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        const markerArray = [
          {
            lat: originalLoc.lat,
            lng: originalLoc.lng,
          },
          {
            lat: parseFloat(dinerInfo.latitude),
            lng: parseFloat(dinerInfo.longitude),
          },
        ];

        markerArray.forEach((el) => {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(el.lat, el.lng),
            clickable: true,
          });
        });

        // const circle = new window.kakao.maps.Circle({
        //   center: new window.kakao.maps.LatLng(loc.lat, loc.lng),
        //   radius: parseInt(radius),
        //   strokeWeight: 2,
        //   strokeColor: '#75B8FA',
        //   strokeOpacity: 0.7,
        //   strokeStyle: 'dashed',
        //   fillColor: '#CFE7FF',
        //   fillOpacity: 0.4,
        // });
        // circle.setMap(map);

        const customOverlayPosition = new window.kakao.maps.LatLng(
          parseFloat(dinerInfo.latitude) + 0.00025,
          parseFloat(dinerInfo.longitude)
        );
        const customOverlay = new window.kakao.maps.CustomOverlay({
          map: map,
          clickable: true,
          content: dinerCardElement(dinerInfo),
          position: customOverlayPosition,
          xAnchor: 0.5,
          yAnchor: 1,
        });
        customOverlay.setMap(map);

        window.kakao.maps.event.addListener(map, 'center_changed', () => {
          const center = map.getCenter();
          // console.log(center.getLat(), center.getLng());
          setCurrentLoc({
            lat: center.getLat(),
            lng: center.getLng(),
          });
        });
      });
    };
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
    const bookmarkButton = document.getElementById('diner-bookmark-btn');
    bookmarkButton?.addEventListener('click', () => {
      console.log('button click');
    });
  }, [dinerInfo, originalLoc.lat, originalLoc.lng]);

  useEffect(() => {
    console.log('center changed');
    if (mapRef.current) {
      const map = mapRef.current;
      if (circleRef.current) {
        const circle = circleRef.current;
        circle.setMap(null);
      }
      const newCircle = new window.kakao.maps.Circle({
        center: new window.kakao.maps.LatLng(currentLoc.lat, currentLoc.lng),
        radius: parseInt(radius),
        strokeWeight: 2,
        strokeColor: '#75B8FA',
        strokeOpacity: 0.7,
        strokeStyle: 'dashed',
        fillColor: '#CFE7FF',
        fillOpacity: 0.4,
      });
      newCircle.setMap(map);
      circleRef.current = newCircle;
    }
  }, [currentLoc, radius]);

  return (
    <section>
      <div className="flex gap-2 fixed z-50 bottom-6 left-[50%] translate-x-[-50%]">
        <MapMenu
          currentLoc={currentLoc}
          radius={radius}
          setRadius={setRadius}
          setDinerInfo={setDinerInfo}
        />
      </div>
      <div className="h-screen w-screen">
        <div id="map" className="h-full w-full z-0" />;
      </div>
    </section>
  );
};

export default KakaoMap;
