import './diner-info/diner-info-card.css';

import React, { useEffect, useRef, useState } from 'react';

import { CoordinateType } from '@/app/home/_hooks/useGeoLocation';
import {
  dinerCardElement,
  DinerInfoDataType,
} from '@/app/map/_components/diner-info/diner-info-markup';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = ({
  loc,
  radius,
  dinerInfoData,
}: {
  loc: CoordinateType;
  radius: string;
  dinerInfoData: DinerInfoDataType;
}) => {
  const [mapCenter, setMapcenter] = useState(loc);
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
            parseFloat(dinerInfoData.latitude),
            parseFloat(dinerInfoData.longitude)
          ),
          level: 2,
        };
        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        const markerArray = [
          {
            lat: loc.lat,
            lng: loc.lng,
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
          setMapcenter({
            address: '',
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
  }, [dinerInfoData, loc]);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      if (circleRef.current) {
        const circle = circleRef.current;
        circle.setMap(null);
      }
      const newCircle = new window.kakao.maps.Circle({
        center: new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
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
  }, [mapCenter, radius]);

  return <div id="map" className="h-full w-full z-0" />;
};

export default KakaoMap;
