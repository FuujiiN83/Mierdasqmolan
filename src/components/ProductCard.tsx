'use client';

import { useState } from 'react';
import Link from 'next/link';
import { OptimizedImage } from './OptimizedImage';
import { Product } from '@/types';
import { formatRelativeDate, markdownToHtml, getDomainFromUrl } from '@/lib/utils';
import { generateAffiliateUrl } from '@/lib/data';
import { categoryConfig } from '@/config/site';

interface ProductCardProps {
  product: Product;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  showExpandButton?: boolean;
  priority?: boolean;
}

export function ProductCard({ 
  product, 
  isExpanded = false, 
  onToggleExpand,
  showExpandButton = true,
  priority = false
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // No hacer nada si se hace clic en enlaces o botones
    if ((e.target as HTMLElement).closest('a, button')) {
      return;
    }
    
    // Navegar a la página del producto
    window.location.href = `/producto/${product.slug}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Navegar a la página del producto
      window.location.href = `/producto/${product.slug}`;
    }
  };

  const affiliateUrl = generateAffiliateUrl(product);
  const merchantDomain = getDomainFromUrl(product.affiliateUrl);

  return (
    <article 
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden
        transition-all duration-300 hover:shadow-md cursor-pointer
        ${isExpanded ? 'ring-2 ring-primary-500' : ''}
      `}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Ver página de ${product.title}`}
    >
      {/* Header de la tarjeta */}
      <div className="flex flex-col sm:flex-row">
        {/* Imagen */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          <OptimizedImage
            src={product.image}
            alt={product.alt || `${product.title} - Oferta en ${product.merchant || 'tienda online'}`}
            fill
            sizes="(max-width: 640px) 100vw, 192px"
            priority={priority}
            className="w-full h-full"
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
            {/* Título */}
            <div className="flex-1">
              <div className="flex justify-between items-start gap-3 mb-2">
                <h2 className="text-lg sm:text-xl font-bold font-potta-one text-product-orange line-clamp-2 leading-tight">
                  {product.title}
                </h2>
              </div>

              {/* Botón Ver Oferta - SIEMPRE VISIBLE */}
              <div className="mb-3">
                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="inline-block bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="flex items-center gap-2">
                    <span>Ver Oferta en {product.merchant || merchantDomain}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
              </div>

              {/* Descripción corta */}
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base font-preahvihear mb-3 line-clamp-2">
                {product.shortDescription}
              </p>
            </div>

            {/* Categorías y metadatos */}
            <div className="space-y-3">
              {/* Categorías */}
              <div className="flex flex-wrap gap-1">
                {product.categories.slice(0, 3).map((categorySlug) => {
                  const category = categoryConfig[categorySlug as keyof typeof categoryConfig];
                  return (
                    <Link
                      key={categorySlug}
                      href={`/categoria/${categorySlug}`}
                      className="inline-block bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900 text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 text-xs px-2 py-1 rounded-full transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {category?.name || categorySlug}
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
                  <time dateTime={product.createdAt} className="font-preahvihear">
                    {formatRelativeDate(product.createdAt)}
                  </time>
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
}
