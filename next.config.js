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
  // Configuración básica para VPS
  output: 'standalone',
  swcMinify: false,
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;

