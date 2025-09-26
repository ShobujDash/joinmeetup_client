/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

    // <DialogContent className="w-full sm:max-w-[90vw] lg:max-w-6xl max-h-[80vh] overflow-y-auto rounded-2xl p-4 md:p-8 shadow-2xl scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"></DialogContent>
