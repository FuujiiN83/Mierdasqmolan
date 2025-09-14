import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CategoryClient } from './CategoryClient';
import { BlogClient } from './BlogClient';
import { getProductsByCategory } from '@/lib/data';
import { categoryConfig, CategorySlug } from '@/config/site';
import { generateCategoryMetadata } from '@/lib/seo';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categorySlug = params.slug as CategorySlug;
  const category = categoryConfig[categorySlug];

  if (!category) {
    return {
      title: 'Categoría no encontrada',
    };
  }

  // Obtener productos de la categoría para el conteo
  const products = getProductsByCategory(categorySlug);
  
  // Usar la función especializada de SEO
  return generateCategoryMetadata(
    category.name,
    category.description,
    categorySlug,
    products.length
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.slug as CategorySlug;
  const category = categoryConfig[categorySlug];

  // Si la categoría no existe, mostrar 404
  if (!category) {
    notFound();
  }

  // Obtener todos los productos de la categoría
  const allCategoryProducts = getProductsByCategory(categorySlug);

  // Usar BlogClient para la categoría blog, CategoryClient para el resto
  if (categorySlug === 'blog') {
    return <BlogClient categorySlug={categorySlug} initialProducts={allCategoryProducts} />;
  }

  return <CategoryClient categorySlug={categorySlug} initialProducts={allCategoryProducts} />;
}