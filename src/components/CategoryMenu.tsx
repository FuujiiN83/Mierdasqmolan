'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categoryConfig, CategorySlug, CategoryConfigWithSubcategories } from '@/config/site';
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
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
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
  
  // Si no hay productos de blog, crear la categoría manualmente
  const blogCategoryForMenu = blogCategory || {
    slug: 'blog' as CategorySlug,
    name: 'Blog',
    description: 'Artículos y contenido especial',
    count: 0
  };

  // Separar categoría "hogar" para asegurar que aparezca en las primeras 8
  const hogarCategory = otherCategories.find(cat => cat.slug === 'hogar');
  const otherCategoriesWithoutHogar = otherCategories.filter(cat => cat.slug !== 'hogar');
  
  const menuItems = [
    { href: '/', label: 'Inicio', isActive: isHomePage },
    { href: '/destacados', label: 'Destacados', isActive: isFeaturedPage },
    // Blog siempre visible
    {
      href: `/categoria/${blogCategoryForMenu.slug}`,
      label: `${blogCategoryForMenu.name}${showCounts ? ` (${blogCategoryForMenu.count})` : ''}`,
      isActive: isActiveCategory(blogCategoryForMenu.slug),
      description: blogCategoryForMenu.description
    },
    // Hogar siempre visible si existe
    ...(hogarCategory ? [{
      href: `/categoria/${hogarCategory.slug}`,
      label: `${hogarCategory.name}${showCounts ? ` (${hogarCategory.count})` : ''}`,
      isActive: isActiveCategory(hogarCategory.slug),
      description: hogarCategory.description,
      hasSubcategories: true
    }] : []),
    // Resto de categorías (máximo 5 para que Hogar quepa en las primeras 8)
    ...otherCategoriesWithoutHogar.slice(0, 5).map(category => ({
      href: `/categoria/${category.slug}`,
      label: `${category.name}${showCounts ? ` (${category.count})` : ''}`,
      isActive: isActiveCategory(category.slug),
      description: category.description,
      hasSubcategories: false
    }))
  ];

  const getSubcategories = (categorySlug: string) => {
    const category = categoryConfig[categorySlug as keyof typeof categoryConfig] as CategoryConfigWithSubcategories;
    return category?.subcategories || {};
  };

  if (variant === 'vertical') {
    return (
      <nav className={`space-y-1 ${className}`} aria-label="Categorías">
        {menuItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={`
                block px-3 py-2 rounded-md text-sm font-medium font-potta-one transition-colors
                ${item.isActive
                  ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }
              `}
              title={'description' in item ? item.description : undefined}
            >
              {item.label}
            </Link>
            {/* Subcategorías para versión vertical */}
            {item.hasSubcategories && (
              <div className="ml-4 space-y-1">
                {Object.entries(getSubcategories('hogar')).map(([subSlug, subCategory]) => (
                  <Link
                    key={`/categoria/${subSlug}`}
                    href={`/categoria/${subSlug}`}
                    className="block px-3 py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
                  >
                    {subCategory.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    );
  }

  return (
    <>
      {/* Versión desktop horizontal */}
      <nav className={`hidden lg:flex items-center space-x-1 ${className}`} aria-label="Categorías">
        {menuItems.slice(0, 8).map((item) => (
          <div key={item.href} className="relative">
            <Link
              href={item.href}
              className={`
                px-3 py-2 rounded-md text-sm font-medium font-potta-one transition-colors whitespace-nowrap
                ${item.isActive
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }
              `}
              title={'description' in item ? item.description : undefined}
              onMouseEnter={() => item.hasSubcategories && setHoveredCategory(item.href)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {item.label}
              {item.hasSubcategories && (
                <svg 
                  className="inline w-3 h-3 ml-1"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>
            
            {/* Subcategorías desplegables */}
            {item.hasSubcategories && hoveredCategory === item.href && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                <div className="py-1" role="menu">
                  {Object.entries(getSubcategories('hogar')).map(([subSlug, subCategory]) => (
                    <Link
                      key={`/categoria/${subSlug}`}
                      href={`/categoria/${subSlug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      role="menuitem"
                      title={subCategory.description}
                    >
                      <span className="mr-2">{subCategory.icon}</span>
                      {subCategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Menú desplegable para más categorías (excluyendo blog y hogar) */}
        {otherCategoriesWithoutHogar.length > 5 && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-3 py-2 rounded-md text-sm font-medium font-potta-one text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
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
                    {otherCategoriesWithoutHogar.slice(5).map((category) => (
                      <Link
                        key={`/categoria/${category.slug}`}
                        href={`/categoria/${category.slug}`}
                        onClick={() => setIsOpen(false)}
                        className={`
                          block px-4 py-2 text-sm transition-colors
                          ${isActiveCategory(category.slug)
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
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
          className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium font-potta-one text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      block px-4 py-2 text-sm transition-colors
                      ${item.isActive
                        ? 'bg-primary-50 text-primary-700 font-medium font-potta-one'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }
                    `}
                    role="menuitem"
                    title={'description' in item ? item.description : undefined}
                  >
                    {item.label}
                  </Link>
                  {/* Subcategorías para versión mobile */}
                  {item.hasSubcategories && (
                    <div className="ml-4 space-y-1">
                      {Object.entries(getSubcategories('hogar')).map(([subSlug, subCategory]) => (
                        <Link
                          key={`/categoria/${subSlug}`}
                          href={`/categoria/${subSlug}`}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
                        >
                          <span className="mr-2">{subCategory.icon}</span>
                          {subCategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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
          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium font-potta-one bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 hover:border-primary-200 dark:hover:border-primary-700 transition-colors"
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