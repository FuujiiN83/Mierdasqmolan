import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import blogData from '@/data/blog.json';

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
});
