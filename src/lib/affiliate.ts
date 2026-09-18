import { Product } from '@/types';
import { safeUrl } from '@/lib/utils';

/**
 * Genera la URL de afiliado con parámetros UTM.
 *
 * Vive en su propio módulo, separado de `lib/data.ts`, y no es un capricho:
 * `data.ts` importa `data/products.json` (1,9 MB), así que cualquier componente
 * de cliente que importase de ahí se llevaba el catálogo entero al navegador.
 * `ProductCard` solo necesitaba esta función, que es lógica pura y no toca los
 * datos. Al separarla, las tarjetas dejan de arrastrar el JSON.
 */
export function generateAffiliateUrl(
  product: Product,
  source = 'mqm-web',
  medium = 'affiliate'
): string {
  try {
    const url = new URL(safeUrl(product.affiliateUrl, ''));
    url.searchParams.set('utm_source', source);
    url.searchParams.set('utm_medium', medium);
    url.searchParams.set('utm_campaign', product.slug);
    url.searchParams.set('utm_content', product.id);
    return url.toString();
  } catch {
    // URL ausente o con esquema no permitido: no se enlaza a ningún sitio
    return '#';
  }
}
