'use client';

import { useState, useEffect } from 'react';
import { AdPosition } from '@/types';
import { siteConfig } from '@/config/site';

interface AdSlotProps extends AdPosition {
  className?: string;
}

export function AdSlot({ position, size, className = '' }: AdSlotProps) {
  const [isVisible, setIsVisible] = useState(false);

  // No mostrar anuncios si están desactivados globalmente
  if (!siteConfig.ads.enabled) {
    return null;
  }

  // No mostrar anuncios si la posición específica está desactivada
  const positionKey = position === 'hero-under' ? 'hero' : 
                     position === 'sidebar-sticky' ? 'sidebar' : 
                     position === 'inline' ? 'inline' : 'inline';
  
  if (!siteConfig.ads.positions[positionKey as keyof typeof siteConfig.ads.positions]) {
    return null;
  }

  useEffect(() => {
    // Simular carga de anuncios
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-full max-w-xs h-32';
      case 'medium':
        return 'w-full max-w-md h-40';
      case 'large':
        return 'w-full max-w-lg h-64';
      case 'leaderboard':
        return 'w-full max-w-4xl h-24';
      default:
        return 'w-full h-32';
    }
  };

  const getPositionText = () => {
    switch (position) {
      case 'hero-under':
        return 'Espacio publicitario - Hero';
      case 'inline':
        return 'Espacio publicitario - Contenido';
      case 'sidebar-sticky':
        return 'Espacio publicitario - Lateral';
      case 'footer':
        return 'Espacio publicitario - Footer';
      default:
        return 'Espacio publicitario';
    }
  };

  if (!isVisible) {
    return (
      <div className={`${getSizeClasses()} ${className}`}>
        <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-gray-400 text-sm">Cargando anuncio...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${getSizeClasses()} ${className}`}>
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500">
        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <div className="text-sm font-medium">{getPositionText()}</div>
        <div className="text-xs mt-1">{size} - {position}</div>
      </div>
    </div>
  );
}

// Hook para determinar posiciones de anuncios inline
export function useInlineAds(totalProducts: number): number[] {
  const [positions, setPositions] = useState<number[]>([]);

  useEffect(() => {
    // No mostrar anuncios inline si están desactivados
    if (!siteConfig.ads.enabled || !siteConfig.ads.positions.inline) {
      setPositions([]);
      return;
    }

    const frequency = siteConfig.ads.inlineFrequency; // Usar la frecuencia de la configuración
    const newPositions: number[] = [];
    
    for (let i = frequency; i < totalProducts; i += frequency) {
      newPositions.push(i);
    }
    
    setPositions(newPositions);
  }, [totalProducts]);

  return positions;
}
