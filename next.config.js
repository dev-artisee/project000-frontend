/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://dev-artisee.xyz/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
