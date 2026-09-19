import Link from 'next/link';
import { categoryConfig } from '@/config/site';

/**
 * 404 propio.
 *
 * Antes se servía el de Next por defecto: sin cabecera, sin pie y sin una sola
 * salida. El status 404 ya era correcto, pero quien llegaba por un enlace roto
 * se iba. Aquí se le dan las categorías y el buscador del header.
 */
export default function NotFound() {
  const categorias = Object.entries(categoryConfig).filter(([slug]) => slug !== 'blog');

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <p className="text-6xl font-bold font-potta-one text-header-purple mb-4">404</p>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Esta página no existe (o ya no mola)
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Puede que el producto se haya agotado o que el enlace esté mal escrito. Prueba por
        categorías, que no te vas a ir con las manos vacías.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categorias.map(([slug, category]) => (
          <Link
            key={slug}
            href={`/categoria/${slug}`}
            className="inline-block bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-primary-500 hover:text-primary-600 text-sm px-4 py-2 rounded-full transition-colors"
          >
            {category.icon} {category.name}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Ver todos los productos
        </Link>
        <Link
          href="/destacados"
          className="inline-flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Productos destacados
        </Link>
      </div>
    </div>
  );
}
