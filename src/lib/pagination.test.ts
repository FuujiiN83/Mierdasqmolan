import { describe, it, expect } from 'vitest';
import { paginate, parsePageParam } from '@/lib/pagination';
import { getProductsByCategory } from '@/lib/data';
import { siteConfig, CategorySlug } from '@/config/site';

describe('parsePageParam', () => {
  it('lee un entero positivo', () => {
    expect(parsePageParam('1')).toBe(1);
    expect(parsePageParam('7')).toBe(7);
    expect(parsePageParam('  3 ')).toBe(3);
  });

  it('devuelve null cuando el parámetro no está', () => {
    expect(parsePageParam(undefined)).toBe(null);
    expect(parsePageParam('')).toBe(null);
  });

  it('rechaza lo que no sea un entero positivo', () => {
    // Regresión: Number('1e3') es 1000 y Number('0x10') es 16, así que sin la
    // comprobación de formato una URL como ?page=1e3 se colaba como página 1000.
    expect(parsePageParam('0')).toBe(null);
    expect(parsePageParam('-2')).toBe(null);
    expect(parsePageParam('2.5')).toBe(null);
    expect(parsePageParam('abc')).toBe(null);
    expect(parsePageParam('1e3')).toBe(null);
    expect(parsePageParam('0x10')).toBe(null);
    expect(parsePageParam('Infinity')).toBe(null);
    expect(parsePageParam('99999999999999999999')).toBe(null);
  });

  it('rechaza el parámetro repetido (?page=1&page=2)', () => {
    expect(parsePageParam(['1', '2'])).toBe(null);
  });
});

describe('paginate', () => {
  const items = Array.from({ length: 25 }, (_, i) => i + 1);

  it('recorta la página pedida', () => {
    const page = paginate(items, 2, 10);
    expect(page.items).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    expect(page.totalItems).toBe(25);
    expect(page.totalPages).toBe(3);
    expect(page.currentPage).toBe(2);
  });

  it('la última página lleva el resto', () => {
    expect(paginate(items, 3, 10).items).toEqual([21, 22, 23, 24, 25]);
  });

  it('acota en vez de desbordarse', () => {
    const page = paginate(items, 99, 10);
    expect(page.currentPage).toBe(3);
    expect(page.items).toEqual([21, 22, 23, 24, 25]);
  });

  it('una lista vacía es una página vacía', () => {
    const page = paginate([], 1, 10);
    expect(page.items).toEqual([]);
    expect(page.totalPages).toBe(1);
    expect(page.currentPage).toBe(1);
  });

  it('no pierde ni duplica elementos al recorrer todas las páginas', () => {
    const page = paginate(items, 1, 7);
    const recorrido: number[] = [];
    for (let p = 1; p <= page.totalPages; p++) {
      recorrido.push(...paginate(items, p, 7).items);
    }
    expect(recorrido).toEqual(items);
  });
});

describe('paginación del catálogo real', () => {
  // El objetivo de A1 es que ninguna ficha quede sin enlace interno: con estas
  // páginas, cada producto de cada categoría tiene una URL que lo enlaza.
  it('cada categoría se reparte en páginas sin perder productos', () => {
    const perPage = siteConfig.pagination.productsPerPage;
    const categorias: CategorySlug[] = [
      'regalos-frikis',
      'regalos-para-pasarlo-bien',
      'regalos-wtf',
      'halloween',
      'mierdas-gamers',
      'regalos-originales-para-parejas',
      'regalos-para-cumpleanos',
      'regalos-originales-para-casa',
      'regalos-para-todo-tipo-de-edades',
    ];

    for (const slug of categorias) {
      const productos = getProductsByCategory(slug);
      if (productos.length === 0) continue;

      const primera = paginate(productos, 1, perPage);
      const recorrido: string[] = [];
      for (let p = 1; p <= primera.totalPages; p++) {
        recorrido.push(...paginate(productos, p, perPage).items.map(prod => prod.id));
      }

      expect(recorrido, `categoría ${slug}`).toEqual(productos.map(prod => prod.id));
    }
  });
});
