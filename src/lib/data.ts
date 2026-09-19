import { Product, validateProducts, ProductFilters } from '@/types';
import { categoryConfig, CategorySlug, CategoryOption, categorySlugFromName, siteConfig } from '@/config/site';
import { normalizeForSearch, safeUrl } from '@/lib/utils';
import { paginate, PageOf } from '@/lib/pagination';
import { ProductCardData, toCardData } from '@/lib/card-data';
import productsData from '../../data/products.json';

// Cache para productos validados
let validatedProducts: Product[] | null = null;

// Función para limpiar el cache
export function clearProductsCache() {
  validatedProducts = null;
}

// Limpiar caché automáticamente al cargar el módulo
clearProductsCache();

/**
 * Obtiene todos los productos validados
 */
export function getAllProducts(): Product[] {
  if (validatedProducts === null) {
    try {
      validatedProducts = validateProducts(productsData);
    } catch (error) {
      console.error('Error validando productos:', error);
      return [];
    }
  }
  return validatedProducts;
}

/**
 * Obtiene productos filtrados y ordenados
 */
export function getFilteredProducts(filters: ProductFilters = {}): Product[] {
  const allProducts = getAllProducts();

  let filtered = [...allProducts];

  // Excluir productos de blog por defecto (solo se muestran en página específica de blog)
  if (!filters.includeBlog) {
    filtered = filtered.filter(product => !product.categories.includes('blog'));
  }

  // Filtrar por categorías
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(product => {
      // Para Halloween, buscar tanto en categorías como en tags
      if (filters.categories!.includes('Halloween')) {
        return product.categories.includes('Halloween') || 
               (product.tags && product.tags.some(tag => tag.toLowerCase() === 'halloween'));
      }
      // Para otras categorías, buscar solo en categorías
      return filters.categories!.some(category =>
        product.categories.includes(category)
      );
    });
  }

  // Filtrar por búsqueda.
  // Se normalizan ambos lados (término y campos) para que dé igual escribir
  // "lampara" que "Lámpara", o "pinata" que "piñata".
  if (filters.search) {
    // El trim importa: sin él, " lampara " (con espacios al pegar o al teclear)
    // buscaba la cadena con espacios y no encontraba nada. Y si tras el trim
    // queda vacío, no se filtra: un término vacío hace `includes('')`, que es
    // true para todo y devolvería el catálogo entero.
    const searchTerm = normalizeForSearch(filters.search).trim();

    if (searchTerm) {
      filtered = filtered.filter(product =>
        normalizeForSearch(product.title).includes(searchTerm) ||
        normalizeForSearch(product.shortDescription).includes(searchTerm) ||
        normalizeForSearch(product.description).includes(searchTerm) ||
        product.tags?.some(tag => normalizeForSearch(tag).includes(searchTerm))
      );
    }
  }

  // Filtrar por destacados
  if (filters.featured !== undefined) {
    filtered = filtered.filter(product => product.isFeatured === filters.featured);
  }

  // Ordenar
  const sortBy = filters.sortBy || 'newest';
  switch (sortBy) {
    case 'newest':
      // Ordenar por ID (de mayor a menor) en lugar de por fecha
      filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      break;
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  // Paginación
  if (filters.limit !== undefined) {
    const offset = filters.offset || 0;
    filtered = filtered.slice(offset, offset + filters.limit);
  }

  return filtered;
}

/**
 * Obtiene un producto por slug
 */
export function getProductBySlug(slug: string): Product | null {
  const products = getAllProducts();
  return products.find(product => product.slug === slug) || null;
}

/**
 * Obtiene productos por categoría
 */
export function getProductsByCategory(categorySlug: CategorySlug): Product[] {
  // El blog vive en data/blog.json y sus productos se etiquetan en minúscula
  if (categorySlug === 'blog') {
    return getFilteredProducts({ categories: ['blog'], includeBlog: true });
  }

  const config = categoryConfig[categorySlug];
  if (!config) return [];

  // El nombre canónico sale de categoryConfig, no de un mapa paralelo.
  // Halloween se resuelve solo: getFilteredProducts ya sabe que esa categoría
  // también se busca por etiqueta.
  return getFilteredProducts({
    categories: [config.name],
    includeBlog: false,
  });
}

/**
 * Una página de categoría, ya recortada para enviarla al cliente.
 *
 * La paginación se hace AQUÍ, en el servidor, y no en el componente de cliente:
 * antes se mandaban los 93 productos de una categoría y el navegador recortaba
 * a 12, así que el HTML pesaba 578 KB y las páginas 2+ no existían como URL
 * (la paginación eran botones, y los botones no se rastrean). Ahora cada página
 * es una URL con sus enlaces reales.
 */
export function getCategoryPage(
  categorySlug: CategorySlug,
  page: number
): PageOf<ProductCardData> {
  const products = getProductsByCategory(categorySlug);
  const { items, ...resto } = paginate(products, page, siteConfig.pagination.productsPerPage);

  return { ...resto, items: items.map(toCardData) };
}

/**
 * Obtiene productos destacados
 */
export function getFeaturedProducts(): Product[] {
  return getFilteredProducts({ featured: true });
}

/**
 * Mapea el nombre de una categoría del JSON a su slug de configuración.
 * Delega en la config para no volver a tener un mapa manual desincronizado.
 */
export function mapCategoryToSlug(category: string): string {
  return categorySlugFromName(category);
}

/**
 * Obtiene categorías disponibles con conteo de productos.
 *
 * El conteo se calcula con la MISMA función que sirve la página de la
 * categoría. Antes se contaba por un lado (mapa manual) y se listaba por otro,
 * así que el menú anunciaba números que la página luego no cumplía: llegó a
 * haber 8 categorías descuadradas a la vez (hasta 36 productos de diferencia).
 */
export function getAvailableCategories(): CategoryOption[] {
  return (Object.entries(categoryConfig) as [CategorySlug, { name: string; description: string }][])
    .map(([slug, config]) => ({
      slug,
      name: config.name,
      description: config.description,
      count: getProductsByCategory(slug).length,
    }))
    .filter(category => category.count > 0);
}

/**
 * Busca productos por término
 */
export function searchProducts(query: string, limit = 10): Product[] {
  if (!query.trim()) return [];
  
  return getFilteredProducts({
    search: query,
    limit,
    sortBy: 'newest'
  });
}

/**
 * Obtiene productos relacionados basados en categorías y tags
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const allProducts = getAllProducts();
  
  // Excluir el producto actual
  const otherProducts = allProducts.filter(p => p.id !== product.id);
  
  // Calcular puntuación de relación
  const scored = otherProducts.map(p => {
    let score = 0;
    
    // Puntos por categorías compartidas
    const sharedCategories = p.categories.filter(cat => 
      product.categories.includes(cat)
    ).length;
    score += sharedCategories * 3;
    
    // Puntos por tags compartidos
    if (product.tags && p.tags) {
      const sharedTags = p.tags.filter(tag => 
        product.tags!.includes(tag)
      ).length;
      score += sharedTags * 2;
    }
    
    // Puntos por mismo merchant
    if (product.merchant && p.merchant === product.merchant) {
      score += 1;
    }
    
    return { product: p, score };
  });
  
  // Ordenar por puntuación y devolver los mejores
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.product);
}


