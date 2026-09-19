'use client';

import { useState, useEffect, memo, useCallback } from 'react';
import Link from 'next/link';
import { OptimizedImage } from './OptimizedImage';
import { ProductCardData } from '@/lib/card-data';
import { getDomainFromUrl } from '@/lib/utils';
import { generateAffiliateUrl } from '@/lib/affiliate';
import { categorySlugFromName } from '@/config/site';

interface ProductCardProps {
  product: ProductCardData;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  showExpandButton?: boolean;
  priority?: boolean;
  /** Clases extra para la tarjeta. Antes se pasaba desde la página de producto
   *  pero no estaba declarada, así que se descartaba en silencio. */
  className?: string;
}

// Optimizado con memo para evitar re-renders innecesarios de cards
export const ProductCard = memo(function ProductCard({
  product,
  isExpanded = false,
  onToggleExpand,
  showExpandButton = true,
  priority = false,
  className = ''
}: ProductCardProps) {
  const [description, setDescription] = useState<string | null>(null);
  const [descriptionFailed, setDescriptionFailed] = useState(false);

  /**
   * La descripción completa ya no viaja en las props.
   *
   * `description` es de mediana 2.200 caracteres por ficha, y en una categoría
   * de 93 productos eso eran 578 KB de HTML (172 KB comprimidos) para un texto
   * que solo se ve al pulsar "Ver más". Ahora se pide al servidor la primera
   * vez que se despliega esa tarjeta y se queda en memoria.
   */
  useEffect(() => {
    if (!isExpanded || description !== null || descriptionFailed) return;

    let cancelado = false;

    fetch(`/api/producto/${encodeURIComponent(product.slug)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { html?: string }) => {
        if (!cancelado) setDescription(data.html ?? '');
      })
      .catch(() => {
        if (!cancelado) setDescriptionFailed(true);
      });

    return () => {
      cancelado = true;
    };
  }, [isExpanded, description, descriptionFailed, product.slug]);

  // Usar useCallback para evitar crear nuevas funciones en cada render
  const handleCardClick = useCallback((e: React.MouseEvent) => {
    // No hacer nada si se hace clic en enlaces o botones
    if ((e.target as HTMLElement).closest('a, button')) {
      return;
    }
    
    // Navegar a la página del producto
    window.location.href = `/producto/${product.slug}`;
  }, [product.slug]);

  const affiliateUrl = generateAffiliateUrl(product);
  const merchantDomain = getDomainFromUrl(product.affiliateUrl);

  return (
    <article
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden
        transition-all duration-300 hover:shadow-md cursor-pointer
        ${isExpanded ? 'ring-2 ring-primary-500' : ''}
        ${className}
      `}
      /*
       * Solo `onClick`, sin `role="button"` ni `tabIndex` ni `onKeyDown`.
       *
       * `role="button"` marca el contenido como "children presentational", así
       * que el <h2> con el enlace a la ficha, los chips de categoría y el botón
       * "Ver más" desaparecían del árbol de accesibilidad. Y el `onKeyDown` que
       * había aquí escuchaba el keydown burbujeado de los hijos: con teclado,
       * Enter sobre "Comprar" no abría el afiliado, te mandaba a la ficha, y
       * Enter sobre "Ver más" no desplegaba.
       *
       * El clic en cualquier parte de la tarjeta se mantiene para el ratón. Con
       * teclado se navega por los enlaces reales que hay dentro, que además son
       * los que hacen rastreable la ficha.
       */
      onClick={handleCardClick}
    >
      {/* Header de la tarjeta */}
      <div className="flex flex-col sm:flex-row">
        {/* Imagen - Dimensiones fijas para evitar CLS */}
        <div className="relative w-full sm:w-48 h-48 sm:h-48 flex-shrink-0" style={{ minHeight: '192px', aspectRatio: '1/1' }}>
          <OptimizedImage
            src={product.image}
            alt={product.alt || `${product.title} - Oferta en ${product.merchant || 'tienda online'}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 256px"
            quality={80}
            priority={priority}
            className="w-full h-full object-cover"
          />
          
          {/* Badge de destacado */}
          {product.isFeatured && (
            <div className="absolute top-2 left-2">
              <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                ⭐ Destacado
              </span>
            </div>
          )}
        </div>

        {/* Contenido principal */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="flex flex-col h-full">
            {/* Título y precio */}
            <div className="flex-1">
              <div className="flex justify-between items-start gap-3 mb-2">
                {/* Título como enlace real a la ficha.
                    Antes no existía NINGÚN enlace interno a /producto/<slug>:
                    la tarjeta navegaba con onClick + window.location.href, que
                    los rastreadores no pueden seguir, así que las 420 fichas
                    quedaban huérfanas y solo se descubrían por el sitemap. */}
                <h2 className="text-lg sm:text-xl font-bold font-potta-one text-product-orange line-clamp-2 leading-tight">
                  <Link
                    href={`/producto/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </h2>
              </div>

              {/* Botón Ver Oferta - SIEMPRE VISIBLE */}
              <div className="mb-3">
                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="inline-block bg-primary-600 hover:bg-primary-700 text-white text-base font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="flex items-center gap-2">
                    <span>Comprar</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
              </div>

              {/* Descripción corta */}
              <p className="text-gray-600 dark:text-white text-sm sm:text-base font-preahvihear mb-3 line-clamp-2">
                {product.shortDescription}
              </p>
            </div>

            {/* Categorías y metadatos */}
            <div className="space-y-3">
              {/* Categorías */}
              <div className="flex flex-wrap gap-1">
                {product.categories.slice(0, 3).map((category) => {
                  // El slug sale de la config. Antes había aquí otro mapa manual
                  // que, igual que el de data.ts, no conocía "Halloween" ni
                  // "Mierdas gamers" y generaba enlaces a categorías inexistentes.
                  const categorySlug = categorySlugFromName(category);

                  return (
                    <Link
                      key={category}
                      href={`/categoria/${categorySlug}`}
                      className="inline-block bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900 text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 text-xs px-2 py-1 rounded-full transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {category}
                    </Link>
                  );
                })}
                {product.categories.length > 3 && (
                  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                    +{product.categories.length - 3}
                  </span>
                )}
              </div>

              {/* Metadatos */}
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-3">
                  {/* La fecha de publicación ya no se muestra en la ficha: solo
                      servía para que un catálogo con productos de hace meses
                      pareciera abandonado. Se sigue usando para ordenar y para
                      el sitemap / structured data. */}
                  {product.merchant && (
                    <span className="flex items-center gap-1 font-preahvihear">
                      <span>en</span>
                      <span className="font-medium">{product.merchant}</span>
                    </span>
                  )}
                </div>
                
                {showExpandButton && (
                  <button
                    className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleExpand?.();
                    }}
                    aria-label={isExpanded ? 'Contraer detalles' : 'Ver detalles'}
                  >
                    {isExpanded ? 'Contraer' : 'Ver más'}
                    <svg 
                      className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido expandido */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 animate-slide-down">
          <div className="p-4 sm:p-6">
            {/* Descripción completa, pedida al servidor al desplegar */}
            {descriptionFailed ? (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                No hemos podido cargar la descripción.{' '}
                <Link
                  href={`/producto/${product.slug}`}
                  className="text-primary-600 hover:text-primary-700 underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Ver la ficha completa
                </Link>
              </p>
            ) : description === null ? (
              <div className="space-y-2 mb-6" aria-hidden="true">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
              </div>
            ) : (
              <div
                className="prose prose-sm max-w-none mb-6 text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Etiquetas:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Botón principal de afiliado */}
              <a
                href={affiliateUrl}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-3 px-6 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>Ver Oferta en {product.merchant || merchantDomain}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>


            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              Este es un enlace de afiliación. Podemos recibir una comisión por las compras realizadas.
            </p>
          </div>
        </div>
      )}
    </article>
  );
});
