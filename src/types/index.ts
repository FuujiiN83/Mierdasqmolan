import { encodeLocalImageSrc } from '@/lib/image-src';
import { isKnownCategoryValue } from '@/config/site';

/**
 * Normaliza y valida el campo `categories` de un producto.
 *
 * Sin esto, una errata en data/products.json ("Regalos originales para la
 * casa", "Regalo para pasarlo bien") crea una categoría fantasma: el producto
 * no sale en ninguna categoría real y su chip enlaza a una página que no
 * existe. Llegaron a acumularse 9 cadenas distintas así. Ahora se avisa por
 * consola y se descartan, en vez de propagarse en silencio.
 */
function validateCategories(item: any, index: number): string[] {
  const crudas: unknown[] = Array.isArray(item.categories)
    ? item.categories
    : [item.category ?? ''];

  const limpias = crudas
    .filter((c): c is string => typeof c === 'string' && c.trim() !== '')
    .map(c => c.trim());

  const desconocidas = limpias.filter(c => !isKnownCategoryValue(c));
  if (desconocidas.length > 0) {
    console.error(
      `Producto ${item.id ?? index}: categorías desconocidas ${JSON.stringify(desconocidas)}. ` +
      `Añádelas a categoryConfig en src/config/site.ts o corrige data/products.json.`
    );
  }

  return limpias.filter(isKnownCategoryValue);
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  currency?: string;
  originalPrice?: number;
  discount?: string;
  image: string;
  alt?: string;
  affiliateUrl: string;
  amazonUrl?: string;
  categories: string[];
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
  merchant?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface AdPosition {
  position: 'hero-under' | 'inline' | 'sidebar-sticky' | 'footer';
  size: 'small' | 'medium' | 'large' | 'leaderboard';
  className?: string;
}

export interface ProductFilters {
  categories?: string[];
  search?: string;
  featured?: boolean;
  sortBy?: 'newest' | 'oldest' | 'title';
  limit?: number;
  offset?: number;
  includeBlog?: boolean;
}

// Función de validación de productos
export function validateProducts(data: any[]): Product[] {
  if (!Array.isArray(data)) {
    throw new Error('Los datos de productos deben ser un array');
  }

  return data.map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Producto en índice ${index} no es un objeto válido`);
    }

    // Validar campos requeridos (excepto para productos de blog)
    const isBlogProduct = item.categories && item.categories.includes('blog');
    const requiredFields = ['id', 'title', 'description', 'image', 'categories'];
    
    // Para productos de blog, no requerir price ni affiliateUrl
    if (!isBlogProduct) {
      requiredFields.push('price', 'affiliateUrl');
    }
    
    for (const field of requiredFields) {
      if (!item[field]) {
        throw new Error(`Producto en índice ${index} no tiene el campo requerido: ${field}`);
      }
    }

    // Generar slug si no existe
    const slug = item.slug || item.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    return {
      id: String(item.id),
      title: String(item.title),
      slug,
      description: String(item.description),
      shortDescription: item.shortDescription || item.description.substring(0, 150) + '...',
      price: Number(item.price),
      currency: item.currency || 'EUR',
      originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
      discount: item.discount ? String(item.discount) : undefined,
      image: encodeLocalImageSrc(String(item.image)),
      affiliateUrl: String(item.affiliateUrl),
      amazonUrl: item.amazonUrl ? String(item.amazonUrl) : undefined,
      categories: validateCategories(item, index),
      // Sin duplicados: 49 de 420 productos repiten etiquetas en el JSON (uno
      // llega a repetir "ruleta" 6 veces). Como se pintan con `key={tag}`, React
      // avisaba por consola y podía descartar o duplicar nodos al reconciliar.
      tags: Array.isArray(item.tags) ? [...new Set<string>(item.tags.map(String))] : [],
      rating: item.rating ? Number(item.rating) : undefined,
      reviewCount: item.reviewCount ? Number(item.reviewCount) : undefined,
      isFeatured: Boolean(item.isFeatured || item.featured),
      merchant: item.merchant ? String(item.merchant) : undefined,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt ? String(item.updatedAt) : undefined,
    };
  });
}
