'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SearchBar, CompactSearchBar } from './SearchBar';
import { CategoryMenu } from './CategoryMenu';
import { siteConfig } from '@/config/site';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="MQM Web Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold font-potta-one text-gray-900">MQM Web</h1>
                <p className="text-xs text-gray-500 -mt-1">Las mejores ofertas</p>
              </div>
            </Link>
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Mobile */}
            <div className="md:hidden">
              <CompactSearchBar />
            </div>

            {/* Destacados link */}
            <Link
              href="/destacados"
              className="hidden sm:flex items-center space-x-1 text-accent-600 hover:text-accent-700 font-medium text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Destacados</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories navigation */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-2">
            <CategoryMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

// Header simplificado para páginas específicas
export function SimpleHeader({ title, showBack = false }: { title?: string; showBack?: boolean }) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {showBack && (
            <button
              onClick={() => window.history.back()}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Volver"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="MQM Web Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold font-potta-one text-gray-900">
                {title || 'MQM Web'}
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
