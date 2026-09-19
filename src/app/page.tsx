import { Suspense } from 'react';
import type { Metadata } from 'next';
import HomeContent from './HomeContent';
import { getFilteredProducts, getFeaturedProducts } from '@/lib/data';
import { toCardData } from '@/lib/card-data';
import { generateHomeStructuredData, toJsonLd } from '@/lib/seo';
import { siteConfig } from '@/config/site';

// Retargetizado para no canibalizar con /categoria/regalos-para-pasarlo-bien:
// la portada apuntaba a "regalos originales para pasarlo bien", que es
// exactamente la consulta de esa categoría. La portada se queda con el término
// cabeza ("regalos originales y frikis") y la categoría con "pasarlo bien".
export const metadata: Metadata = {
  title: 'Regalos originales y frikis que molan',
  description:
    'Catálogo de regalos originales, frikis y gadgets absurdos: más de 400 ideas para sorprender en cumpleaños, parejas, fiestas o para ti. Entra y encuentra la tuya.',
  alternates: {
    canonical: '/',
  },
};

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
  }).map(toCardData);
  const initialTotalProducts = getFilteredProducts({ sortBy: 'newest' }).length;
  // Se recorta en el servidor: antes se mandaban los 35 destacados para pintar
  // 4, y cada uno llevaba su descripción completa.
  const initialFeaturedProducts = getFeaturedProducts().slice(0, 4).map(toCardData);

  // La portada listaba productos sin declararlos: solo publicaba el WebSite y
  // la Organization del layout.
  const structuredData = generateHomeStructuredData([
    ...initialFeaturedProducts,
    ...initialProducts.slice(0, 4),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(structuredData) }}
      />
      <Suspense fallback={<LoadingHome />}>
        <HomeContent
          initialProducts={initialProducts}
          initialTotalProducts={initialTotalProducts}
          initialFeaturedProducts={initialFeaturedProducts}
        />
      </Suspense>
    </>
  );
}