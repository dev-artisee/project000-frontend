'use client';

import { Settings2 } from 'lucide-react';
import React from 'react';

import { DINER_LIST } from '@/app/home/_const/const';
import KakaoMap from '@/app/map/_components/kakao-map';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const MapPage = () => {
  const dinerList = DINER_LIST;

  return (
    <div>
      <div className="flex gap-2 fixed z-50 bottom-6 left-[50%] translate-x-[-50%]">
        <Button className="px-4">다시 추천받기</Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings2 className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-50">
            <div className="flex flex-col gap-4">
              <ToggleGroup
                size="sm"
                variant="outline"
                type="multiple"
                className="flex-wrap justify-start"
              >
                {dinerList.map((diner, i) => (
                  <ToggleGroupItem key={i} value={diner}>
                    {diner}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <Slider defaultValue={[2]} max={4} step={1} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="h-screen w-screen">
        <KakaoMap lat={33.450701} lng={126.570667} />
      </div>
    </div>
  );
};

export default MapPage;
