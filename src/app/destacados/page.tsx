import FeaturedClient from './FeaturedClient';
import { getFeaturedProducts, getAvailableCategories } from '@/lib/data';

export const metadata = {
  // Sin la marca: el template del layout ya añade "| Mierdas que molan"
  title: 'Productos destacados',
  description:
    'Los mejores productos seleccionados por nuestro equipo: calidad, ofertas increíbles y cosas que realmente molan.',
  alternates: { canonical: 'https://www.mierdasquemolan.com/destacados' },
};

export default function FeaturedPage() {
  // Los datos se calculan en el servidor para que la página llegue con
  // productos y enlaces reales en el HTML. Antes se cargaban en un useEffect
  // y el HTML servido era un esqueleto: sin productos y sin un solo enlace a
  // las fichas.
  const featuredProducts = getFeaturedProducts();
  const categories = getAvailableCategories();

  return (
    <FeaturedClient
      featuredProducts={featuredProducts}
      categories={categories}
    />
  );
}
