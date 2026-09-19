import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/data';
import { markdownToHtml } from '@/lib/utils';

/**
 * Descripción completa de una ficha, para el "Ver más" de las tarjetas.
 *
 * Las listas (categorías, portada, destacados) no mandan `description` en las
 * props porque es el campo que se lleva casi todo el peso del HTML: 2.200
 * caracteres de mediana por producto. Se pide aquí solo cuando alguien abre la
 * tarjeta.
 *
 * Devuelve el HTML ya convertido y saneado (lo mismo que hace el servidor en la
 * ficha), no el markdown en crudo, para no repetir la conversión en cada
 * navegador ni exponer el texto sin limpiar.
 */
export function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return NextResponse.json(
      { error: 'Producto no encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { slug: product.slug, html: markdownToHtml(product.description) },
    {
      // El catálogo es un JSON estático: la respuesta solo cambia al desplegar.
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      },
    }
  );
}
