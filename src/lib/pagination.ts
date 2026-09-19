/**
 * Paginación compartida entre el servidor y los tests.
 *
 * Vive en su propio módulo (y no en `lib/data.ts`) por el mismo motivo que
 * `lib/affiliate.ts`: `data.ts` importa `data/products.json` (1,9 MB), así que
 * cualquier componente de cliente que tirase de aquí se llevaría el catálogo
 * entero al navegador.
 */

export interface PageOf<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Lee el parámetro `page` de la URL.
 *
 * Devuelve `null` cuando el parámetro no es un entero positivo ("?page=abc",
 * "?page=-3", "?page=2.5", array por venir repetido). Quien llama decide si eso
 * es un 404 o la página 1; esta función no inventa datos.
 */
export function parsePageParam(value: string | string[] | undefined): number | null {
  if (typeof value !== 'string') return null;

  const limpio = value.trim();
  // Number() acepta "1e3", "0x10" y " 12 " (espacios). Con la regex solo pasan
  // dígitos, que es justo lo que emite un enlace de paginación.
  if (!/^\d+$/.test(limpio)) return null;

  const page = Number(limpio);
  return Number.isSafeInteger(page) && page >= 1 ? page : null;
}

/**
 * Recorta la lista a la página pedida.
 *
 * La página se *acota* en lugar de desbordarse: si se pide la 9 y solo hay 4,
 * devuelve la 4 con `currentPage: 4`. Así el HTML de una URL fuera de rango
 * nunca describe una página que no existe. Ojo: para SEO el servidor no se
 * apoya en esta acotación, porque una URL `?page=99` que devuelve el contenido
 * de la última página sería un duplicado con canónica propia; ahí se llama a
 * `notFound()` antes de llegar aquí.
 */
export function paginate<T>(items: readonly T[], page: number, perPage: number): PageOf<T> {
  const porPagina = Math.max(1, Math.trunc(perPage) || 1);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / porPagina));

  const pedida = Number.isFinite(page) ? Math.trunc(page) : 1;
  const currentPage = Math.min(Math.max(1, pedida), totalPages);

  const start = (currentPage - 1) * porPagina;

  return {
    items: items.slice(start, start + porPagina),
    totalItems,
    totalPages,
    currentPage,
  };
}
