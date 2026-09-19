import { Metadata } from 'next';
import { Product } from '@/types';
import { siteConfig } from '@/config/site';

/**
 * Marca corta, la que firma el sitio.
 *
 * Antes convivían tres nombres: "MQM Web" en la web visible, "Mierdas que
 * molan" en el structured data y la versión larga ("Mierdas que molan -
 * Regalos originales y mucho más") en `siteConfig.name`. Para Google eso es
 * ruido: el nombre del sitio que muestra en los resultados se apoya en
 * `WebSite.name`, el `og:site_name` y el dominio, y si no coinciden no tiene de
 * dónde sacarlo. Ahora todo el sitio usa este valor.
 */
export const BRAND = siteConfig.name;

/**
 * Serializa un objeto para un `<script type="application/ld+json">`.
 *
 * Escapa los `<` a `<` para que ningún texto del catálogo pueda cerrar la
 * etiqueta antes de tiempo: un título con `</script>` dentro rompería el JSON-LD
 * y el resto del documento se interpretaría como HTML. Hoy ningún título lleva
 * `<`, así que es prevención, no un fallo activo.
 */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** URL absoluta a partir de una ruta interna o de una URL ya absoluta. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

  try {
    return new URL(pathOrUrl, siteConfig.url).toString();
  } catch {
    return siteConfig.url;
  }
}

/**
 * Recorta un texto para que quepa en una meta description.
 *
 * Las descripciones de producto se usaban en crudo: 395 de 420 pasaban de 160
 * caracteres (hasta 619), así que Google cortaba casi todas por donde le
 * parecía. Aquí se corta a 155 en frontera de palabra y se quita el HTML, que
 * en una meta description no pinta nada.
 */
export function truncateForMeta(text: string, maxLength = 155): string {
  const limpio = text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (limpio.length <= maxLength) return limpio;

  const recortado = limpio.slice(0, maxLength);
  const ultimoEspacio = recortado.lastIndexOf(' ');

  // Si no hay ningún espacio (una sola palabra larguísima) se corta tal cual:
  // mejor una palabra partida que una descripción de 600 caracteres.
  return `${(ultimoEspacio > 0 ? recortado.slice(0, ultimoEspacio) : recortado).trim()}…`;
}

/**
 * Metadatos de una ficha de producto.
 *
 * `og:url` se emite explícitamente en todas las páginas que definen
 * `openGraph`: Next sustituye el objeto entero del layout en vez de fusionarlo,
 * así que sin esta línea las fichas se quedaban sin `og:url` (y las que no
 * definían `openGraph` heredaban el de la portada, apuntando a la home).
 */
export function generateProductMetadata(product: Product): Metadata {
  const description = truncateForMeta(product.shortDescription);
  const path = `/producto/${product.slug}`;
  const image = absoluteUrl(product.image);

  return {
    // Sin la marca: el template del layout ya añade "| Mierdas que molan".
    title: product.title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: product.title,
      description,
      url: path,
      siteName: BRAND,
      locale: 'es_ES',
      images: [{ url: image, alt: product.alt || product.title }],
      // `website` y no `product`: los tipos de Next 14 no admiten `product`, y
      // en Open Graph ese tipo solo aporta algo acompañado de `product:price:…`,
      // que aquí no se puede rellenar sin inventarse un precio que la página no
      // muestra. Lo que de verdad se arregla en este bloque es el `url`.
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description,
      images: [image],
    },
  };
}

/**
 * Metadatos de una página de categoría.
 *
 * El título ya no lleva el recuento ("Regalos frikis - 93 productos"): obligaba
 * a reescribir el título de las 9 categorías cada vez que entraba o salía un
 * producto, y el número no aporta nada en un resultado de búsqueda. En las
 * páginas 2+ sí se añade "Página N" para que cada URL tenga un título propio.
 */
