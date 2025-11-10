'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { CategoryChips } from '@/components/CategoryMenu';
import { AdSlot, useInlineAds } from '@/components/AdSlot';
import { Pagination, ResultsInfo } from '@/components/Pagination';
import { getFilteredProducts, getFeaturedProducts, clearProductsCache } from '@/lib/data';
import { Product } from '@/types';
import { siteConfig } from '@/config/site';

export default function HomeContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const { pagination } = siteConfig;
  const productsPerPage = pagination.productsPerPage;

  // Manejar searchParams de forma segura
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const query = searchParams.get('search') || '';
      setSearchQuery(query);
    } catch (error) {
      console.error('Error getting search params:', error);
      setSearchQuery('');
    }
  }, []);



  useEffect(() => {
    loadProducts();
  }, [searchQuery, currentPage]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      // Limpiar cache para asegurar datos actualizados
      clearProductsCache();
      
      const filters: any = {
        search: searchQuery,
        sortBy: 'newest',
        limit: productsPerPage,
        offset: (currentPage - 1) * productsPerPage,
      };
      
      // Obtener productos filtrados con manejo de errores
      const allProducts = getFilteredProducts(filters);
      if (!Array.isArray(allProducts)) {
        throw new Error('getFilteredProducts no devolvió un array');
      }

      // Obtener el total para paginación
      const totalFiltered = getFilteredProducts({
        search: searchQuery,
        sortBy: 'newest'
      });
      if (!Array.isArray(totalFiltered)) {
        throw new Error('getFilteredProducts para total no devolvió un array');
      }

      setProducts(allProducts);
      setTotalProducts(totalFiltered.length);

      // Obtener productos destacados solo en la primera página sin búsqueda
      if (currentPage === 1 && !searchQuery) {
        try {
          const featured = getFeaturedProducts();
          if (Array.isArray(featured)) {
            setFeaturedProducts(featured);
          } else {
            setFeaturedProducts([]);
          }
        } catch (featuredError) {
          console.error('Error cargando productos destacados:', featuredError);
          setFeaturedProducts([]);
        }
      } else {
        setFeaturedProducts([]);
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
      setProducts([]);
      setTotalProducts(0);
      setFeaturedProducts([]);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen bg-white dark:bg-gray-900">

      {/* Hero section */}
      {!searchQuery && currentPage === 1 && (
        <section className="mb-8">
          <Link href="/categoria/halloween" className="block">
            <div className="relative rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 h-[30rem] sm:h-[34rem] lg:h-[38rem]" style={{ aspectRatio: '16/9' }}>
              <div className="absolute inset-0">
                <Image
                  src="/black friday.webp"
                  alt="Black Friday - Las mejores ofertas y productos que molan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1216px"
                  quality={75}
                  priority
                  onError={(e) => {
                    // Si la imagen no existe, ocultar el contenedor
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
                  ¡Especial Black Friday!
                </h2>
              </div>
            </div>
          </Link>

          {/* Ad space after hero */}
          <div className="mt-8" style={{ minHeight: '90px' }}>
            <AdSlot position="hero-under" size="leaderboard" className="text-center" />
          </div>
        </section>
      )}

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ minHeight: '400px' }}>
            {featuredProducts.slice(0, 4).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isExpanded={expandedCard === product.id}
                onToggleExpand={() => handleToggleExpand(product.id)}
                priority={index < 2}
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

      {/* SEO Content Section - Solo en primera página sin búsqueda */}
      {!searchQuery && currentPage === 1 && !loading && (
        <section className="mt-16 mb-12 max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Descubre los Regalos Más Originales y Divertidos
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Bienvenido a <strong>Mierdas que Molan</strong>, tu tienda online de <strong>regalos originales y divertidos</strong> para todos los públicos. 
                Nos especializamos en encontrar los productos más únicos, creativos y sorprendentes para que siempre tengas el regalo perfecto 
                para cualquier ocasión.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
                ¿Por Qué Elegir Nuestros Regalos Originales?
              </h3>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                En nuestra tienda encontrarás una <strong>selección cuidadosa de productos únicos</strong> que van desde gadgets tecnológicos 
                innovadores hasta regalos para parejas que harán que cada momento sea especial. Cada artículo ha sido seleccionado pensando 
                en sorprender y hacer sonreír a quien lo recibe.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
                Nuestras Categorías de Regalos
              </h3>

              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                <li><strong>Regalos para parejas:</strong> Juguetes sexuales, juegos íntimos y productos para momentos especiales</li>
                <li><strong>Gadgets originales:</strong> Tecnología innovadora y productos únicos para el día a día</li>
                <li><strong>Regalos divertidos:</strong> Productos que arrancarán una sonrisa garantizada</li>
                <li><strong>Ideas creativas:</strong> Artículos sorprendentes para regalar en cualquier ocasión</li>
                <li><strong>Ofertas y chollos:</strong> Los mejores precios en productos originales</li>
              </ul>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Todos nuestros productos incluyen enlaces de <strong>afiliación a Amazon</strong>, lo que nos permite ofrecerte los mejores 
                precios y la garantía de compra segura que ofrece la plataforma. Encuentra desde <strong>juguetes sexuales discretos</strong> 
                hasta los gadgets más innovadores del mercado.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
                Compra Segura y Envío Rápido
              </h3>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Al comprar a través de nuestros enlaces de afiliados, disfrutas de todas las ventajas de Amazon: envío rápido, 
                devoluciones fáciles y atención al cliente de primera. Además, navegando por nuestra tienda descubrirás constantemente 
                <strong> nuevos productos y ofertas exclusivas</strong> actualizadas regularmente.
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mt-6 border-l-4 border-blue-500">
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                  💡 <strong>Consejo:</strong> Explora nuestras diferentes categorías y descubre regalos originales que nunca imaginaste. 
                  ¡Tenemos algo especial para cada persona y cada ocasión!
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
