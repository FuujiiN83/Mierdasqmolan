'use client';

import { useEffect } from 'react';

interface NonBlockingCSSProps {
  href: string;
  media?: string;
}

export function NonBlockingCSS({ href, media = 'all' }: NonBlockingCSSProps) {
  useEffect(() => {
    // Cargar CSS de forma no bloqueante
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = media;
    link.onload = () => {
      // CSS cargado correctamente
      console.log(`CSS cargado: ${href}`);
    };
    link.onerror = () => {
      console.error(`Error cargando CSS: ${href}`);
    };
    
    // Añadir al head
    document.head.appendChild(link);
    
    // Cleanup
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [href, media]);

  return null;
}