export function generateCategoryMetadata(
  categoryName: string,
  categoryDescription: string,
  categorySlug: string,
  productCount: number,
  page = 1
): Metadata {
  const title = page > 1 ? `${categoryName} - Página ${page}` : categoryName;

  // La descripción de la config acaba en punto y a veces en "…friki!": sin
  // quitar esa puntuación salía "¡Viva el orgullo friki!. Descubre 93…".
  const base = categoryDescription.trim().replace(/[.!…]+$/, '');

  // El recuento solo se añade si cabe entero. Antes se pegaba siempre y luego
  // se recortaba el conjunto, así que la descripción acababa en "…lo
  // demuestran. 93…", con el número cortado a media palabra.
  const sufijo = ` ${productCount} productos con enlace a la tienda.`;
  const completa = `${base}.${sufijo}`;
  const description = truncateForMeta(
    completa.length <= 155 ? completa : base,
    155
  );

  const path =
    page > 1 ? `/categoria/${categorySlug}?page=${page}` : `/categoria/${categorySlug}`;

  return {
    title,
    description,
    alternates: {
      // Autorreferencial por página: la 2 se canoniza a la 2, no a la 1 (que
      // era lo que pedía el sitemap antes de existir la paginación).
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: BRAND,
      locale: 'es_ES',
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
 * Structured data de una ficha (JSON-LD).
 *
 * Reglas que sigue, después de los errores corregidos:
 * - No se marca ningún precio: `formatPrice` devuelve cadena vacía y el hueco
 *   del precio está oculto, así que declarar `offers.price` era describir
 *   contenido que el usuario no ve, y eso es motivo de acción manual por datos
 *   estructurados engañosos.
 * - `image` va absoluta, o Google no puede descargarla.
 * - No se declara `brand`: el campo `merchant` es la tienda (Amazon), no el
 *   fabricante, y no tenemos dato de marca. Igual que con el `aggregateRating`
 *   inventado que se retiró, antes se omite que se fabrica.
 * - Sin `datePublished`/`dateModified`: son propiedades de `CreativeWork`, no
 *   de `Product`.
 */
export function generateProductStructuredData(product: Product, affiliateUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription,
    image: [absoluteUrl(product.image)],
    sku: product.id,
    category: product.categories.join(', '),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: affiliateUrl,
      seller: {
        '@type': 'Organization',
        name: product.merchant || BRAND,
      },
    },
  };
}

/**
 * Structured data de un artículo del blog (JSON-LD).
 *
 * Los 7 artículos no emitían ningún JSON-LD propio: el HTML ya llevaba autor,
 * fecha y tiempo de lectura, pero nada de eso se declaraba, así que no eran
 * elegibles para Top Stories ni para el tratamiento de artículo en Discover.
 */
export function generateBlogPostingStructuredData(post: {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
}) {
  const path = `/blog/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.featuredImage)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: BRAND,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(path),
    },
    inLanguage: 'es-ES',
    ...(post.tags && post.tags.length > 0 ? { keywords: post.tags.join(', ') } : {}),
  };
}

/**
 * Structured data de breadcrumbs (JSON-LD).
 *
 * Existía desde el principio y no lo usaba nadie, así que ninguna página tenía
 * breadcrumbs en los resultados de búsqueda.
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

/** Structured data del sitio web (JSON-LD). */
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND,
    alternateName: 'MQM',
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'es-ES',
    publisher: {
      '@type': 'Organization',
      name: BRAND,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.png'),
      },
    },
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

/** Structured data de la organización (JSON-LD). */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND,
    alternateName: 'MQM',
    url: siteConfig.url,
    logo: absoluteUrl('/logo.png'),
    description: siteConfig.description,
    email: 'info@mierdasquemolan.com',
    // Los perfiles sociales ya existían en el schema escrito a mano del layout;
    // al pasar a generarlo había que conservarlos, porque `sameAs` es lo que
    // une la web con sus cuentas como una sola entidad.
    sameAs: Object.values(siteConfig.social),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@mierdasquemolan.com',
      availableLanguage: 'Spanish',
    },
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
 * Structured data de una página de categoría (JSON-LD).
 */
export function generateCategoryStructuredData(
  categoryName: string,
  categoryDescription: string,
  categorySlug: string,
  products: ListableItem[],
  /** Prefijo de las URL de los elementos. El listado del blog cuelga de /blog. */
  itemPathPrefix = '/producto'
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
        url: `${siteConfig.url}${itemPathPrefix}/${product.slug}`,
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
      name: BRAND,
      url: siteConfig.url,
    },
  };
}

/**
 * Structured data de la portada (JSON-LD).
 *
 * La home lista productos y no declaraba ninguno: solo publicaba el WebSite y
 * la Organization del layout.
 */
export function generateHomeStructuredData(products: ListableItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Regalos originales y frikis',
    description: siteConfig.description,
    url: siteConfig.url,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Productos destacados',
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.title,
        url: `${siteConfig.url}/producto/${product.slug}`,
      })),
    },
    isPartOf: {
      '@type': 'WebSite',
      name: BRAND,
      url: siteConfig.url,
    },
  };
}
