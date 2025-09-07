'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AdSlot, useInlineAds } from '@/components/AdSlot';
import { Pagination, ResultsInfo } from '@/components/Pagination';
import { categoryConfig, CategorySlug } from '@/config/site';
import { Product } from '@/types';
import { siteConfig } from '@/config/site';
import blogData from '../../../../data/blog.json';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  alt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  isPublished: boolean;
  readTime: string;
}

interface BlogClientProps {
  categorySlug: CategorySlug;
  initialProducts: Product[];
}

export function BlogClient({ categorySlug, initialProducts }: BlogClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const category = categoryConfig[categorySlug];
  const { pagination } = siteConfig;
  const productsPerPage = pagination.productsPerPage;

  useEffect(() => {
    // Filtrar solo los posts publicados con categoría "blog"
    const publishedPosts = blogData.filter((post: BlogPost) => 
      post.isPublished && post.category === 'blog'
    );
    setPosts(publishedPosts);
    setLoading(false);
  }, []);

  const totalProducts = posts.length;

  // Paginar los resultados
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  const handleToggleExpand = (productId: string) => {
    setExpandedCard(expandedCard === productId ? null : productId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedCard(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const inlineAdPositions = useInlineAds(paginatedPosts.length);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header de la categoría */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 sm:p-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold font-potta-one text-gray-900 mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-gray-600 font-preahvihear mb-6">
              {category.description}
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{totalProducts} artículos disponibles</span>
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
        <div className="mt-8">
          <AdSlot position="hero-under" size="leaderboard" className="text-center" />
        </div>
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

      {/* Blog articles list */}
      {loading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
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
      ) : paginatedPosts.length > 0 ? (
        <div className="flex lg:gap-8">
          {/* Main articles column */}
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
              {paginatedPosts.map((post, index) => (
                <div key={post.id}>
                  <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row">
                      {/* Featured Image */}
                      <div className="w-full sm:w-48 h-48 sm:h-auto relative">
                        <Image
                          src={post.featuredImage}
                          alt={post.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 192px"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(post.publishedAt)}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.readTime}
                          </div>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{post.tags.length - 3} más
                              </span>
                            )}
                          </div>
                        )}

                        <Link 
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Leer más
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                  
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

          {/* Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6 space-y-6">
              <AdSlot position="sidebar-sticky" size="large" />
              
              {/* Blog info card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Sobre nuestro Blog
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Aquí encontrarás artículos, guías y contenido especial que hemos preparado para ti. 
                  Sin enlaces de afiliación, solo contenido de calidad.
                </p>
                <div className="text-sm text-gray-500">
                  <p className="mb-2">
                    <strong>{totalProducts}</strong> artículos disponibles
                  </p>
                  <p>
                    Contenido actualizado regularmente
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No hay artículos en el blog
            </h3>
            <p className="text-gray-600 mb-6">
              Aún no hemos publicado artículos en nuestro blog. 
              Vuelve pronto para ver el contenido especial.
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
  );
}
