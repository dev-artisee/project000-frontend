'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import React, { useCallback } from 'react';

let slides = ['전체', '한식', '일식', '중식', '양식'];
slides = [...slides, ...slides];

const DinerCards = ({
  lat,
  lng,
  radius,
}: {
  lat: number;
  lng: number;
  radius: string;
}) => {
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

  return (
    <div className="h-full flex flex-col gap-12 py-24">
      <div>여러 음식 장르들</div>
      <section
        className=" mr-[calc(100%-50vw)] overflow-hidden max-w-[1200px]"
        ref={emblaRef}
      >
        <div className="flex">
          {slides.map((slide, i) => (
            <Link
              key={i}
              href={`/map?lat=${lat}&lng=${lng}&radius=${radius}&category=${slide}`}
            >
              <div className="h-[24rem] flex-[0_0_100%] min-w-0 max-w-[16.5rem] pr-6">
                <div className="h-full p-6 border rounded-lg">
                  <span className="font-bold text-3xl">{slide}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <div>
        <button onClick={scrollPrev}>Prev</button>
        <button onClick={scrollNext}>Next</button>
      </div>
    </div>
  );
};

export default DinerCards;
