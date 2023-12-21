'use client';

import React, { useState } from 'react';

import DinerCards from '@/app/home/_components/diner-cards';
import { useGeoLocation } from '@/app/home/_hooks/useGeoLocation';

const Landing = () => {
  const location = useGeoLocation();
  const [searchRadius, setSearchRadius] = useState('50');

  return (
    <div>
      <section>
        <h1>픽밀업</h1>
        <p>형님, 저는 별로 공부를 좋아하지 않는 스타일이라...</p>
      </section>
      <section>
        <div>
          검색 위치 :{' '}
          {location.loaded ? location.coordinates?.address : 'loading...'}
        </div>
        {/* <div>
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
        </div> */}
      </section>
      <section>
        {location.coordinates && (
          <DinerCards loc={location.coordinates} radius={searchRadius} />
        )}
      </section>
    </div>
  );
};

export default Landing;
