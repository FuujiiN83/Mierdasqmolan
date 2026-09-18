import { Suspense } from 'react';
import HomeContent from './HomeContent';
import { getFilteredProducts, getFeaturedProducts } from '@/lib/data';
import { siteConfig } from '@/config/site';

// Loading component para Suspense
function LoadingHome() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-48 h-48 bg-gray-200 animate-pulse"></div>
              <div className="flex-1 p-6">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  // Los datos de la primera página se calculan aquí, en el servidor, para que
  // la portada llegue con productos y enlaces reales en el HTML. Antes se
  // cargaban en un useEffect del cliente y el HTML servido era un esqueleto
  // vacío: sin contenido y sin un solo enlace interno a las fichas.
  const { productsPerPage } = siteConfig.pagination;
  const initialProducts = getFilteredProducts({
    sortBy: 'newest',
    limit: productsPerPage,
    offset: 0,
  });
  const initialTotalProducts = getFilteredProducts({ sortBy: 'newest' }).length;
  const initialFeaturedProducts = getFeaturedProducts();

  return (
    <Suspense fallback={<LoadingHome />}>
      <HomeContent
        initialProducts={initialProducts}
        initialTotalProducts={initialTotalProducts}
        initialFeaturedProducts={initialFeaturedProducts}
      />
    </Suspense>
  );
}