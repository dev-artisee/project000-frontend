import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full h-20 flex items-center">
      <div className="container flex justify-between text-sm">
        <div className="font-bold">© artisee.</div>
        <div>
          The source code is available on <a>GitHub</a>.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
