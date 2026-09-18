import { Metadata } from 'next';
import { Product } from '@/types';
import { siteConfig } from '@/config/site';

/**
 * Genera metadatos SEO para productos
 */
export function generateProductMetadata(product: Product): Metadata {
  const title = `${product.title} | ${siteConfig.name}`;
  const description = product.shortDescription;
  const url = `${siteConfig.url}/producto/${product.slug}`;
  
  return {
    title,
    description,
    keywords: product.tags || [],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      type: 'article',
      publishedTime: product.createdAt,
      modifiedTime: product.updatedAt || product.createdAt,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
    other: {
      'product:brand': product.merchant || siteConfig.name,
      'product:availability': 'in stock',
    },
  };
}

/**
 * Genera metadatos SEO para páginas de categorías
 */
export function generateCategoryMetadata(
  categoryName: string,
  categoryDescription: string,
  categorySlug: string,
  productCount: number
): Metadata {
  const title = `${categoryName} - ${productCount} productos | ${siteConfig.name}`;
  const description = `${categoryDescription}. Descubre ${productCount} productos en la categoría ${categoryName}.`;
  const url = `${siteConfig.url}/categoria/${categorySlug}`;
  
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

/**
 * Genera structured data para productos (JSON-LD)
 */
export function generateProductStructuredData(product: Product, affiliateUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.merchant || siteConfig.name,
    },
    offers: {
      '@type': 'Offer',
      // Un Offer sin precio ni moneda es inválido para rich results de Google.
      availability: 'https://schema.org/InStock',
      url: affiliateUrl,
      ...(typeof product.price === 'number'
        ? { price: product.price, priceCurrency: product.currency || 'EUR' }
        : {}),
      seller: {
        '@type': 'Organization',
        name: product.merchant || siteConfig.name,
      },
    },
    // OJO: aquí había un aggregateRating con ratingValue 4.5 y 127 reseñas
    // inventadas. Google penaliza las valoraciones fabricadas, así que se ha
    // eliminado. Si algún día hay reseñas reales, se añaden desde una fuente
    // verificable (no desde el "mola score" interno).
    identifier: {
      '@type': 'PropertyValue',
      name: 'SKU',
      value: product.id,
    },
    category: product.categories.join(', '),
    datePublished: product.createdAt,
    dateModified: product.updatedAt || product.createdAt,
  };
}

/**
 * Genera structured data para el sitio web (JSON-LD)
 */
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    sameAs: [
      // Añadir redes sociales cuando estén disponibles
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Genera structured data para breadcrumbs (JSON-LD)
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Genera structured data para organización (JSON-LD)
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.png`,
    },
    sameAs: [
      // Añadir redes sociales cuando estén disponibles
    ],
  };
}

/**
 * Elemento que puede listarse en el ItemList de una página de categoría.
 * Es estructural a propósito: lo cumplen tanto `Product` como `BlogPost`.
 */
export interface ListableItem {
  title: string;
  slug: string;
}

/**
 * Genera structured data para páginas de categorías (JSON-LD)
 */
export function generateCategoryStructuredData(
  categoryName: string,
  categoryDescription: string,
  categorySlug: string,
  products: ListableItem[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categoryName,
    description: categoryDescription,
    url: `${siteConfig.url}/categoria/${categorySlug}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `Productos de ${categoryName}`,
      description: categoryDescription,
      // Antes declaraba numberOfItems pero NO emitía itemListElement: un
      // ItemList con conteo y sin elementos es incoherente. Ahora se listan los
      // productos que se están mostrando y el conteo sale de esa misma lista.
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.title,
        url: `${siteConfig.url}/producto/${product.slug}`,
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: siteConfig.url,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: categoryName,
          item: `${siteConfig.url}/categoria/${categorySlug}`,
        },
      ],
    },
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

/**
 * Utilidades para mejorar SEO
 */
export const seoUtils = {
  /**
   * Genera un slug SEO-friendly
   */
  generateSlug: (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remover acentos
      .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
      .trim()
      .replace(/\s+/g, '-') // Espacios a guiones
      .replace(/-+/g, '-') // Múltiples guiones a uno solo
      .replace(/^-|-$/g, ''); // Quitar guiones al inicio/final
  },

  /**
   * Trunca texto para meta descriptions
   */
  truncateDescription: (text: string, maxLength: number = 160): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  },

  /**
   * Extrae palabras clave de texto
   */
  extractKeywords: (text: string, excludeWords: string[] = []): string[] => {
    const commonWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al', 'una', 'del', 'los', 'las'];
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remover puntuación
      .split(/\s+/)
      .filter(word => 
        word.length > 2 && 
        !commonWords.includes(word) && 
        !excludeWords.includes(word)
      );
    
    // Remover duplicados y devolver las primeras 10
    return Array.from(new Set(words)).slice(0, 10);
  },
};





