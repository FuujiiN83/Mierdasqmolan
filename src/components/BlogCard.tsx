'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';

interface BlogCardProps {
  product: Product;
  isExpanded: boolean;
  onToggleExpand: () => void;
  priority?: boolean;
}

export function BlogCard({ product, isExpanded, onToggleExpand, priority = false }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Header con imagen */}
      <div className="relative">
        {!imageError ? (
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={product.image}
              alt={product.alt || product.title}
              fill
              className="object-cover"
              priority={priority}
              onError={handleImageError}
            />
          </div>
        ) : (
          <div className="aspect-video bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Imagen no disponible</p>
            </div>
          </div>
        )}
        
        {/* Badge de Blog */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-white">
            📝 Blog
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Título */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {product.title}
        </h2>

        {/* Descripción corta */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {product.shortDescription}
        </p>

        {/* Tags si existen */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
              >
                #{tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500">
                +{product.tags.length - 3} más
              </span>
            )}
          </div>
        )}

        {/* Botón para expandir/contraer */}
        <button
          onClick={onToggleExpand}
          className="w-full flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors py-2 px-4 rounded-lg border border-primary-200 hover:border-primary-300 hover:bg-primary-50"
        >
          {isExpanded ? (
            <>
              <span>Ver menos</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </>
          ) : (
            <>
              <span>Leer más</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>

        {/* Contenido expandido */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div 
              className="prose prose-sm max-w-none text-gray-700 prose-p:mb-4 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            
            {/* Fecha de publicación */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  Publicado el {new Date(product.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {product.updatedAt && product.updatedAt !== product.createdAt && (
                  <span>
                    Actualizado el {new Date(product.updatedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
