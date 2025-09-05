/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },

  async redirects() {
    return [
      {
        source: '/:path*.php',
        destination: '/:path*',
        permanent: true, // 308 SEO-friendly redirect
      },
    ];
  },
};

export default nextConfig;
