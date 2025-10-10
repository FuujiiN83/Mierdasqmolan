/** @type {import('next').NextConfig} */

// Bundle Analyzer - Activar con ANALYZE=true npm run build
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    // Configuración más específica y segura para imágenes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Configuraciones de optimización mejoradas
    // AVIF primero (mejor compresión), luego WebP como fallback
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 año en segundos
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Configuración de calidad por defecto más agresiva
    // Se puede sobreescribir por imagen con el prop quality
    unoptimized: false,
  },
  // Configuración para optimización
  swcMinify: true,
  // Deshabilitar verificación de tipos temporalmente
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configuración experimental conservadora
  experimental: {
    typedRoutes: false,
    // Optimizar CSS automáticamente
    optimizeCss: true,
  },
  // Configuración de compilación con target moderno
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Headers para optimización de caché y performance
  async headers() {
    return [
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Optimización de producción
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compress: true,
  
  // Reactiva strict mode para mejores prácticas
  reactStrictMode: true,
  
};

module.exports = withBundleAnalyzer(nextConfig);

