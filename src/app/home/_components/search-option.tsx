import React from 'react';

import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const SearchOptions = () => {
  return (
    <>
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
    </>
  );
};

export default SearchOptions;
