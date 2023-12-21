'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import { CoordinateType } from '@/app/home/_hooks/useGeoLocation';

let slides = ['전체', '한식', '일식', '중식', '양식'];
slides = [...slides, ...slides];

const DinerCards = ({
  loc,
  radius,
}: {
  loc: CoordinateType;
  radius: string;
}) => {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev(true);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext(true);
  }, [emblaApi]);

  const handleSearch = (slide: string) => {
    localStorage.setItem('loc', JSON.stringify(loc));
    router.push(`/map?radius=${radius}&category=${slide}`);
  };

  return (
    <div className="h-full flex flex-col gap-12 py-24">
      {/* <div>여러 음식 장르들</div> */}
      <section className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => handleSearch(slide)}
              className="h-[24rem] flex-[0_0_100%] min-w-0 max-w-[16.5rem] pr-6"
            >
              <div className="h-full p-6 border rounded-lg">
                <span className="font-bold text-3xl">{slide}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
      {/* <div>
        <button onClick={scrollPrev}>Prev</button>
        <button onClick={scrollNext}>Next</button>
      </div> */}
    </div>
  );
};

export default DinerCards;
