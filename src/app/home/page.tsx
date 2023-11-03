import React from 'react';

import DinerCards from '@/app/home/_components/diner-cards';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const HomePage = () => {
  return (
    <div className="container h-full">
      <div className="grid grid-cols-2 gap-6 h-full">
        <div className="flex flex-col gap-16 mt-24">
          <section className="flex flex-col gap-6">
            <h1 className="text-6xl font-bold">픽밀업</h1>
            <p className="text-[1.25rem] font-semibold">
              형님, 저는 별로 공부를 좋아하지 않는 스타일이라...
            </p>
          </section>
          <section className="flex flex-col gap-6">
            <div>
              <label className="text-lg font-bold">검색 위치</label>
              <Input className="mt-2" />
            </div>
            <div>
              <label className="text-lg font-bold">검색 반경</label>

              <RadioGroup defaultValue="option-one" className="mt-2 flex gap-2">
                <div
                  className="
                  inline-flex items-center justify-center
                  whitespace-nowrap px-4 py-2
                  rounded-md text-sm font-medium ring-offset-background
                  transition-colors cursor-pointer
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-ring diabled:pointer-events-none
                  disabled:pointer-events-none disabled:opacity-50

                  border border-input bg-background
                  hover:bg-accent hover:text-accent-foreground
                  bg-transparent hover:bg-accent

                  [&:has([data-state=checked])]:bg-primary
                  [&:has([data-state=checked])]:text-primary-foreground
                  "
                >
                  <RadioGroupItem
                    value="option-one"
                    className="sr-only"
                    checked={true}
                  />
                  <label htmlFor="option-one">50m</label>
                </div>
              </RadioGroup>
            </div>
          </section>
        </div>
        <div>
          <DinerCards />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
