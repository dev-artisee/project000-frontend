import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 h-20 flex items-center bg-transparent z-50">
      <div className="container flex justify-between text-sm">
        <div className="font-bold">© artisee.</div>
        <div className="text-muted-foreground">
          The source code is available on{' '}
          <Link
            href="https://github.com/dev-artisee/project000-frontend/tree/develop"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            GitHub
          </Link>
          .
        </div>
      </div>
    </footer>
  );
};

export default Footer;
