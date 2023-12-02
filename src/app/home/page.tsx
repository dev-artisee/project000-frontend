import React from 'react';

import Landing from '@/app/home/_components/landing';

const HomePage = () => {
  return (
    // <div className="h-full overflow-hidden mt-14 mb-20">
    //   <div className="container grid grid-cols-2 gap-6 h-full">
    //     <div className="h-full flex flex-col gap-16 py-24">
    //       <section className="flex flex-col gap-6">
    //         <h1 className="text-6xl font-bold">픽밀업</h1>
    //         <p className="text-[1.25rem] font-semibold break-keep">
    //           형님, 저는 별로 공부를 좋아하지 않는 스타일이라...
    //         </p>
    //       </section>
    //       <section className="flex flex-col gap-6">
    //         <SearchOptions />
    //       </section>
    //     </div>
    //     <DinerCards />
    //   </div>
    // </div>
    <div className="h-full overflow-hidden mt-14 mb-20">
      <Landing />
    </div>
  );
};

export default HomePage;
