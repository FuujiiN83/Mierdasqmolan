/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite compilar en un directorio aparte (p. ej. NEXT_DIST_DIR=.next-new)
  // y luego hacer un swap instantáneo con .next. Sin esto, `next build`
  // reescribe .next mientras el proceso en marcha sirve de ahí y los estáticos
  // devuelven 500 durante todo el build. Por defecto se comporta como siempre.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    // Solo imágenes locales de /public: sin remotePatterns el optimizador rechaza
    // URLs externas y nadie puede hacerle procesar ficheros arbitrarios.
    // AVIF desactivado: GHSA-2xp9-vwfh-vxw4 (RCE en el optimizador con AVIF)
    // no tiene parche en Next 14.
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días de caché para imágenes
  },
  swcMinify: true,
  typescript: {
    // Estaba en `true`, y eso escondía errores reales: la página de producto
    // pasaba `className` a ProductCard, que no lo aceptaba, y el type-check
    // llevaba rojo desde tiempo sin que nadie se enterara. Ya está en verde,
    // así que a partir de ahora el build falla si vuelve a romperse.
    ignoreBuildErrors: false,
  },
  eslint: {
    // Se mantiene en true a propósito: el lint solo da avisos (no errores), y
    // no queremos que un aviso de estilo tumbe un despliegue.
    ignoreDuringBuilds: true,
  },
  experimental: {
    typedRoutes: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  // Headers de caché para mejorar rendimiento
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Configuración para mejorar el manejo de errores
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1 minuto
    pagesBufferLength: 5,
  },
  // Reducir errores de timeout durante el build
  staticPageGenerationTimeout: 120,
  // Mejorar el manejo de errores en producción
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
};

module.exports = nextConfig;

