/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración mínima para VPS estable
  output: 'standalone',
  swcMinify: false,
  compress: false,
  poweredByHeader: false,
  generateEtags: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Configuración de memoria
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;

