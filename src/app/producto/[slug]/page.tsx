import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { OptimizedImage } from '@/components/OptimizedImage';
import { getProductBySlug, getRelatedProducts, generateAffiliateUrl, getAllProducts, mapCategoryToSlug } from '@/lib/data';
import { Product } from '@/types';
import { formatPrice, formatDate, markdownToHtml, getDomainFromUrl } from '@/lib/utils';
import { categoryConfig } from '@/config/site';
import { ProductCard } from '@/components/ProductCard';
import { AdSlot } from '@/components/AdSlot';
import { ShareButtons } from '@/components/ShareButtons';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

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

  const affiliateUrl = generateAffiliateUrl(product);
  const merchantDomain = getDomainFromUrl(product.affiliateUrl);

  return {
    title: `${product.title} - Oferta en ${merchantDomain}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.title} - Oferta en ${merchantDomain}`,
      description: product.shortDescription,
      images: [product.image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} - Oferta en ${merchantDomain}`,
      description: product.shortDescription,
      images: [product.image],
    },
    alternates: {
      canonical: `/producto/${product.slug}`,
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  const affiliateUrl = generateAffiliateUrl(product);
  const relatedProducts = getRelatedProducts(product, 4);
  const merchantDomain = getDomainFromUrl(product.affiliateUrl);

  // Generar structured data para SEO
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
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 0,
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Breadcrumb */}
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </Link>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  <ol className="flex items-center space-x-2 text-sm">
                    <li>
                      <Link 
                        href="/" 
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      >
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
                            href={`/categoria/${mapCategoryToSlug(product.categories[0])}`}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
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
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Imagen del producto */}
            <div className="lg:col-span-12">
              <div className="flex flex-col-reverse">
                <div className="w-full aspect-square sm:aspect-[4/3] lg:aspect-square">
                  <OptimizedImage
                    src={product.image}
                    alt={product.alt || product.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-center object-cover rounded-lg"
                    priority
                  />
                </div>
              </div>

              {/* Product info */}
              <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                {/* Title and price */}
                <h1 className="text-3xl font-bold font-potta-one tracking-tight text-product-orange sm:text-4xl">
                  {product.title}
                </h1>

                <div className="mt-3">
                  <h2 className="sr-only">Información del producto</h2>
                  {product.price && (
                    <p className="text-3xl tracking-tight font-bold font-potta-one text-header-purple hidden">
                      {formatPrice(product.price, product.currency)}
                    </p>
                  )}
                </div>

                {/* Short description */}
                <div className="mt-6">
                  <p className="text-lg text-gray-600 dark:text-white font-preahvihear leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Botón Ver Oferta */}
                <div className="mt-8">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                  >
                    Comprar
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>

                {/* Share buttons */}
                <ShareButtons 
                  productTitle={product.title}
                  productUrl={`/producto/${product.slug}`}
                  productImage={product.image}
                />

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold font-potta-one text-header-purple mb-4">Etiquetas</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Descripción completa */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold font-potta-one text-header-purple mb-4">Descripción del producto</h3>
                  <div 
                    className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(product.description) }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 lg:mt-20">
              <h2 className="text-2xl font-bold font-potta-one text-header-purple mb-8">Productos relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    className="h-full"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}