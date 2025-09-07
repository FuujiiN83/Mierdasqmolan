'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Iconos SVG inline para evitar dependencias
import { AdSlot } from '@/components/AdSlot';
import blogData from '@/data/blog.json';

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

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Filtrar solo los posts publicados con categoría "blog"
    const publishedPosts = blogData.filter((post: BlogPost) => 
      post.isPublished && post.category === 'blog'
    );
    setPosts(publishedPosts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header del blog */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6 sm:p-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold font-potta-one text-header-purple mb-4">
              Blog MQM Web
            </h1>
            <p className="text-lg text-gray-600 font-preahvihear mb-6">
              Descubre historias, curiosidades y contenido exclusivo sobre los productos más originales y divertidos.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{posts.length} entradas publicadas</span>
              {posts.length > 0 && (
                <>
                  <span className="mx-2">•</span>
                  <span>Actualizado regularmente</span>
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
              Blog
            </span>
          </li>
        </ol>
      </nav>

      {/* Posts list */}
      {posts.length > 0 ? (
        <div className="space-y-8">
          {posts.map((post, index) => (
            <article key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
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
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Próximamente en el blog
            </h3>
            <p className="text-gray-600 mb-6">
              Estamos preparando contenido exclusivo para ti. 
              Vuelve pronto para leer nuestras primeras entradas.
            </p>
            <a
              href="/"
              className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Ver productos
            </a>
          </div>
        </div>
      )}

      {/* Sidebar with sticky ad */}
      <aside className="hidden lg:block w-80 flex-shrink-0 mt-8">
        <div className="sticky top-6 space-y-6">
          <AdSlot position="sidebar-sticky" size="large" />
          
          {/* Blog info card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Sobre nuestro blog
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Descubre las historias detrás de los productos más originales, 
              curiosidades y contenido exclusivo que no encontrarás en ningún otro lugar.
            </p>
            <div className="text-sm text-gray-500">
              <p className="mb-2">
                <strong>{posts.length}</strong> entradas publicadas
              </p>
              <p>
                Actualizado regularmente con contenido fresco
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
