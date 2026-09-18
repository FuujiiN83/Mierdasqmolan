import { describe, it, expect } from 'vitest';
import { normalizeForSearch } from '@/lib/utils';
import { searchProducts, getFilteredProducts } from '@/lib/data';

describe('normalizeForSearch', () => {
  it('pasa a minúsculas', () => {
    expect(normalizeForSearch('LÁMPARA')).toBe('lampara');
  });

  it('quita tildes y diéresis', () => {
    expect(normalizeForSearch('cámara')).toBe('camara');
    // La diéresis se descompone (u + U+0308) y se elimina, así que "pingüino"
    // acaba en "pinguino": buscar "pinguino" también lo encuentra.
    expect(normalizeForSearch('pingüino')).toBe('pinguino');
    expect(normalizeForSearch('café')).toBe('cafe');
  });

  it('convierte la eñe en n', () => {
    expect(normalizeForSearch('piñata')).toBe('pinata');
  });

  it('deja intacto el texto sin acentos', () => {
    expect(normalizeForSearch('calcetines de pizza')).toBe('calcetines de pizza');
  });
});

describe('búsqueda insensible a acentos', () => {
  // Regresión: antes el filtro solo hacía toLowerCase(), así que "lampara"
  // no encontraba "Lámpara" y "camara"/"pinata" devolvían 0 resultados.
  const casos = [
    { sinTilde: 'lampara', conTilde: 'lámpara' },
    { sinTilde: 'camara', conTilde: 'cámara' },
    { sinTilde: 'pinata', conTilde: 'piñata' },
  ];

  it.each(casos)(
    '"$sinTilde" encuentra lo mismo que "$conTilde"',
    ({ sinTilde, conTilde }) => {
      const sin = searchProducts(sinTilde, 100);
      const con = searchProducts(conTilde, 100);

      expect(con.length).toBeGreaterThan(0);
      expect(sin.length).toBe(con.length);
      expect(sin.map(p => p.id)).toEqual(con.map(p => p.id));
    }
  );

  it('"lampara" devuelve al menos un producto', () => {
    expect(searchProducts('lampara', 100).length).toBeGreaterThan(0);
  });

  it('ignora mayúsculas y espacios sobrantes', () => {
    const a = searchProducts('  LAMPARA  ', 100);
    const b = searchProducts('lampara', 100);
    expect(a.map(p => p.id)).toEqual(b.map(p => p.id));
  });

  it('devuelve lista vacía con búsqueda vacía', () => {
    expect(searchProducts('', 100)).toEqual([]);
    expect(searchProducts('   ', 100)).toEqual([]);
  });

  it('devuelve vacío para un término que no existe', () => {
    expect(searchProducts('zzzznoexistezzzz', 100)).toEqual([]);
  });
});

describe('getFilteredProducts', () => {
  it('no muta el array global de productos al filtrar', () => {
    const antes = getFilteredProducts({}).map(p => p.id);
    getFilteredProducts({ sortBy: 'title' });
    getFilteredProducts({ search: 'lampara' });
    const despues = getFilteredProducts({}).map(p => p.id);

    expect(despues).toEqual(antes);
  });

  it('aplica el límite después de ordenar', () => {
    const todos = getFilteredProducts({});
    const pagina = getFilteredProducts({ limit: 5, offset: 0 });

    expect(pagina).toHaveLength(5);
    expect(pagina.map(p => p.id)).toEqual(todos.slice(0, 5).map(p => p.id));
  });
});
