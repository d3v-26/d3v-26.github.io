/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  ...(process.env.NEXT_BASE_PATH && {
    basePath: process.env.NEXT_BASE_PATH,
    assetPrefix: process.env.NEXT_BASE_PATH,
  }),
};

module.exports = nextConfig;
