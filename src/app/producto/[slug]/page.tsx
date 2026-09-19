import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { OptimizedImage } from '@/components/OptimizedImage';
import { getProductBySlug, getRelatedProducts, getAllProducts, mapCategoryToSlug } from '@/lib/data';
import { generateAffiliateUrl } from '@/lib/affiliate';
import { markdownToHtml } from '@/lib/utils';
import { toCardData } from '@/lib/card-data';
import { categoryConfig } from '@/config/site';
import {
  generateBreadcrumbStructuredData,
  generateProductMetadata,
  generateProductStructuredData,
  toJsonLd,
} from '@/lib/seo';
import { ProductCard } from '@/components/ProductCard';
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

  // Los metadatos salen del helper para que la descripción se recorte a 155
  // caracteres (antes se usaba `shortDescription` en crudo y 395 de 420 fichas
  // se pasaban, hasta 619) y para que `og:url` y el tipo correcto se emitan
  // siempre igual.
  return generateProductMetadata(product);
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  const affiliateUrl = generateAffiliateUrl(product);
  // Las tarjetas reciben solo lo que pintan y sin descripción (1,9 MB menos de
  // HTML en el caso de las listas; aquí son 4 fichas, pero se usa el mismo tipo).
  const relatedProducts = getRelatedProducts(product, 4).map(toCardData);

  const primaryCategory = product.categories[0];
  const primaryCategoryName = primaryCategory
    ? categoryConfig[primaryCategory as keyof typeof categoryConfig]?.name || primaryCategory
    : null;

  // Structured data: antes había aquí un bloque escrito a mano que duplicaba (y
  // contradecía) a `generateProductStructuredData`, que existía sin usarse. El
  // inline declaraba un precio que la página no muestra, una imagen relativa y
  // `brand: "Amazon"`, que es el vendedor, no la marca. Ahora hay una sola
  // definición, en `lib/seo.ts`.
  const productStructuredData = generateProductStructuredData(product, affiliateUrl);

  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Inicio', url: '/' },
    ...(primaryCategoryName && primaryCategory
      ? [
          {
            name: primaryCategoryName,
            url: `/categoria/${mapCategoryToSlug(primaryCategory)}`,
          },
        ]
      : []),
    { name: product.title, url: `/producto/${product.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(productStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbStructuredData) }}
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
                    {primaryCategory && primaryCategoryName && (
                      <>
                        <li>
                          <Link
                            href={`/categoria/${mapCategoryToSlug(primaryCategory)}`}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            {primaryCategoryName}
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
                {/* Título */}
                <h1 className="text-3xl font-bold font-potta-one tracking-tight text-product-orange sm:text-4xl">
                  {product.title}
                </h1>

                {/* Aquí había un bloque de precio con `hidden` y `formatPrice`,
                    que devuelve cadena vacía: no pintaba nada, pero el JSON-LD
                    sí declaraba ese precio invisible. Se han quitado los dos:
                    el precio no se muestra en ninguna parte del sitio. */}
                <h2 className="sr-only">Información del producto</h2>

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

                {/* Descripción completa.
                    Va como h2, no h3: al ser el encabezado de la sección
                    principal de la ficha, un h3 saltándose el h2 dejaba la
                    jerarquía h1 → h3 → h2 (los h2 del contenido ya convertido)
                    rota. */}
                <div className="mt-8">
                  <h2 className="text-lg font-semibold font-potta-one text-header-purple mb-4">Descripción del producto</h2>
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
                    // Sin esto se pintaba un "Ver más" que no hacía nada: aquí
                    // no hay estado de expansión ni `onToggleExpand` que pasar.
                    showExpandButton={false}
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