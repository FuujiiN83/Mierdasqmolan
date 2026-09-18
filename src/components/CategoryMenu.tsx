'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CategoryOption, CategorySlug } from '@/config/site';

interface CategoryMenuProps {
  /**
   * Categorías ya calculadas en el servidor.
   *
   * Antes este componente llamaba a getAvailableCategories() por su cuenta, lo
   * que obligaba a importar `lib/data.ts` —y con él `data/products.json`, de
   * 1,9 MB— dentro del bundle de cliente. Como el menú vive en el layout, ese
   * JSON se lo descargaba TODAS las páginas. Ahora llega como prop.
   */
  categories: CategoryOption[];
  className?: string;
  variant?: 'horizontal' | 'vertical';
  showCounts?: boolean;
}

export function CategoryMenu({
  categories,
  className = '',
  variant = 'horizontal',
  showCounts = false
}: CategoryMenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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

  // Este menú construye los enlaces como `/categoria/<slug>`, así que cualquier
  // entrada que se añada tiene que ser un slug real de categoryConfig. Aquí
  // hubo dos bloques que no lo eran (una categoría "hogar" inexistente y unos
  // submenús que nunca se activaron) y generaban enlaces a rutas que no existen.
  interface MenuItem {
    href: string;
    label: string;
    isActive: boolean;
    description?: string;
  }

  const menuItems: MenuItem[] = [
    { href: '/', label: 'Inicio', isActive: isHomePage },
    { href: '/destacados', label: 'Destacados', isActive: isFeaturedPage },
    // Blog siempre visible
    {
      href: `/categoria/${blogCategoryForMenu.slug}`,
      label: `${blogCategoryForMenu.name}${showCounts ? ` (${blogCategoryForMenu.count})` : ''}`,
      isActive: isActiveCategory(blogCategoryForMenu.slug),
      description: blogCategoryForMenu.description,
    },
    // Resto de categorías (máximo 5 para que el menú no se desborde)
    ...otherCategories.slice(0, 5).map(category => ({
      href: `/categoria/${category.slug}`,
      label: `${category.name}${showCounts ? ` (${category.count})` : ''}`,
      isActive: isActiveCategory(category.slug),
      description: category.description,
    }))
  ];

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
              title={item.description}
            >
              {item.label}
            </Link>
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
              title={item.description}
            >
              {item.label}
            </Link>
          </div>
        ))}
        
        {/* Menú desplegable para más categorías (excluyendo blog) */}
        {otherCategories.length > 5 && (
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
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 z-20">
                  <div className="py-1" role="menu">
                    {otherCategories.slice(5).map((category) => (
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
                    title={item.description}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
}

// Aquí vivía `CategoryChips`, los chips de categorías para la home. Se eliminó
// porque era código muerto: `HomeContent` lo importaba pero nunca lo renderizaba.
