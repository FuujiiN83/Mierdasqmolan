'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { CategoryChips } from '@/components/CategoryMenu';
import { AdSlot, useInlineAds } from '@/components/AdSlot';
import { Pagination, ResultsInfo } from '@/components/Pagination';
import { getFilteredProducts, getFeaturedProducts } from '@/lib/data';
import { Product } from '@/types';
import { siteConfig } from '@/config/site';

export default function HomeContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isHalloweenMode, setIsHalloweenMode] = useState(false);

  const searchQuery = searchParams.get('search') || '';
  const { pagination } = siteConfig;
  const productsPerPage = pagination.productsPerPage;



  useEffect(() => {
    loadProducts();
  }, [searchQuery, currentPage]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      // Obtener productos filtrados
      const allProducts = getFilteredProducts({
        search: searchQuery,
        sortBy: 'newest',
        limit: productsPerPage,
        offset: (currentPage - 1) * productsPerPage,
      });

      // Obtener el total para paginación
      const totalFiltered = getFilteredProducts({
        search: searchQuery,
        sortBy: 'newest',
      });

      setProducts(allProducts);
      setTotalProducts(totalFiltered.length);

      // Obtener productos destacados solo en la primera página sin búsqueda
      if (currentPage === 1 && !searchQuery) {
        const featured = getFeaturedProducts();
        setFeaturedProducts(featured);
      } else {
        setFeaturedProducts([]);
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
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
    setExpandedCard(null); // Cerrar tarjetas expandidas al cambiar página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleHalloweenMode = () => {
    console.log('Botón Halloween clickeado, estado actual:', isHalloweenMode);
    setIsHalloweenMode(!isHalloweenMode);
    console.log('Nuevo estado:', !isHalloweenMode);
    if (!isHalloweenMode) {
      console.log('Intentando cargar imagen: /images/fondo%20hw.webp');
    }
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const inlineAdPositions = useInlineAds(products.length);

  // Título dinámico
  const getPageTitle = () => {
    if (searchQuery) {
      return `Resultados para "${searchQuery}"`;
    }
    return '¡Las mejores ofertas y productos que molan!';
  };

  const getPageSubtitle = () => {
    if (searchQuery) {
      return `${totalProducts} productos encontrados`;
    }
    return 'Todo lo que necesitas, cuidadosamente seleccionado para ti';
  };

  return (
    <div 
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen ${
        isHalloweenMode 
          ? 'relative z-10' 
          : 'bg-white dark:bg-gray-900'
      }`}
      style={isHalloweenMode ? { position: 'relative', zIndex: 10 } : {}}
    >
      {/* Halloween Background */}
      {isHalloweenMode && (
        <>
          <div 
            className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed -z-10"
            style={{ backgroundImage: 'url("/images/fondo%20hw.webp")' }}
          />
          <div className="fixed inset-0 bg-black bg-opacity-65 -z-10" />
        </>
      )}

      {/* Hero section */}
      {!searchQuery && currentPage === 1 && (
        <section className="mb-8">
          <Link href="/categoria/halloween" className="block">
            <div className="relative rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 h-[30rem] sm:h-[34rem] lg:h-[38rem]">
              <div className="absolute inset-0">
                <Image
                  src="/portada halloween.webp"
                  alt="Portada Halloween - Productos terroríficos"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    // Si la imagen no existe, ocultar el contenedor
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          </Link>

          {/* Ad space after hero */}
          <div className="mt-8">
            <AdSlot position="hero-under" size="leaderboard" className="text-center" />
          </div>
        </section>
      )}

      {/* Halloween Mode Button - Siempre visible */}
      <div className="flex justify-center mb-6 relative z-50">
        <button
          onClick={toggleHalloweenMode}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:scale-105 relative z-50 ${
            isHalloweenMode
              ? 'bg-orange-600 text-white hover:bg-orange-700'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
          title={isHalloweenMode ? 'Desactivar modo Halloween' : 'Activar modo Halloween'}
        >
          <span className="text-xl">🎃</span>
          <span>I love Halloween</span>
        </button>
      </div>

      {/* Main heading */}
      {!searchQuery && currentPage === 1 && (
        <section className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-potta-one text-header-purple dark:text-purple-400 mb-4">
            Productos originales y divertidos para regalar
          </h1>
        </section>
      )}


      {/* Featured products */}
      {featuredProducts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-potta-one text-header-purple dark:text-purple-400">⭐ Top mierdas que molan</h2>
            <a
              href="/destacados"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm flex items-center gap-1"
            >
              Ver todos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isExpanded={expandedCard === product.id}
                onToggleExpand={() => handleToggleExpand(product.id)}
                priority={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main products section */}
      <section id="produtos">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-potta-one text-header-purple dark:text-purple-400">{getPageTitle()}</h2>
            <p className="text-gray-600 dark:text-gray-300 font-preahvihear mt-1">{getPageSubtitle()}</p>
          </div>
          
          {/* Results info */}
          {totalProducts > 0 && (
            <ResultsInfo
              currentPage={currentPage}
              itemsPerPage={productsPerPage}
              totalItems={totalProducts}
              className="hidden sm:block"
            />
          )}
        </div>

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

        {/* Products list - LAYOUT DE DOS COLUMNAS FORZADO - VPS FIX */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-layout="two-columns" style={{display: 'grid !important', gridTemplateColumns: 'repeat(2, 1fr) !important', gap: '1.5rem !important'}}>
            {products.map((product, index) => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  isExpanded={expandedCard === product.id}
                  onToggleExpand={() => handleToggleExpand(product.id)}
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
        )}

        {/* Pagination */}
        {!loading && products.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            loading={loading}
            className="mt-12"
          />
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {searchQuery ? 'No se encontraron productos' : 'No hay productos disponibles'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `No encontramos productos que coincidan con "${searchQuery}". Intenta con otros términos.`
                  : 'Vuelve pronto, estamos añadiendo nuevos productos.'
                }
              </p>
              {searchQuery && (
                <a
                  href="/"
                  className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Ver todos los productos
                </a>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
