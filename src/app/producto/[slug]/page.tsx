import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts, generateAffiliateUrl } from '@/lib/data';
import { formatPrice, formatDate, markdownToHtml, getDomainFromUrl } from '@/lib/utils';
import { categoryConfig } from '@/config/site';
import { ProductCard } from '@/components/ProductCard';
import { AdSlot } from '@/components/AdSlot';

interface ProductPageProps {
  params: {
    slug: string;
  };
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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription,
    image: product.image,
    brand: product.merchant || 'MQM Web',
    offers: product.price ? {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'EUR',
      availability: 'https://schema.org/InStock',
      url: affiliateUrl,
    } : undefined,
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
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.svg';
                }}
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            {/* Breadcrumb */}
            <nav className="flex mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-700">
                    Inicio
                  </Link>
                </li>
                <li>
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                {product.categories[0] && (
                  <>
                    <li>
                      <Link 
                        href={`/categoria/${product.categories[0]}`}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {categoryConfig[product.categories[0] as keyof typeof categoryConfig]?.name || product.categories[0]}
                      </Link>
                    </li>
                    <li>
                      <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </li>
                  </>
                )}
                <li>
                  <span className="text-gray-500" aria-current="page">
                    {product.title}
                  </span>
                </li>
              </ol>
            </nav>

            {/* Featured badge */}
            {product.isFeatured && (
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-100 text-accent-800">
                  ⭐ Producto destacado
                </span>
              </div>
            )}

            {/* Title and price */}
            <h1 className="text-3xl font-bold font-potta-one tracking-tight text-product-orange sm:text-4xl">
              {product.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Información del producto</h2>
              {product.price && (
                <p className="text-3xl tracking-tight font-bold font-potta-one text-header-purple">
                  {formatPrice(product.price, product.currency)}
                </p>
              )}
            </div>

            {/* Short description */}
            <div className="mt-6">
              <p className="text-lg text-gray-600 font-preahvihear leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Categories */}
            <div className="mt-6">
              <h3 className="text-sm font-medium font-potta-one text-header-purple mb-2">Categorías:</h3>
              <div className="flex flex-wrap gap-2">
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

            {/* Metadata */}
            <div className="mt-6 text-sm text-gray-500 space-y-1">
              <p>Publicado: {formatDate(product.createdAt)}</p>
              {product.merchant && (
                <p>Disponible en: <span className="font-medium">{product.merchant}</span></p>
              )}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <a
                href={affiliateUrl}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="w-full bg-primary-600 border border-transparent rounded-md py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                <span className="mr-2">Ver oferta en {product.merchant || merchantDomain}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              
              <p className="text-xs text-gray-500 mt-3 text-center">
                Este es un enlace de afiliación. Podemos recibir una comisión por las compras realizadas.
              </p>
            </div>

            {/* Ad space */}
            <div className="mt-8">
              <AdSlot position="inline" size="medium" />
            </div>
          </div>
        </div>

        {/* Product details */}
        <div className="mt-16 lg:mt-20">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-8">
              <div>
                <h2 className="text-2xl font-bold font-potta-one text-header-purple mb-6">Descripción completa</h2>
                <div 
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ 
                    __html: markdownToHtml(product.description) 
                  }}
                />

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold font-potta-one text-header-purple mb-4">Etiquetas</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-white border border-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="mt-16 lg:mt-0 lg:col-span-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold font-potta-one text-header-purple mb-4">Resumen del producto</h3>
                <dl className="space-y-3">
                  {product.price && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Precio</dt>
                      <dd className="text-lg font-semibold font-potta-one text-header-purple">
                        {formatPrice(product.price, product.currency)}
                      </dd>
                    </div>
                  )}
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Disponible en</dt>
                    <dd className="text-sm text-gray-900">{product.merchant || merchantDomain}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Categorías</dt>
                    <dd className="text-sm text-gray-900">
                      {product.categories.map((cat) => 
                        categoryConfig[cat as keyof typeof categoryConfig]?.name || cat
                      ).join(', ')}
                    </dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Última actualización</dt>
                    <dd className="text-sm text-gray-900">{formatDate(product.updatedAt || product.createdAt)}</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="w-full bg-accent-600 border border-transparent rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 transition-colors"
                  >
                    Ver oferta completa
                  </a>
                </div>
              </div>

              {/* Ad space */}
              <div className="mt-6">
                <AdSlot position="sidebar-sticky" size="medium" />
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 lg:mt-20">
            <h2 className="text-2xl font-bold font-potta-one text-header-purple mb-8">Productos relacionados</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  showExpandButton={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
