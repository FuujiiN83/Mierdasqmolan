'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
// import { AdSlot, useInlineAds } from '@/components/AdSlot';
import { Pagination, ResultsInfo } from '@/components/Pagination';
import { categoryConfig, CategorySlug } from '@/config/site';
import { Product } from '@/types';
import { siteConfig } from '@/config/site';
import { generateCategoryStructuredData } from '@/lib/seo';

interface CategoryClientProps {
  categorySlug: CategorySlug;
  initialProducts: Product[];
}

export function CategoryClient({ categorySlug, initialProducts }: CategoryClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  const category = categoryConfig[categorySlug];
  const { pagination } = siteConfig;
  const productsPerPage = pagination.productsPerPage;
  const totalProducts = initialProducts.length;

  // Paginar los resultados
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const products = initialProducts.slice(startIndex, endIndex);

  const handleToggleExpand = (productId: string) => {
    setExpandedCard(expandedCard === productId ? null : productId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedCard(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);
  // const inlineAdPositions = useInlineAds(products.length);

  // Generar structured data para SEO
  const structuredData = generateCategoryStructuredData(
    category.name,
    category.description,
    categorySlug,
    totalProducts
  );

  return (
    <>
      {/* Structured Data para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header de la categoría */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6 sm:p-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold font-potta-one text-header-purple mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-gray-600 font-preahvihear mb-6">
              {category.description}
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{totalProducts} productos disponibles</span>
              {totalProducts > 0 && (
                <>
                  <span className="mx-2">•</span>
                  <span>Ordenados por más recientes</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Ad space after header */}
        {/* <div className="mt-8">
          <AdSlot position="hero-under" size="leaderboard" className="text-center" />
        </div> */}
      </div>

      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Inicio
            </Link>
          </li>
          <li>
            <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li>
            <span className="text-gray-500" aria-current="page">
              {category.name}
            </span>
          </li>
        </ol>
      </nav>

      {/* Products list */}
      {products.length > 0 ? (
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
                  {/* {inlineAdPositions.includes(index + 1) && (
                    <div className="mt-6">
                      <AdSlot position="inline" size="medium" className="text-center" />
                    </div>
                  )} */}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                loading={false}
                className="mt-12"
              />
            )}
          </div>

          {/* Sidebar with sticky ad */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6 space-y-6">
              {/* <AdSlot position="sidebar-sticky" size="large" /> */}
              
              {/* Category info card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Sobre {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="text-sm text-gray-500">
                  <p className="mb-2">
                    <strong>{totalProducts}</strong> productos disponibles
                  </p>
                  <p>
                    Actualizados regularmente con las mejores ofertas
                  </p>
                </div>
              </div>

              {/* Other categories */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Otras categorías
                </h3>
                <div className="space-y-2">
                  {Object.entries(categoryConfig)
                    .filter(([slug]) => slug !== categorySlug)
                    .slice(0, 6)
                    .map(([slug, cat]) => (
                      <Link
                        key={slug}
                        href={`/categoria/${slug}`}
                        className="block text-sm text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                </div>
                <Link
                  href="/"
                  className="block text-sm text-primary-600 hover:text-primary-700 mt-3 font-medium"
                >
                  Ver todas las categorías →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        /* Empty state */
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No hay productos en esta categoría
            </h3>
            <p className="text-gray-600 mb-6">
              Aún no hemos añadido productos para {category.name}. 
              Vuelve pronto para ver las novedades.
            </p>
            <div className="space-x-4">
              <Link
                href="/"
                className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Ver todos los productos
              </Link>
              <Link
                href="/destacados"
                className="inline-flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ver destacados
              </Link>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}


