import { describe, it, expect } from 'vitest';
import { pageHref } from '@/components/Pagination';

describe('pageHref', () => {
  const base = '/categoria/regalos-frikis';

  it('la primera página apunta a la ruta limpia', () => {
    // Si el enlace de "1" fuese `?page=1`, habría dos URL con el mismo
    // contenido y la canónica de la página 1 dejaría de coincidir con la de la
    // categoría.
    expect(pageHref(base, 1)).toBe(base);
  });

  it('las siguientes páginas llevan ?page=N', () => {
    expect(pageHref(base, 2)).toBe(`${base}?page=2`);
    expect(pageHref(base, 17)).toBe(`${base}?page=17`);
  });

  it('conserva los parámetros extra', () => {
    expect(pageHref(base, 3, { search: 'lampara' })).toBe(`${base}?search=lampara&page=3`);
    expect(pageHref(base, 1, { search: 'lampara' })).toBe(`${base}?search=lampara`);
  });

  it('ignora los parámetros vacíos', () => {
    expect(pageHref(base, 2, { search: '', page: undefined })).toBe(`${base}?page=2`);
  });

  it('escapa los valores', () => {
    expect(pageHref(base, 2, { search: 'juego de mesa' })).toBe(
      `${base}?search=juego+de+mesa&page=2`
    );
  });
});
