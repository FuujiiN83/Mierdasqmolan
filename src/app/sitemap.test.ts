import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import blogData from '@/data/blog.json';
import { getProductsByCategory } from '@/lib/data';

interface BlogPost { slug: string; isPublished?: boolean }

describe('sitemap', () => {
  const entradas = sitemap();
  const urls = entradas.map((e) => e.url);

  it('no repite URLs', () => {
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('todas las URLs son absolutas y https', () => {
    for (const url of urls) {
      expect(url.startsWith('https://')).toBe(true);
    }
  });

  it('incluye la portada con prioridad máxima', () => {
    const portada = entradas.find((e) => e.url === 'https://www.mierdasquemolan.com');
    expect(portada?.priority).toBe(1);
  });

  it('NO incluye /blog, que no existe como ruta', () => {
    // Regresión: el sitemap anunciaba https://www.mierdasquemolan.com/blog,
    // que devuelve 404. El listado real está en /categoria/blog.
    expect(urls).not.toContain('https://www.mierdasquemolan.com/blog');
    expect(urls).toContain('https://www.mierdasquemolan.com/categoria/blog');
  });

  it('incluye todos los artículos del blog publicados', () => {
    // Regresión: los artículos existían pero no estaban en el sitemap, así que
    // quedaban huérfanos (sin enlaces internos tampoco).
    const publicados = (blogData as BlogPost[]).filter((p) => p.isPublished !== false);

    expect(publicados.length).toBeGreaterThan(0);
    for (const post of publicados) {
      expect(urls).toContain(`https://www.mierdasquemolan.com/blog/${post.slug}`);
    }
  });

  it('incluye productos y categorías', () => {
    expect(urls.some((u) => u.includes('/producto/'))).toBe(true);
    expect(urls.some((u) => u.includes('/categoria/'))).toBe(true);
  });

  it('no mete URLs con huecos sin rellenar', () => {
    for (const url of urls) {
      expect(url).not.toMatch(/undefined|null|\$\{/);
    }
  });

  it('no marca ninguna URL con la hora del build', () => {
    // Regresión: 16 URLs (portada, destacados, el listado del blog, las 4
    // legales y las 9 categorías) llevaban `new Date()` como lastModified, así
    // que cambiaban en cada despliegue. Un lastmod que siempre cambia enseña a
    // Google a ignorar el campo en todo el sitemap.
    const ahora = Date.now();

    for (const entrada of entradas) {
      const fecha = new Date(entrada.lastModified as Date).getTime();
      expect(fecha, `${entrada.url} no tiene fecha real`).not.toBeNaN();
      expect(ahora - fecha, `${entrada.url} parece recién generada`).toBeGreaterThan(60_000);
    }
  });

  it('cada categoría lleva la fecha de SU producto más reciente', () => {
    // Comparar contra el máximo de todo el catálogo sería una aserción floja:
    // pasaría igual si la categoría usara la fecha global o la de otro producto.
    const slug = 'regalos-frikis';
    const entrada = entradas.find(
      (e) => e.url === `https://www.mierdasquemolan.com/categoria/${slug}`
    );
    expect(entrada?.lastModified).toBeInstanceOf(Date);

    const suyos = getProductsByCategory(slug).map((p) =>
      new Date(p.updatedAt || p.createdAt).getTime()
    );
    expect(suyos.length).toBeGreaterThan(0);
    expect(new Date(entrada!.lastModified as Date).getTime()).toBe(Math.max(...suyos));
  });
});
