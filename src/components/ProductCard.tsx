'use client';

import dynamic from 'next/dynamic';
import { Product } from '@/types';

// Importar el componente dinámico
const DynamicProductCard = dynamic(() => import('./DynamicProductCard').then(mod => ({ default: mod.DynamicProductCard })), {
  ssr: false,
  loading: () => (
    <article className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
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
  )
});

interface ProductCardProps {
  product: Product;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  showExpandButton?: boolean;
  priority?: boolean;
}

export function ProductCard(props: ProductCardProps) {
  return <DynamicProductCard {...props} />;
}