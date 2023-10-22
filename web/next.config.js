/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "images.unsplash.com",
      "api.dicebear.com",
    ],
  },
};

module.exports = nextConfig;
