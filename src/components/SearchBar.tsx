'use client';

import { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';
import { debounce } from '@/lib/utils';
import { searchProducts } from '@/lib/data';
import { Product } from '@/types';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  showResults?: boolean;
}

export function SearchBar({ 
  className = '', 
  placeholder = 'Buscar productos...',
  showResults = true 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Debounced search function
  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = searchProducts(searchQuery, 5);
      setResults(searchResults);
    } catch (error) {
      console.error('Error searching products:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0 && showResults);
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(query.length > 0 && showResults)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            aria-label="Buscar productos"
          />
          
          {/* Search icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
      </form>

      {/* Search results dropdown */}
      {isOpen && showResults && (
        <div
          ref={resultsRef}
          className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center">
                <div className="animate-spin h-5 w-5 border-2 border-primary-500 border-t-transparent rounded-full mr-2"></div>
                <span className="text-gray-500">Buscando...</span>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((product) => (
                <a
                  key={product.id}
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  onClick={handleResultClick}
                  className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.alt || `${product.title} - Buscar oferta`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder.svg';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium font-potta-one text-product-orange truncate">
                        {product.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {product.shortDescription}
                      </p>
                      {product.price && (
                        <p className="text-sm font-semibold font-potta-one text-header-purple">
                          {product.price}€
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              ))}
              
              {/* Ver todos los resultados */}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={() => {
                    router.push(`/?search=${encodeURIComponent(query)}`);
                    handleResultClick();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                >
                  Ver todos los resultados para &quot;{query}&quot;
                </button>
              </div>
            </div>
          ) : query.trim() ? (
            <div className="p-4 text-center">
              <p className="text-gray-500">No se encontraron productos</p>
              <p className="text-sm text-gray-400 mt-1">
                Intenta con otras palabras clave
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

// Versión compacta para header móvil
export function CompactSearchBar({ className = '' }: { className?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isExpanded) {
    return (
      <div className={`w-full ${className}`}>
        <SearchBar 
          className="w-full"
          showResults={true}
        />
        <button
          onClick={() => setIsExpanded(false)}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600"
          aria-label="Cerrar búsqueda"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsExpanded(true)}
      className={`p-2 text-gray-600 hover:text-gray-900 transition-colors ${className}`}
      aria-label="Abrir búsqueda"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  );
}
