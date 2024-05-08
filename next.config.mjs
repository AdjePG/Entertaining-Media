/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'image.tmdb.org', 
      'images.igdb.com',
      'books.google.com'
    ],
  }
};

export default nextConfig;
