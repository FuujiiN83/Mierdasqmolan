'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface DynamicImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function DynamicImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes,
}: DynamicImageProps) {
  const [isClient, setIsClient] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  // Mostrar placeholder mientras se hidrata
  if (!isClient) {
    return (
      <div className={`w-full h-full bg-gray-100 animate-pulse flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-center p-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Cargando imagen...</p>
        </div>
      </div>
    );
  }

  if (imageError) {
    return (
      <div className={`w-full h-full bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-gray-400 dark:text-gray-500 text-center p-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Imagen no disponible</p>
        </div>
      </div>
    );
  }

  const imageProps = fill
    ? { fill: true, sizes: sizes || '100vw' }
    : { width, height };

  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      className={`object-cover ${className}`}
      onError={handleImageError}
      {...imageProps}
    />
  );
}
