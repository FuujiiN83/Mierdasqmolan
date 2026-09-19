import { MetadataRoute } from 'next';
import { getAllProducts, getAvailableCategories, getProductsByCategory } from '@/lib/data';
import { siteConfig } from '@/config/site';
import { LEGAL_LAST_UPDATED } from '@/config/site';
import blogData from '@/data/blog.json';

interface BlogPostSitemap {
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
  isPublished?: boolean;
  category?: string;
}

/**
 * La fecha más reciente de una lista, o `fallback` si no hay ninguna válida.
 *
 * Existe para no volver a poner `new Date()` como `lastModified`: eso marcaba
 * 16 URLs (portada, destacados, el listado del blog, las 4 legales y las 9
 * categorías) con la hora del build en cada despliegue. Un `lastmod` que cambia
 * siempre enseña a Google a ignorar el campo en TODO el sitemap, incluidos los
 * 420 productos, que sí llevan fechas honestas.
 */
function latestDate(dates: Array<string | undefined>, fallback: Date): Date {
  const tiempos = dates
    .map((fecha) => (fecha ? new Date(fecha).getTime() : NaN))
    .filter((tiempo) => Number.isFinite(tiempo));

  return tiempos.length > 0 ? new Date(Math.max(...tiempos)) : fallback;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const products = getAllProducts();

  // Las legales no cambian al desplegar: su fecha es la de su última revisión,
  // declarada a mano en la config y actualizada cuando se toquen los textos.
  const fechaLegal = new Date(LEGAL_LAST_UPDATED);

  const publicaciones = (blogData as BlogPostSitemap[]).filter(
    (post) => post.isPublished !== false && Boolean(post.slug)
  );

  const fechaBlog = latestDate(
    publicaciones.map((post) => post.updatedAt || post.publishedAt),
    fechaLegal
  );

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      // La portada muestra los productos más recientes, así que su fecha es la
      // del último producto publicado, no la del despliegue.
      lastModified: latestDate(products.map((p) => p.createdAt), fechaLegal),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/destacados`,
      lastModified: latestDate(
        products.filter((p) => p.isFeatured).map((p) => p.updatedAt || p.createdAt),
        fechaLegal
      ),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      // Antes ponía `${baseUrl}/blog`, que NO existe: esa ruta devuelve 404.
      // El listado real del blog está en /categoria/blog.
      url: `${baseUrl}/categoria/blog`,
      lastModified: fechaBlog,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/afiliados`,
      lastModified: fechaLegal,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/privacidad`,
      lastModified: fechaLegal,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/cookies`,
      lastModified: fechaLegal,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terminos`,
      lastModified: fechaLegal,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Páginas de productos
  const productPages = products.map((product) => ({
    url: `${baseUrl}/producto/${product.slug}`,
    lastModified: new Date(product.updatedAt || product.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Páginas de categorías. Cada una lleva la fecha del producto más reciente
  // que contiene, no la del despliegue.
  const categoryPages = getAvailableCategories().map((category) => ({
    url: `${baseUrl}/categoria/${category.slug}`,
    lastModified: latestDate(
      getProductsByCategory(category.slug).map((p) => p.updatedAt || p.createdAt),
      fechaLegal
    ),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Artículos del blog.
  // Faltaban por completo: los 7 artículos existen y responden 200, pero no
  // estaban en el sitemap y tampoco tenían ningún enlace interno, así que
  // estaban totalmente huérfanos.
  //
  // No se listan las páginas 2+ de las categorías: son autorreferenciales y
  // rastreables por los enlaces de la paginación, y meterlas aquí inflaría el
  // sitemap sin aportar descubrimiento.
  const blogPages = publicaciones.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: latestDate([post.updatedAt || post.publishedAt], fechaBlog),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...categoryPages, ...blogPages];
}
