import Link from 'next/link';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /**
   * Ruta sin parámetros, p.ej. `/categoria/regalos-frikis`. Cuando se indica,
   * la paginación se pinta con enlaces reales, que es lo que hace falta para
   * que los rastreadores lleguen a las páginas 2+.
   */
  basePath?: string;
  /**
   * Modo controlado para listados que paginan en el cliente y no tienen una URL
   * por página. Solo lo usa la portada: su listado depende del buscador, que
   * filtra en el navegador sobre `/?search=…`, así que ahí no hay páginas 2+
   * que rastrear. Las categorías, que sí interesan, usan enlaces.
   */
  onPageChange?: (page: number) => void;
  loading?: boolean;
  /** Parámetros extra que hay que conservar al cambiar de página (p.ej. `search`). */
  query?: Record<string, string | undefined>;
  className?: string;
}

const BASE = 'px-3 py-2 text-sm font-medium rounded-md transition-all duration-200';
const ACTIVO = 'bg-primary-600 text-white shadow-md';
const INACTIVO =
  'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700';
const DESHABILITADO =
  'bg-gray-100 text-gray-400 border border-gray-200 dark:bg-gray-800 dark:text-gray-600 dark:border-gray-700 cursor-not-allowed';

/**
 * URL de una página concreta.
 *
 * La primera página apunta a la ruta limpia (`/categoria/x`) y no a
 * `?page=1`: así el enlace de "1" no abre una segunda URL con el mismo
 * contenido, y la canónica de la página 1 coincide con la de la categoría.
 */
export function pageHref(
  basePath: string,
  page: number,
  query: Record<string, string | undefined> = {}
): string {
  const params = new URLSearchParams();

  for (const [clave, valor] of Object.entries(query)) {
    if (valor) params.set(clave, valor);
  }
  if (page > 1) params.set('page', String(page));

  const cadena = params.toString();
  return cadena ? `${basePath}?${cadena}` : basePath;
}

const FlechaIzquierda = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const FlechaDerecha = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

/**
 * Paginación con enlaces reales (y modo botón para la portada).
 *
 * Antes eran cinco `<button onClick>` siempre: Googlebot no pulsa botones, así
 * que las páginas 2+ de cada categoría no existían para los rastreadores y las
 * fichas que vivían ahí solo se descubrían por el sitemap, sin un solo enlace
 * entrante. Ahora cada página de categoría es una URL enlazada.
 *
 * Sigue siendo accesible con teclado y lector de pantalla: son `<a>` (o
 * `<button>` en el modo controlado) y la página actual va con
 * `aria-current="page"`.
 */
export function Pagination({
  currentPage,
  totalPages,
  basePath,
  onPageChange,
  loading = false,
  query,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const usaEnlaces = Boolean(basePath);

  const maxVisiblePages = 5;
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(1, currentPage - halfVisible);
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  /** Un paso de página: enlace si hay `basePath`, botón si no. */
  const paso = (
    page: number,
    contenido: React.ReactNode,
    etiqueta: string,
    opciones: { rel?: 'prev' | 'next'; deshabilitado?: boolean } = {}
  ) => {
    const esActual = page === currentPage;
    const clases = `${BASE} ${
      esActual ? ACTIVO : opciones.deshabilitado ? DESHABILITADO : INACTIVO
    }`;

    if (opciones.deshabilitado) {
      return (
        <span key={etiqueta} className={clases} aria-hidden="true">
          {contenido}
        </span>
      );
    }

    if (usaEnlaces) {
      return (
        <Link
          key={etiqueta}
          href={pageHref(basePath!, page, query)}
          className={clases}
          aria-label={etiqueta}
          aria-current={esActual ? 'page' : undefined}
          rel={opciones.rel}
        >
          {contenido}
        </Link>
      );
    }

    return (
      <button
        key={etiqueta}
        type="button"
        onClick={() => page !== currentPage && !loading && onPageChange?.(page)}
        disabled={loading}
        className={clases}
        aria-label={etiqueta}
        aria-current={esActual ? 'page' : undefined}
      >
        {contenido}
      </button>
    );
  };

  return (
    <nav
      className={`flex items-center justify-center space-x-2 ${className}`}
      aria-label="Paginación"
    >
      {paso(currentPage - 1, <FlechaIzquierda />, 'Página anterior', {
        rel: 'prev',
        deshabilitado: currentPage === 1,
      })}

      {/* Primera página + elipsis */}
      {startPage > 1 && (
        <>
          {paso(1, '1', 'Página 1')}
          {/* Las elipsis son decorativas: sin aria-hidden, un lector de pantalla
              las lee como "punto punto punto". */}
          {startPage > 2 && (
            <span className="px-2 py-2 text-gray-500" aria-hidden="true">
              ...
            </span>
          )}
        </>
      )}

      {/* Páginas visibles */}
      {pages.map((page) => paso(page, page, `Página ${page}`))}

      {/* Elipsis + última página */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 py-2 text-gray-500" aria-hidden="true">
              ...
            </span>
          )}
          {paso(totalPages, totalPages, `Página ${totalPages}`)}
        </>
      )}

      {paso(currentPage + 1, <FlechaDerecha />, 'Página siguiente', {
        rel: 'next',
        deshabilitado: currentPage === totalPages,
      })}
    </nav>
  );
}

export function ResultsInfo({
  currentPage,
  itemsPerPage,
  totalItems,
  className = '',
  singular = 'producto',
  plural = 'productos',
}: {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  className?: string;
  singular?: string;
  plural?: string;
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`text-sm text-gray-600 dark:text-gray-300 font-preahvihear ${className}`}>
      Mostrando {startItem}-{endItem} de {totalItems} {totalItems === 1 ? singular : plural}
    </div>
  );
}
