import { MetadataRoute } from 'next';
import { getAllProducts, getAvailableCategories } from '@/lib/data';
import { siteConfig } from '@/config/site';
import blogData from '@/data/blog.json';

interface BlogPostSitemap {
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
  isPublished?: boolean;
  category?: string;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date();

  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/destacados`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      // Antes ponía `${baseUrl}/blog`, que NO existe: esa ruta devuelve 404.
      // El listado real del blog está en /categoria/blog.
      url: `${baseUrl}/categoria/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/afiliados`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/privacidad`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/cookies`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terminos`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  // Páginas de productos
  const products = getAllProducts();
  const productPages = products.map((product) => ({
    url: `${baseUrl}/producto/${product.slug}`,
    lastModified: new Date(product.updatedAt || product.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Páginas de categorías
  const categories = getAvailableCategories();
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/categoria/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Artículos del blog.
  // Faltaban por completo: los 7 artículos existen y responden 200, pero no
  // estaban en el sitemap y tampoco tenían ningún enlace interno, así que
  // estaban totalmente huérfanos.
  const blogPages = (blogData as BlogPostSitemap[])
    .filter((post) => post.isPublished !== false && Boolean(post.slug))
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt || currentDate),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  return [...staticPages, ...productPages, ...categoryPages, ...blogPages];
}























