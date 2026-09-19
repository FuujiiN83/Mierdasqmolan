import { NextResponse } from 'next/server';
import { getFilteredProducts } from '@/lib/data';
import { toCardData } from '@/lib/card-data';
import { paginate, parsePageParam } from '@/lib/pagination';
import { siteConfig } from '@/config/site';

/** Tope de resultados por petición: evita que un `?limit=99999` sirva el catálogo entero. */
const LIMITE_MAXIMO = 48;

/**
 * Listado paginado de productos, ya recortado para pintar tarjetas.
 *
 * Existe porque la alternativa era lo que había: `import('@/lib/data')` en
 * componentes de cliente. Eso descargaba y parseaba los 1,9 MB de
 * `data/products.json` (un chunk de 1,63 MB de JavaScript) la primera vez que
 * alguien tecleaba en el buscador del header —o sea, en cualquier página— o
 * pasaba de página en la portada. Aquí la respuesta es de unos pocos KB de JSON.
 *
 * Parámetros:
 *  - `page`   página (por defecto 1; fuera de rango se acota)
 *  - `search` término de búsqueda (normalizado por `getFilteredProducts`)
 *  - `limit`  elementos por página (para el desplegable del buscador, 5)
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Un término larguísimo no aporta nada y solo hace trabajar al filtro.
  const search = (searchParams.get('search') ?? '').slice(0, 100);
  const page = parsePageParam(searchParams.get('page') ?? undefined) ?? 1;

  const limitPedido = parsePageParam(searchParams.get('limit') ?? undefined);
  const limit = Math.min(limitPedido ?? siteConfig.pagination.productsPerPage, LIMITE_MAXIMO);

  const productos = getFilteredProducts({ search, sortBy: 'newest' });
  const { items, ...resto } = paginate(productos, page, limit);

  return NextResponse.json(
    { ...resto, items: items.map(toCardData) },
    {
      headers: {
        // Catálogo estático: solo cambia al desplegar. Cada `search` distinto es
        // su propia entrada de caché porque va en la URL.
        'Cache-Control': 'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800',
      },
    }
  );
}
