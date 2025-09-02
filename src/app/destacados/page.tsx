'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { AdSlot, useInlineAds } from '@/components/AdSlot';
import { Pagination, ResultsInfo } from '@/components/Pagination';
import { getFeaturedProducts } from '@/lib/data';
import { Product } from '@/types';
import { siteConfig } from '@/config/site';

export default function FeaturedPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);

  const { pagination } = siteConfig;
  const productsPerPage = pagination.productsPerPage;

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      // Obtener todos los productos destacados
      const allFeaturedProducts = getFeaturedProducts();
      setTotalProducts(allFeaturedProducts.length);

      // Paginar los resultados
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const paginatedProducts = allFeaturedProducts.slice(startIndex, endIndex);
      
      setProducts(paginatedProducts);
    } catch (error) {
      console.error('Error cargando productos destacados:', error);
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleExpand = (productId: string) => {
    setExpandedCard(expandedCard === productId ? null : productId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedCard(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const inlineAdPositions = useInlineAds(products.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-accent-50 to-accent-100 rounded-2xl p-6 sm:p-8">
          <div className="max-w-3xl">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-potta-one text-header-purple">
                Productos Destacados
              </h1>
            </div>
            <p className="text-lg text-gray-600 font-preahvihear mb-6">
              Los mejores productos seleccionados especialmente para ti. 
              Calidad premium, ofertas increíbles y productos que realmente molan.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{totalProducts} productos destacados</span>
              {totalProducts > 0 && (
                <>
                  <span className="mx-2">•</span>
                  <span>Actualizados semanalmente</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Ad space after header */}
        <div className="mt-8">
          <AdSlot position="hero-under" size="leaderboard" className="text-center" />
        </div>
      </div>

      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <a href="/" className="text-gray-500 hover:text-gray-700">
              Inicio
            </a>
          </li>
          <li>
            <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li>
            <span className="text-gray-500" aria-current="page">
              Destacados
            </span>
          </li>
        </ol>
      </nav>

      {/* Loading state */}
      {loading && (
        <div className="space-y-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-48 h-48 skeleton-image"></div>
                <div className="flex-1 p-6">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Products list */}
      {!loading && products.length > 0 && (
        <div className="flex lg:gap-8">
          {/* Main products column */}
          <div className="flex-1">
            {/* Results info */}
            <div className="mb-6">
              <ResultsInfo
                currentPage={currentPage}
                itemsPerPage={productsPerPage}
                totalItems={totalProducts}
              />
            </div>

            <div className="space-y-6">
              {products.map((product, index) => (
                <div key={product.id}>
                  <ProductCard
                    product={product}
                    isExpanded={expandedCard === product.id}
                    onToggleExpand={() => handleToggleExpand(product.id)}
                    priority={index < 2}
                  />
                  
                  {/* Inline ads */}
                  {inlineAdPositions.includes(index + 1) && (
                    <div className="mt-6">
                      <AdSlot position="inline" size="medium" className="text-center" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              loading={loading}
              className="mt-12"
            />
          </div>

          {/* Sidebar with sticky ad */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6 space-y-6">
              <AdSlot position="sidebar-sticky" size="large" />
              
              {/* Featured info card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">
                    ¿Por qué destacados?
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Estos productos han sido seleccionados por nuestro equipo por su calidad, 
                  precio excepcional o porque simplemente molan mucho.
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>✓ Calidad verificada</p>
                  <p>✓ Mejores ofertas</p>
                  <p>✓ Trending products</p>
                  <p>✓ Recomendados por usuarios</p>
                </div>
              </div>

              {/* Categories suggestion */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Explora por categorías
                </h3>
                <div className="space-y-2">
                  {[
                    { slug: 'viral', name: 'Viral' },
                    { slug: 'random', name: 'Random' },
                    { slug: 'viciados', name: 'Viciados' },
                    { slug: 'otakus', name: 'Otakus' },
                    { slug: 'gym-bros', name: 'Gym Bros' },
                    { slug: 'facheritos', name: 'Facheritos' },
                  ].map((category) => (
                    <a
                      key={category.slug}
                      href={`/categoria/${category.slug}`}
                      className="block text-sm text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
                <a
                  href="/"
                  className="block text-sm text-primary-600 hover:text-primary-700 mt-3 font-medium"
                >
                  Ver todas las categorías →
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Empty state */}
      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No hay productos destacados
            </h3>
            <p className="text-gray-600 mb-6">
              Aún no hemos seleccionado productos destacados. 
              Vuelve pronto para descubrir nuestras mejores recomendaciones.
            </p>
            <div className="space-x-4">
              <a
                href="/"
                className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Ver todos los productos
              </a>
              <a
                href="/categoria/viral"
                className="inline-flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ver productos virales
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
