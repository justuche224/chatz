/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        port: "",
        pathname: "/gcbqsnz4g16h4x8z/chatz/_public/profile/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
//redirect-boundary.js:57 Uncaught Error: Invalid src prop (https://res.cloudinary.com/dot8n5ht8/image/upload/v1714106859/jcrg0naupgoksfilhftq.jpg)
