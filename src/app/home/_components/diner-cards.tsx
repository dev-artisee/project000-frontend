'use client';

import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';

const DinerCards = () => {
  const [emblaRef] = useEmblaCarousel();
  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          <div className="flex-[0_0_100%] min-w-0 border">Slide 1</div>
          <div className="flex-[0_0_100%] min-w-0">Slide 2</div>
          <div className="flex-[0_0_100%] min-w-0">Slide 3</div>
        </div>
      </div>
    </div>
  );
};

export default DinerCards;
