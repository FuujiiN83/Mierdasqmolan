'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categoryConfig, CategorySlug } from '@/config/site';
import { getAvailableCategories } from '@/lib/data';

interface CategoryMenuProps {
  className?: string;
  variant?: 'horizontal' | 'vertical';
  showCounts?: boolean;
}

export function CategoryMenu({ 
  className = '', 
  variant = 'horizontal',
  showCounts = false 
}: CategoryMenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Array<{
    slug: CategorySlug;
    name: string;
    description: string;
    count: number;
  }>>([]);

  useEffect(() => {
    const availableCategories = getAvailableCategories();
    setCategories(availableCategories);
  }, []);

  const isActiveCategory = (slug: string) => {
    return pathname === `/categoria/${slug}`;
  };

  const isHomePage = pathname === '/';
  const isFeaturedPage = pathname === '/destacados';

  // Separar categoría blog del resto
  const blogCategory = categories.find(cat => cat.slug === 'blog');
  const otherCategories = categories.filter(cat => cat.slug !== 'blog');

  const menuItems = [
    { href: '/', label: 'Inicio', isActive: isHomePage },
    { href: '/destacados', label: 'Destacados', isActive: isFeaturedPage },
    // Blog siempre visible
    ...(blogCategory ? [{
      href: `/categoria/${blogCategory.slug}`,
      label: `${blogCategory.name}${showCounts ? ` (${blogCategory.count})` : ''}`,
      isActive: isActiveCategory(blogCategory.slug),
      description: blogCategory.description
    }] : []),
    // Resto de categorías
    ...otherCategories.map(category => ({
      href: `/categoria/${category.slug}`,
      label: `${category.name}${showCounts ? ` (${category.count})` : ''}`,
      isActive: isActiveCategory(category.slug),
      description: category.description
    }))
  ];

  if (variant === 'vertical') {
    return (
      <nav className={`space-y-1 ${className}`} aria-label="Categorías">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              block px-3 py-2 rounded-md text-sm font-medium font-potta-one transition-colors
              ${item.isActive
                ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
            title={'description' in item ? item.description : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <>
      {/* Versión desktop horizontal */}
      <nav className={`hidden lg:flex items-center space-x-1 ${className}`} aria-label="Categorías">
        {menuItems.slice(0, 8).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              px-3 py-2 rounded-md text-sm font-medium font-potta-one transition-colors whitespace-nowrap
              ${item.isActive
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
            title={'description' in item ? item.description : undefined}
          >
            {item.label}
          </Link>
        ))}
        
        {/* Menú desplegable para más categorías (excluyendo blog) */}
        {otherCategories.length > 6 && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-3 py-2 rounded-md text-sm font-medium font-potta-one text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-1"
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              Más
              <svg 
                className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                  <div className="py-1" role="menu">
                    {otherCategories.slice(6).map((category) => (
                      <Link
                        key={`/categoria/${category.slug}`}
                        href={`/categoria/${category.slug}`}
                        onClick={() => setIsOpen(false)}
                        className={`
                          block px-4 py-2 text-sm transition-colors
                          ${isActiveCategory(category.slug)
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }
                        `}
                        role="menuitem"
                        title={category.description}
                      >
                        {category.name}{showCounts ? ` (${category.count})` : ''}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Versión mobile */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium font-potta-one text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-expanded={isOpen}
        >
          <span>Categorías</span>
          <svg 
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
            <nav className="py-1" role="menu">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    block px-4 py-2 text-sm transition-colors
                    ${item.isActive
                      ? 'bg-primary-50 text-primary-700 font-medium font-potta-one'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  role="menuitem"
                  title={'description' in item ? item.description : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
}

// Chips de categorías para la home
export function CategoryChips({ className = '' }: { className?: string }) {
  const [categories, setCategories] = useState<Array<{
    slug: CategorySlug;
    name: string;
    count: number;
  }>>([]);

  useEffect(() => {
    const availableCategories = getAvailableCategories();
    // Mostrar solo las categorías más populares
    const popularCategories = availableCategories
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
    setCategories(popularCategories);
  }, []);

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/categoria/${category.slug}`}
          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium font-potta-one bg-white border border-gray-200 text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-colors"
        >
          {category.name}
          <span className="ml-1.5 text-xs text-gray-500">
            {category.count}
          </span>
        </Link>
      ))}
    </div>
  );
}
