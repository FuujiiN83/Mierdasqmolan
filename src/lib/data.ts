import { Product, validateProducts, ProductFilters } from '@/types';
import { categoryConfig, CategorySlug } from '@/config/site';
import productsData from '../../data/products.json';

// Cache para productos validados
let validatedProducts: Product[] | null = null;

// Función para limpiar el cache
export function clearProductsCache() {
  validatedProducts = null;
  console.log('🧹 Cache de productos limpiado');
}

// Limpiar caché automáticamente al cargar el módulo
clearProductsCache();

/**
 * Obtiene todos los productos validados
 */
export function getAllProducts(): Product[] {
  if (validatedProducts === null) {
    try {
      console.log(`📊 Cargando productos desde archivo: ${productsData.length}`);
      validatedProducts = validateProducts(productsData);
      console.log(`✅ Productos validados: ${validatedProducts.length}`);
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
  console.log(`🔍 Filtrando productos: ${allProducts.length} productos iniciales`);
  
  let filtered = [...allProducts];

  // Excluir productos de blog por defecto (solo se muestran en página específica de blog)
  if (!filters.includeBlog) {
    const beforeBlog = filtered.length;
    filtered = filtered.filter(product => !product.categories.includes('blog'));
    console.log(`📝 Después de excluir blog: ${filtered.length} (eliminados: ${beforeBlog - filtered.length})`);
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

  // Filtrar por búsqueda
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.shortDescription.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
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
    console.log(`📄 Después de paginación: ${filtered.length} productos`);
  }

  console.log(`🎯 Resultado final: ${filtered.length} productos`);
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
  // Mapear el slug de la categoría a los nombres en el JSON
  const categoryNameMap: Record<string, string> = {
    'regalos-originales-para-casa': 'Regalos originales para casa',
    'regalos-frikis': 'Regalos frikis',
    'regalos-wtf': 'Regalos WTF',
    'regalos-para-todo-tipo-de-edades': 'Regalos para todo tipo de edades',
    'regalos-para-pasarlo-bien': 'Regalos para pasarlo bien',
    'regalos-para-cumpleanos': 'Regalos para cumpleaños',
    'halloween': 'Halloween',
    'regalos-originales-para-parejas': 'Regalos originales para parejas',
    'blog': 'blog'
  };
  
  const categoryName = categoryNameMap[categorySlug] || categorySlug;
  
  // Para Halloween, buscar tanto en categorías como en tags
  if (categorySlug === 'halloween') {
    const allProducts = getAllProducts();
    return allProducts.filter(product => 
      product.categories.includes('Halloween') || 
      (product.tags && product.tags.some(tag => tag.toLowerCase() === 'halloween'))
    );
  }
  
  // Para regalos originales para parejas, buscar ambas versiones (mayúsculas y minúsculas)
  if (categorySlug === 'regalos-originales-para-parejas') {
    return getFilteredProducts({ 
      categories: ['regalos originales para parejas'],
      includeBlog: false
    });
  }
  
  return getFilteredProducts({ 
    categories: [categoryName],
    includeBlog: categorySlug === 'blog'
  });
}

/**
 * Obtiene productos destacados
 */
export function getFeaturedProducts(): Product[] {
  return getFilteredProducts({ featured: true });
}

/**
 * Mapea categorías del JSON a slugs de configuración
 */
export function mapCategoryToSlug(category: string): string {
  const categoryMap: Record<string, string> = {
    'Regalos originales para casa': 'regalos-originales-para-casa',
    'Regalos frikis': 'regalos-frikis',
    'Regalos WTF': 'regalos-wtf',
    'Regalos para todo tipo de edades': 'regalos-para-todo-tipo-de-edades',
    'Regalos para pasarlo bien': 'regalos-para-pasarlo-bien',
    'Regalos para cumpleaños': 'regalos-para-cumpleanos',
    'Regalos originales para parejas': 'regalos-originales-para-parejas',
    'regalos originales para parejas': 'regalos-originales-para-parejas',
    'blog': 'blog'
  };
  
  return categoryMap[category] || category;
}

/**
 * Obtiene categorías disponibles con conteo de productos
 */
export function getAvailableCategories(): Array<{
  slug: CategorySlug;
  name: string;
  description: string;
  count: number;
}> {
  const products = getAllProducts();
  
  return Object.entries(categoryConfig).map(([slug, config]) => {
    const count = products.filter(product =>
      product.categories.some(cat => mapCategoryToSlug(cat) === slug)
    ).length;
    
    return {
      slug: slug as CategorySlug,
      name: config.name,
      description: config.description,
      count
    };
  }).filter(category => category.count > 0);
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

/**
 * Genera URL de afiliado con parámetros UTM
 */
export function generateAffiliateUrl(
  product: Product,
  source = 'mqm-web',
  medium = 'affiliate'
): string {
  try {
    const url = new URL(product.affiliateUrl);
    url.searchParams.set('utm_source', source);
    url.searchParams.set('utm_medium', medium);
    url.searchParams.set('utm_campaign', product.slug);
    url.searchParams.set('utm_content', product.id);
    return url.toString();
  } catch {
    // Si la URL no es válida, devolver tal como está
    return product.affiliateUrl;
  }
}
