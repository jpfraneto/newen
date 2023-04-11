/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  plugins: [require('daisyui')],
  images: {
    domains: ['pbs.twimg.com'],
  },
};

module.exports = nextConfig;
