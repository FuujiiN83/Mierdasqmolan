import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * URLs that no page links to. Some crawlers (Meta's, notably) evaluate the
 * client bundle's template literals such as `/producto/${slug}` with `null`
 * and then request the result, producing a steady stream of 404s.
 */
export const CRAWLER_GUESSED_PATHS = ['/producto/null', '/categoria/null', '/null'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        // NO se bloquea /_next/: ahí viven el CSS y el JS que Google necesita
        // para renderizar la página. Google recomienda explícitamente no
        // bloquear esos recursos; si no los puede descargar, evalúa la página
        // sin estilos ni layout (y perjudica la valoración móvil).
        '/private/',
        ...CRAWLER_GUESSED_PATHS,
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
