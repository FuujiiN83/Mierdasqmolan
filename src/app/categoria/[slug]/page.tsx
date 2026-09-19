import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryClient } from './CategoryClient';
import { getCategoryPage, getProductsByCategory } from '@/lib/data';
import { categoryConfig, CategorySlug, siteConfig } from '@/config/site';
import { generateCategoryMetadata } from '@/lib/seo';
import { parsePageParam } from '@/lib/pagination';

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string | string[];
  };
}

/**
 * Página pedida, o `null` si es la primera / no viene.
 *
 * Se llama en los dos sitios (metadata y render) para que ambos decidan lo
 * mismo sobre una URL fuera de rango. Una `?page=99` no se acota a la última:
 * eso serviría el mismo contenido bajo dos URL distintas. Se responde 404.
 */
function resolveRequestedPage(
  slug: CategorySlug,
  pageParam: string | string[] | undefined
): number | null {
  const pedida = parsePageParam(pageParam);
  if (pedida === null) return null;

  const total = getProductsByCategory(slug).length;
  const totalPages = Math.max(1, Math.ceil(total / siteConfig.pagination.productsPerPage));

  if (pedida > totalPages) notFound();

  return pedida;
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const categorySlug = params.slug as CategorySlug;
  const category = categoryConfig[categorySlug];

  if (!category) {
    return {
      title: 'Categoría no encontrada',
    };
  }

  const total = getProductsByCategory(categorySlug).length;
  const page = resolveRequestedPage(categorySlug, searchParams?.page) ?? 1;

  return generateCategoryMetadata(
    category.name,
    category.description,
    categorySlug,
    total,
    page
  );
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const categorySlug = params.slug as CategorySlug;
  const category = categoryConfig[categorySlug];

  // Si la categoría no existe, mostrar 404
  if (!category) {
    notFound();
  }

  const page = resolveRequestedPage(categorySlug, searchParams?.page) ?? 1;

  // El recorte se hace en el servidor: al cliente solo le llega la página que
  // se va a ver, ya sin descripciones (ver `getCategoryPage`).
  const pageOfProducts = getCategoryPage(categorySlug, page);

  return <CategoryClient categorySlug={categorySlug} page={pageOfProducts} />;
}
