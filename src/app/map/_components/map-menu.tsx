'use client';

import { Settings2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { DINER_LIST } from '@/app/home/_const/const';
import { CurrentLocType } from '@/app/map/_components/kakao-map';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const MapMenu = ({
  radius,
  setRadius,
  currentLoc,
}: {
  radius: string;
  setRadius: React.Dispatch<React.SetStateAction<string>>;
  currentLoc: CurrentLocType;
}) => {
  console.log(currentLoc);
  const dinerList = DINER_LIST;
  const handleRadius = (value: number) => {
    setRadius(`${value}`);
  };
  const router = useRouter();

  const handleRecommend = () => {
    router.push(
      `/map?latitude=${currentLoc.lat}&longitude=${currentLoc.lng}&radius=100&category=`
    );
  };

  return (
    <div className="flex gap-2">
      <Button onClick={() => handleRecommend()} className="px-4">
        다시 추천받기
      </Button>
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
            <div>{radius}</div>
            <Slider
              defaultValue={[parseInt(radius)]}
              value={[parseInt(radius)]}
              onValueChange={(value: number[]) => handleRadius(value[0])}
              min={50}
              max={1000}
              step={10}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MapMenu;
