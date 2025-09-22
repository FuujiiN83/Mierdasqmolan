import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProductBySlug, getRelatedProducts, generateAffiliateUrl, getAllProducts } from '@/lib/data';
import { formatPrice, formatDate, markdownToHtml, getDomainFromUrl } from '@/lib/utils';
import { categoryConfig } from '@/config/site';
import { ProductCard } from '@/components/ProductCard';
import { AdSlot } from '@/components/AdSlot';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Generar todas las páginas estáticamente
export async function generateStaticParams() {
  const products = getAllProducts();
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: product.title,
    description: product.shortDescription,
    keywords: product.tags || [],
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      type: 'article',
      publishedTime: product.createdAt,
      modifiedTime: product.updatedAt || product.createdAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);
  const affiliateUrl = generateAffiliateUrl(product);
  const merchantDomain = getDomainFromUrl(product.affiliateUrl);

  // Structured Data para SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.merchant || 'MQM Web',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: 'https://schema.org/InStock',
      url: affiliateUrl,
      seller: {
        '@type': 'Organization',
        name: product.merchant || merchantDomain,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '127',
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="w-full aspect-square sm:aspect-[4/3] lg:aspect-square">
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-center object-cover rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            {/* Breadcrumb */}
            <nav className="flex mb-8" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600">
                    <svg className="w-3 h-3 mr-2.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 0-2H4v-9.586l6.293 6.293a1 1 0 0 0 1.414 0L18 3.414V9a1 1 0 1 0 2 0V3.414l.707.707a1 1 0 0 0 1.414-1.414l-2-2Z"/>
                    </svg>
                    Inicio
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <Link href={`/categoria/${product.categories[0]}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-primary-600 md:ml-2">
                      {categoryConfig[product.categories[0] as keyof typeof categoryConfig]?.name || product.categories[0]}
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{product.title}</span>
                  </div>
                </li>
              </ol>
            </nav>

            <div className="lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.title}
                </h1>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Descripción</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.shortDescription}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline space-x-2">
                  <p className="text-3xl font-bold tracking-tight text-primary-600">
                    {formatPrice(product.price, product.currency)}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Precio en {product.merchant || merchantDomain}
                </p>
              </div>

              <div className="mt-6">
                <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-3 px-6 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>Ver Oferta en {product.merchant || merchantDomain}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-sm font-medium text-gray-900">Categorías</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.categories.map((categorySlug) => {
                    const category = categoryConfig[categorySlug as keyof typeof categoryConfig];
                    return (
                      <Link
                        key={categorySlug}
                        href={`/categoria/${categorySlug}`}
                        className="inline-block bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 text-sm px-3 py-1 rounded-full transition-colors"
                      >
                        {category?.name || categorySlug}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-sm font-medium text-gray-900">Información del producto</h3>
                <div className="mt-2 space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Fecha de publicación:</span>
                    <span>{formatDate(product.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tienda:</span>
                    <span>{product.merchant || merchantDomain}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product description */}
        <div className="mt-16">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Descripción completa</h2>
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(product.description) }}
            />
          </div>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="mt-16">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Etiquetas</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Productos relacionados</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.slice(0, 3).map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  showExpandButton={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Ad Slot */}
        <div className="mt-16">
          <AdSlot position="footer" size="leaderboard" />
        </div>
      </div>
    </>
  );
}