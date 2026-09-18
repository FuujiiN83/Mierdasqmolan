import { describe, it, expect } from 'vitest';
import { getAllProducts, getProductsByCategory, getAvailableCategories, mapCategoryToSlug } from '@/lib/data';
import { categoryConfig, CategorySlug, isKnownCategoryValue, categorySlugFromName } from '@/config/site';

/**
 * Estas pruebas son la red que faltaba.
 *
 * La deriva de categorías pasó desapercibida mucho tiempo porque nadie
 * comprobaba nada: en data/products.json convivían nombres canónicos, slugs,
 * tres variantes de mayúsculas y erratas ("Regalos originales para la casa"),
 * y el menú contaba por un lado mientras la página listaba por otro. Ocho de
 * nueve categorías anunciaban más productos de los que servían.
 */

describe('integridad de las categorías en products.json', () => {
  it('todos los valores de categories son conocidos', () => {
    const desconocidas = new Set<string>();

    for (const producto of getAllProducts()) {
      for (const categoria of producto.categories) {
        if (!isKnownCategoryValue(categoria)) {
          desconocidas.add(categoria);
        }
      }
    }

    expect(
      [...desconocidas],
      'Hay categorías en data/products.json que no existen en categoryConfig. ' +
      'Un producto con una categoría desconocida no aparece en ninguna categoría real.'
    ).toEqual([]);
  });

  it('ningún producto se queda sin categoría', () => {
    const sinCategoria = getAllProducts()
      .filter(p => p.categories.length === 0)
      .map(p => p.id);

    expect(sinCategoria).toEqual([]);
  });

  it('no hay categorías duplicadas dentro de un mismo producto', () => {
    const duplicados = getAllProducts()
      .filter(p => new Set(p.categories).size !== p.categories.length)
      .map(p => p.id);

    expect(duplicados).toEqual([]);
  });
});

describe('el menú y la página de categoría dicen lo mismo', () => {
  // Esta es la regresión concreta: antes el menú calculaba el conteo con un
  // mapa manual y la página filtraba por nombre, así que discrepaban.
  it.each(Object.keys(categoryConfig) as CategorySlug[])(
    '%s: el conteo del menú coincide con los productos servidos',
    (slug) => {
      const enMenu = getAvailableCategories().find(c => c.slug === slug)?.count ?? 0;
      const enPagina = getProductsByCategory(slug).length;

      expect(enMenu).toBe(enPagina);
    }
  );

  it('cada categoría devuelve productos (si aparece en el menú)', () => {
    for (const categoria of getAvailableCategories()) {
      expect(getProductsByCategory(categoria.slug).length).toBeGreaterThan(0);
    }
  });
});

describe('categorySlugFromName', () => {
  it('traduce todos los nombres canónicos a su slug', () => {
    for (const [slug, config] of Object.entries(categoryConfig)) {
      expect(categorySlugFromName(config.name)).toBe(slug);
    }
  });

  it('resuelve Halloween y Mierdas gamers, que faltaban en los mapas manuales', () => {
    expect(categorySlugFromName('Halloween')).toBe('halloween');
    expect(categorySlugFromName('Mierdas gamers')).toBe('mierdas-gamers');
  });

  it('devuelve el valor tal cual si no lo reconoce', () => {
    expect(categorySlugFromName('Categoría Inventada')).toBe('Categoría Inventada');
  });

  it('mapCategoryToSlug delega en la misma lógica', () => {
    expect(mapCategoryToSlug('Regalos frikis')).toBe('regalos-frikis');
    expect(mapCategoryToSlug('Halloween')).toBe('halloween');
  });
});

describe('getProductsByCategory', () => {
  it('Halloween también encuentra productos por etiqueta', () => {
    const porCategoria = getAllProducts().filter(p => p.categories.includes('Halloween'));
    const enPagina = getProductsByCategory('halloween');

    // Debe incluir al menos los de la categoría, y sumar los que solo llevan la etiqueta
    expect(enPagina.length).toBeGreaterThanOrEqual(porCategoria.length);
    for (const p of porCategoria) {
      expect(enPagina.some(x => x.id === p.id)).toBe(true);
    }
  });

  it('no mezcla productos de otras categorías', () => {
    const frikis = getProductsByCategory('regalos-frikis');
    expect(frikis.length).toBeGreaterThan(0);
    for (const p of frikis) {
      expect(p.categories).toContain('Regalos frikis');
    }
  });
});
