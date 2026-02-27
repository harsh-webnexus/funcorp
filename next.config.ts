import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.funcorp.in',
        pathname: '/cdn/shop/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
      {
        protocol: 'https',
        hostname: 'shopify.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.shopify.com',
        pathname: '/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/**', // This matches ALL local paths including /Logo.avif
        // search is omitted to allow any query strings
      },
    ],
  },
};

export default nextConfig;