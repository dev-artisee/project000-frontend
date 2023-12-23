'use client';

import { Settings2 } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const RADIUS_LIST = ['0', '50', '100', '500', '1000'];

const MapMenu = ({
  searchRadius,
  setSearchRadius,
  handleSearch,
}: {
  searchRadius: string;
  setSearchRadius: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}) => {
  const radiusList = RADIUS_LIST;
  const handleRadius = (value: number) => {
    setSearchRadius(`${value}`);
  };

  return (
    <div className="flex gap-2">
      <Button onClick={() => handleSearch()} className="px-4">
        다시 추천받기
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings2 className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-50">
          <h3 className="text-sm text-muted-foreground font-medium mb-2 ml-2">
            검색반경
          </h3>
          <div className="flex flex-col gap-4">
            <ToggleGroup
              size="sm"
              variant="outline"
              type="single"
              className="flex-wrap justify-start"
              value={`${searchRadius}`}
              onValueChange={(value: string) => handleRadius(parseInt(value))}
            >
              {radiusList.map((radius, i) => (
                <ToggleGroupItem
                  key={i}
                  value={radius}
                  className="px-4 rounded-full"
                >
                  {radius}m
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            {/* <div>{searchRadius}</div>
            <Slider
              defaultValue={[parseInt(searchRadius)]}
              value={[parseInt(searchRadius)]}
              onValueChange={(value: number[]) => handleRadius(value[0])}
              min={0}
              max={1000}
              step={50}
            /> */}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MapMenu;
