import { describe, it, expect } from 'vitest';
import {
  absoluteUrl,
  truncateForMeta,
  generateProductMetadata,
  generateProductStructuredData,
  generateBlogPostingStructuredData,
  generateBreadcrumbStructuredData,
} from '@/lib/seo';
import { getAllProducts } from '@/lib/data';
import { siteConfig } from '@/config/site';

describe('absoluteUrl', () => {
  it('convierte rutas internas en absolutas', () => {
    expect(absoluteUrl('/logo.png')).toBe(`${siteConfig.url}/logo.png`);
  });

  it('deja igual las URLs que ya son absolutas', () => {
    expect(absoluteUrl('https://m.media-amazon.com/images/I/x.jpg')).toBe(
      'https://m.media-amazon.com/images/I/x.jpg'
    );
  });

  it('codifica los espacios de los nombres de fichero', () => {
    // Las imágenes locales se llaman "halloween 8 cosas.webp": sin codificar,
    // la URL no es válida y Google no puede descargarla.
    expect(absoluteUrl('/images/halloween 8 cosas.webp')).toBe(
      `${siteConfig.url}/images/halloween%208%20cosas.webp`
    );
  });
});

describe('truncateForMeta', () => {
  it('no toca lo que ya cabe', () => {
    expect(truncateForMeta('Una descripción corta')).toBe('Una descripción corta');
  });

  it('corta en frontera de palabra y no a mitad', () => {
    const largo = 'palabra '.repeat(40).trim();
    const salida = truncateForMeta(largo, 50);

    expect(salida.length).toBeLessThanOrEqual(51);
    expect(salida.endsWith('…')).toBe(true);
    expect(salida).not.toContain('palab…');
  });

  it('quita el HTML', () => {
    expect(truncateForMeta('<p>Hola <strong>mundo</strong></p>')).toBe('Hola mundo');
  });

  it('recorta las descripciones reales del catálogo a 155', () => {
    // 395 de 420 se pasaban de 160 caracteres (hasta 619) y Google las cortaba.
    const productos = getAllProducts();
    expect(productos.length).toBeGreaterThan(0);

    for (const producto of productos) {
      expect(truncateForMeta(producto.shortDescription).length).toBeLessThanOrEqual(156);
    }
  });
});

describe('metadatos de producto', () => {
  const producto = getAllProducts()[0];

  it('recorta la descripción y emite og:url propio', () => {
    const meta = generateProductMetadata(producto);

    expect((meta.description as string).length).toBeLessThanOrEqual(156);
    // Sin og:url explícito, Next descarta el del layout y la ficha se queda sin
    // él (o hereda el de la portada en las páginas que no definen openGraph).
    expect(meta.openGraph?.url).toBe(`/producto/${producto.slug}`);
    expect(meta.alternates?.canonical).toBe(`/producto/${producto.slug}`);
  });

  it('no repite la marca en el título (la añade el template del layout)', () => {
    expect(generateProductMetadata(producto).title).toBe(producto.title);
  });

  it('usa una imagen absoluta en Open Graph', () => {
    const meta = generateProductMetadata(producto);
    const imagenes = meta.openGraph?.images;
    const primera = Array.isArray(imagenes) ? imagenes[0] : imagenes;

    const url =
      typeof primera === 'string'
        ? primera
        : primera instanceof URL
          ? primera.toString()
          : primera?.url;

    expect(url).toMatch(/^https:\/\//);
  });
});

describe('structured data de producto', () => {
  const producto = getAllProducts()[0];
  const data = generateProductStructuredData(producto, 'https://amzn.to/x?utm_source=mqm-web');

  it('no declara ningún precio', () => {
    // Regresión: el JSON-LD declaraba offers.price mientras el hueco del precio
    // de la página está oculto y formatPrice devuelve cadena vacía. Marcar
    // contenido que no se ve es motivo de acción manual.
    const json = JSON.stringify(data);
    expect(json).not.toContain('"price"');
    expect(json).not.toContain('priceCurrency');
    expect(json).not.toContain('aggregateRating');
  });

  it('marca el precio como disponible y con la URL de afiliado', () => {
    expect(data.offers.availability).toBe('https://schema.org/InStock');
    expect(data.offers.url).toContain('amzn.to');
  });

  it('usa una imagen absoluta', () => {
    expect(data.image[0]).toMatch(/^https:\/\//);
  });

  it('no se inventa la marca', () => {
    // `merchant` es la tienda (Amazon), no el fabricante: declararlo como brand
    // era una afirmación falsa en 420 fichas.
    expect(data).not.toHaveProperty('brand');
    expect(data.offers.seller.name).toBe(producto.merchant);
  });

  it('identifica el producto con su id', () => {
    expect(data.sku).toBe(producto.id);
  });

  it('es serializable a JSON válido', () => {
    expect(() => JSON.parse(JSON.stringify(data))).not.toThrow();
  });
});

describe('structured data del blog', () => {
  const post = {
    slug: 'que-es-halloween',
    title: '¿Qué es Halloween?',
    excerpt: 'Un repaso al origen de la fiesta.',
    featuredImage: '/images/Halloween 1.webp',
    author: 'MQM Web',
    publishedAt: '2025-09-07T15:00:00Z',
    updatedAt: '2025-09-08T15:00:00Z',
    tags: ['halloween'],
  };

  const data = generateBlogPostingStructuredData(post);

  it('declara el artículo con sus fechas y su autoría', () => {
    expect(data['@type']).toBe('BlogPosting');
    expect(data.datePublished).toBe(post.publishedAt);
    expect(data.dateModified).toBe(post.updatedAt);
    expect(data.publisher.name).toBe(siteConfig.name);
  });

  it('apunta a su propia URL', () => {
    expect(data.mainEntityOfPage['@id']).toBe(
      `${siteConfig.url}/blog/${post.slug}`
    );
  });

  it('usa una imagen absoluta', () => {
    expect(data.image[0]).toMatch(/^https:\/\//);
  });
});

describe('breadcrumbs', () => {
  it('numera los elementos desde 1 y los hace absolutos', () => {
    const data = generateBreadcrumbStructuredData([
      { name: 'Inicio', url: '/' },
      { name: 'Regalos frikis', url: '/categoria/regalos-frikis' },
    ]);

    expect(data.itemListElement[0].position).toBe(1);
    expect(data.itemListElement[1].position).toBe(2);
    expect(data.itemListElement[0].item).toBe(`${siteConfig.url}/`);
  });
});
