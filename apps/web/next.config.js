/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.cellphones.com.vn',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cellphones.com.vn',
      },
    ],
  },
}

module.exports = nextConfig