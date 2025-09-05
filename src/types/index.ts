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

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  className?: string;
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

    // Validar campos requeridos
    const requiredFields = ['id', 'title', 'description', 'price', 'image', 'affiliateUrl', 'categories'];
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
      image: String(item.image),
      affiliateUrl: String(item.affiliateUrl),
      amazonUrl: item.amazonUrl ? String(item.amazonUrl) : undefined,
      categories: Array.isArray(item.categories) ? item.categories : [item.category || 'general'],
      tags: Array.isArray(item.tags) ? item.tags : [],
      rating: item.rating ? Number(item.rating) : undefined,
      reviewCount: item.reviewCount ? Number(item.reviewCount) : undefined,
      isFeatured: Boolean(item.isFeatured || item.featured),
      merchant: item.merchant ? String(item.merchant) : undefined,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt ? String(item.updatedAt) : undefined,
    };
  });
}
