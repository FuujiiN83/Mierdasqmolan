'use client';

import { useState } from 'react';
import Link from 'next/link';
import { OptimizedImage } from './OptimizedImage';
import { Product } from '@/types';
import { formatPrice, formatRelativeDate, markdownToHtml, getDomainFromUrl } from '@/lib/utils';
import { generateAffiliateUrl } from '@/lib/data';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

export function ProductCard({ product, priority = false, className = '' }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const affiliateUrl = generateAffiliateUrl(product);
  const merchantDomain = getDomainFromUrl(product.affiliateUrl);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200 ${className}`}>
      <Link
        href={`/producto/${product.slug}`}
        className="block"
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
            
            {/* Badge destacado */}
            {product.isFeatured && (
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  ★Destacado
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
                  <h2 className="text-lg sm:text-xl font-bold font-potta-one text-product-orange line-clamp-2 leading-tight">
                    {product.title}
                  </h2>
                  {product.price && (
                    <div className="flex-shrink-0 text-right hidden">
                      <span className="text-xl sm:text-2xl font-bold font-potta-one text-header-purple">
                        {formatPrice(product.price, product.currency)}
                      </span>
                    </div>
                  )}
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
                    Ver Oferta en Amazon
                  </a>
                </div>

                {/* Descripción corta */}
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300 font-preahvihear text-sm leading-relaxed line-clamp-3">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Información adicional */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {product.merchant || merchantDomain}
                  </span>
                  <span>•</span>
                  <span>{formatRelativeDate(product.createdAt)}</span>
                </div>

                {/* Categorías */}
                {product.categories && product.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.categories.slice(0, 3).map((category) => {
                      const categoryName = categoryConfig[category as keyof typeof categoryConfig]?.name || category;
                      return (
                        <span
                          key={category}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {categoryName}
                        </span>
                      );
                    })}
                    {product.categories.length > 3 && (
                      <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                        +{product.categories.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Etiquetas:</h3>
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {product.tags.length > 5 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                          +{product.tags.length - 5} más
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Botón para expandir/contraer descripción completa */}
                <div className="mt-auto">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleExpanded();
                    }}
                    className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                  >
                    {isExpanded ? 'Ver menos' : 'Ver más detalles'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción expandida */}
        {isExpanded && (
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-200 dark:border-gray-700">
            <div className="pt-4">
              <div 
                className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(product.description) }}
              />
            </div>
          </div>
        )}
      </Link>
    </article>
  );
}

// Importar categoryConfig desde el archivo de configuración
import { categoryConfig } from '@/config/site';