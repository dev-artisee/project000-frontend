import './diner-info/diner-info-card.css';

import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import {
  dinerCardElement,
  DinerInfoDataType,
} from '@/app/map/_components/diner-info/diner-info-markup';

declare global {
  interface Window {
    kakao: any;
  }
}

export type LocType = {
  lat: string;
  lng: string;
};

const KakaoMap = ({
  loc,
  setLoc,
  centerLoc,
  setCenterLoc,
  searchRadius,
  dinerInfoData,
}: {
  loc: LocType;
  setLoc: Dispatch<SetStateAction<LocType>>;
  centerLoc: LocType;
  setCenterLoc: Dispatch<SetStateAction<LocType>>;
  searchRadius: string;
  dinerInfoData: DinerInfoDataType;
}) => {
  console.log('rendered');
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
            parseFloat(loc.lat),
            parseFloat(loc.lng)
          ),
          level: 2,
        };
        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        const markerArray = [
          {
            lat: parseFloat(loc.lat),
            lng: parseFloat(loc.lng),
          },
          {
            lat: parseFloat(dinerInfoData.latitude),
            lng: parseFloat(dinerInfoData.longitude),
          },
        ];

        markerArray.forEach((el) => {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(el.lat, el.lng),
            clickable: true,
          });
        });

        const circle = new window.kakao.maps.Circle({
          center: new window.kakao.maps.LatLng(loc.lat, loc.lng),
          radius: parseInt(searchRadius),
          strokeWeight: 2,
          strokeColor: '#75B8FA',
          strokeOpacity: 0.7,
          strokeStyle: 'dashed',
          fillColor: '#CFE7FF',
          fillOpacity: 0.4,
        });
        circle.setMap(map);

        const customOverlayPosition = new window.kakao.maps.LatLng(
          parseFloat(dinerInfoData.latitude) + 0.00025,
          parseFloat(dinerInfoData.longitude)
        );
        const customOverlay = new window.kakao.maps.CustomOverlay({
          map: map,
          clickable: true,
          content: dinerCardElement(dinerInfoData),
          position: customOverlayPosition,
          xAnchor: 0.5,
          yAnchor: 1,
        });
        customOverlay.setMap(map);

        window.kakao.maps.event.addListener(map, 'center_changed', () => {
          const center = map.getCenter();
          // console.log(center.getLat(), center.getLng());
          setCenterLoc({
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dinerInfoData, loc, setCenterLoc]);

  useEffect(() => {
    console.log('center changed');
    if (mapRef.current) {
      const map = mapRef.current;
      if (circleRef.current) {
        const circle = circleRef.current;
        circle.setMap(null);
      }
      const newCircle = new window.kakao.maps.Circle({
        center: new window.kakao.maps.LatLng(centerLoc.lat, centerLoc.lng),
        radius: parseInt(searchRadius),
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
  }, [centerLoc, searchRadius]);

  return <div id="map" className="h-full w-full z-0" />;
};

export default KakaoMap;
