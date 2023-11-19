'use client';

import React from 'react';

import { useGeoLocation } from '@/app/home/_hooks/useGeoLocation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const SEARCH_RADIUS_LIST = ['50m', '100m', '500m', '1km'];

const SearchOptions = () => {
  const location = useGeoLocation();

  return (
    <>
      <div>
        {location.loaded ? JSON.stringify(location) : 'no'}
        <label className="text-lg font-bold">검색 위치</label>
        <Input className="mt-2" />
      </div>
      <div>
        <label className="text-lg font-bold">검색 반경</label>
        <RadioGroup
          defaultValue="option-one"
          className="mt-2 flex flex-wrap gap-2"
        >
          {SEARCH_RADIUS_LIST.map((radius, i) => (
            <Button key={i} asChild>
              <label htmlFor="option-one">
                <RadioGroupItem
                  value={radius}
                  className="sr-only"
                  checked={true}
                />
                {radius}
              </label>
            </Button>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};

export default SearchOptions;
