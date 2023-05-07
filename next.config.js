/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pbs.twimg.com', 'lh3.googleusercontent.com'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
