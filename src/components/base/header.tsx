import React from 'react';

const Header = () => {
  return (
    <header className="w-full h-14 fixed top-0 z-50 h-14 bg-tranparent">
      <div className="container h-full flex justify-between items-center">
        <div className="font-bold">픽밀업</div>
        <div className="text-sm">로그인</div>
      </div>
    </header>
  );
};

export default Header;
