import { Product } from '@/types';

/**
 * Lo que de verdad pinta una tarjeta de producto.
 *
 * Existe por peso, no por elegancia: las páginas de categoría recibían el
 * `Product` completo de cada producto, y `description` se lleva la mayor parte
 * (mediana de 2.200 caracteres). Con 93 productos en una categoría eso eran
 * 578 KB de HTML, 172 KB comprimidos, para un texto que el usuario solo ve si
 * pulsa "Ver más"... y que además se serializaba 74 veces sin mostrarse nunca.
 *
 * `description` se queda fuera a propósito y se pide bajo demanda a
 * `/api/producto/[slug]` cuando alguien despliega la tarjeta.
 *
 * `price`/`currency`/`rating` tampoco están: la tarjeta no los muestra
 * (`formatPrice` devuelve cadena vacía a propósito) y `aggregateRating` se
 * retiró del structured data por estar fabricado.
 */
export type ProductCardData = Pick<
  Product,
  | 'id'
  | 'title'
  | 'slug'
  | 'shortDescription'
  | 'image'
  | 'alt'
  | 'affiliateUrl'
  | 'categories'
  | 'tags'
  | 'isFeatured'
  | 'merchant'
>;

/** Recorta un producto a lo que necesita la tarjeta. */
export function toCardData(product: Product): ProductCardData {
  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    shortDescription: product.shortDescription,
    image: product.image,
    alt: product.alt,
    affiliateUrl: product.affiliateUrl,
    categories: product.categories,
    tags: product.tags,
    isFeatured: product.isFeatured,
    merchant: product.merchant,
  };
}
