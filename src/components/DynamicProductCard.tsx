'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice, formatRelativeDate, markdownToHtml, getDomainFromUrl } from '@/lib/utils';
import { generateAffiliateUrl } from '@/lib/data';
import { categoryConfig } from '@/config/site';

interface ProductCardProps {
  product: Product;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  showExpandButton?: boolean;
  priority?: boolean;
}

export function DynamicProductCard({ 
  product, 
  isExpanded = false, 
  onToggleExpand,
  showExpandButton = true,
  priority = false
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    // No expandir si se hace clic en enlaces
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    
    if (showExpandButton && onToggleExpand) {
      onToggleExpand();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (showExpandButton && onToggleExpand) {
        onToggleExpand();
      }
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const affiliateUrl = generateAffiliateUrl(product);
  const merchantDomain = getDomainFromUrl(product.affiliateUrl);

  // Mostrar placeholder mientras se hidrata
  if (!isClient) {
    return (
      <article className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
            <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
              <div className="text-gray-400 text-center p-4">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Cargando...</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 sm:p-6">
            <div className="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3"></div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={showExpandButton ? 0 : -1}
      role={showExpandButton ? 'button' : undefined}
      aria-expanded={showExpandButton ? isExpanded : undefined}
      aria-label={showExpandButton ? `Ver detalles de ${product.title}` : undefined}
    >
      {/* Header de la tarjeta */}
      <div className="flex flex-col sm:flex-row">
        {/* Imagen */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          {!imageError ? (
            <Image
              src={product.image}
              alt={product.alt || `${product.title} - Oferta en ${product.merchant || 'tienda online'}`}
              fill
              sizes="(max-width: 640px) 100vw, 192px"
              className="object-cover"
              priority={priority}
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-gray-400 dark:text-gray-500 text-center p-4">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Imagen no disponible</p>
              </div>
            </div>
          )}
          
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
          {/* Categorías */}
          <div className="flex flex-wrap gap-1 mb-2">
            {product.categories.slice(0, 2).map((category) => {
              const config = categoryConfig[category];
              return (
                <span
                  key={category}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: config?.color + '20',
                    color: config?.color,
                  }}
                >
                  {config?.icon} {config?.name}
                </span>
              );
            })}
          </div>

          {/* Título */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.title}
          </h3>

          {/* Descripción corta */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Precio y merchant */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                {formatPrice(product.price, product.currency)}
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {formatRelativeDate(product.createdAt)}
            </div>
          </div>

          {/* Merchant */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              {merchantDomain}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors duration-200 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Ver oferta
            </Link>
            
            <Link
              href={`/producto/${product.slug}`}
              className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg text-center transition-colors duration-200 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Ver detalles
            </Link>
          </div>

          {/* Botón de expandir */}
          {showExpandButton && (
            <button
              className="w-full mt-3 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand?.();
              }}
            >
              {isExpanded ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Ver menos
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Ver más
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Contenido expandido */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 animate-slide-down">
          <div className="p-4 sm:p-6">
            {/* Descripción completa */}
            <div
              className="prose prose-sm max-w-none mb-6 text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: markdownToHtml(product.description)
              }}
            />

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Etiquetas:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Botones de acción expandidos */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Ver oferta en {merchantDomain}
              </Link>
              
              <Link
                href={`/producto/${product.slug}`}
                className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Ver página completa
              </Link>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
