/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Configuración para asegurar UTF-8
  experimental: {
    forceSwwTransforms: true,
  },
};

module.exports = nextConfig;

