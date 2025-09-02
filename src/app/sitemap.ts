import { MetadataRoute } from 'next';
import { getAllProducts, getAvailableCategories } from '@/lib/data';
import { siteConfig } from '@/config/site';

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
      url: `${baseUrl}/legal/afiliados`,
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

  return [...staticPages, ...productPages, ...categoryPages];
}









