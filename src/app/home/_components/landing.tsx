'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import DinerCards from '@/app/home/_components/diner-cards';
import { SEARCH_RADIUS_LIST } from '@/app/home/_const/const';
import { useGeoLocation } from '@/app/home/_hooks/useGeoLocation';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const router = useRouter();
  const location = useGeoLocation();
  const [searchRadius, setSearchRadius] = useState('50m');

  return (
    <div>
      <section>
        <h1>픽밀업</h1>
        <p>형님, 저는 별로 공부를 좋아하지 않는 스타일이라...</p>
      </section>
      <section>
        <div>
          검색 위치 :{' '}
          {location.loaded ? location.coordinates?.adress : 'loading...'}
        </div>
        <div>
          <label>검색 반경</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {SEARCH_RADIUS_LIST.map((radius, i) => (
              <Button
                key={i}
                variant={radius === searchRadius ? 'default' : 'outline'}
                onClick={() => setSearchRadius(radius)}
              >
                {radius}
              </Button>
            ))}
          </div>
        </div>
      </section>
      <section>
        {location.coordinates && (
          <DinerCards
            lng={location.coordinates?.lng}
            lat={location.coordinates?.lat}
            radius={searchRadius}
          />
        )}
      </section>
    </div>
  );
};

export default Landing;
