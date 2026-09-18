'use client';

import Image from 'next/image';
import { useState } from 'react';
import { encodeLocalImageSrc } from '@/lib/image-src';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes,
  fill = false,
  quality = 80,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);

  // Fallback simple para errores - con dimensiones fijas para evitar CLS
  if (imageError) {
    const fallbackStyle = fill 
      ? { width: '100%', height: '100%' }
      : { width: width || 400, height: height || 300 };
    
    return (
      <div 
        className={`bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${className}`}
        style={fallbackStyle}
      >
        <div className="text-gray-400 dark:text-gray-500 text-center p-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Imagen no disponible</p>
        </div>
      </div>
    );
  }

  // Props comunes, tipadas (antes esto era un `any`, lo que impedía al linter
  // ver que sí se pasa `alt` y daba un falso positivo de accesibilidad).
  // `priority` ya implica carga eager, así que no hace falta `loading`.
  const commonProps = {
    src: encodeLocalImageSrc(src),
    alt,
    priority,
    quality,
    className: className || 'object-cover',
    sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    onError: () => setImageError(true),
    ...(priority ? { fetchPriority: 'high' as const } : {}),
  };

  if (fill) {
    return <Image {...commonProps} alt={alt} fill />;
  }

  return (
    <Image
      {...commonProps}
      alt={alt}
      width={width || 400}
      height={height || 300}
    />
  );
}

