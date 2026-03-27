/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true // GitHub Pages static export requires unoptimized images
  }
};

export default nextConfig;
