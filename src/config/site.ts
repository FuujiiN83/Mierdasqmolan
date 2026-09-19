export const siteConfig = {
  // La marca, corta y sola: es la que firma el structured data, el
  // `og:site_name`, el manifest y el copyright. Antes aquí vivía la versión
  // larga ("… - Regalos originales y mucho más"), que acababa duplicando la
  // marca en los títulos ("… | Mierdas que molan - Regalos originales y mucho
  // más | Mierdas que molan").
  name: "Mierdas que molan",
  tagline: "Regalos originales y mucho más",
  description: "Regalos originales frikis, para parejas, fiestas, grandes ratos de diversión y mucho. Entra y busca tu regalo favorito.",
  url: "https://www.mierdasquemolan.com",
  ogImage: "/og-image.png",
  pagination: {
    // 24 y no 12: con 12 fichas por página la categoría más grande se partía en
    // 15 URLs y cada una arrastraba un <nav> de paginación enorme. Con 24 el
    // reparto de enlaces internos mejora y sobran la mitad de páginas.
    productsPerPage: 24
  },
  ads: {
    enabled: false, // ← Temporalmente desactivado
    positions: {
      hero: false,
      sidebar: false,
      inline: false
    },
    inlineFrequency: 6 // Cada 6 productos
  },
  analytics: {
    googleAnalyticsId: "G-FCD8D2QZEZ"
  },
  // Perfiles oficiales. Alimentan el `sameAs` del schema de Organization, que es
  // como se le dice a Google que esta web y esas cuentas son la misma entidad.
  social: {
    facebook: "https://www.facebook.com/mierdasquemolan",
    instagram: "https://www.instagram.com/mierdasquemolan",
    youtube: "https://www.youtube.com/@mierdasquemolan",
    linkedin: "https://www.linkedin.com/company/mierdasquemolan"
  },
  affiliate: {
    disclaimer: "Este sitio contiene enlaces de afiliación. Podemos recibir una comisión por las compras realizadas a través de estos enlaces, sin coste adicional para ti. Esto nos ayuda a mantener el sitio funcionando y a seguir encontrando las mejores ofertas."
  }
};

export type SiteConfig = typeof siteConfig;

/**
 * Fecha de la última revisión de los textos legales (aviso legal, privacidad,
 * cookies y afiliados).
 *
 * Es una constante a propósito. En la página de afiliados ponía
 * `new Date().toLocaleDateString()`, así que anunciaba la fecha del build como
 * "última actualización" en cada despliegue hubiese cambiado algo o no; y en el
 * sitemap esas cuatro URLs llevaban la hora del build. Se actualiza a mano
 * cuando se toquen los textos legales (y entonces se cambia aquí, en un sitio).
 */
export const LEGAL_LAST_UPDATED = '2025-07-23';

// Configuración de categorías unificadas
export const categoryConfig = {
  "regalos-originales-para-casa": {
    name: "Regalos originales para casa",
    description: "Productos únicos y originales para decorar y mejorar tu hogar con un toque muy especial.",
    color: "#10B981",
    icon: "🏠"
  },
  "regalos-frikis": {
    name: "Regalos frikis",
    // Corta a propósito: esta descripción es la meta description (155 máx.) y
    // el texto de entrada de la categoría. Con 141 caracteres no cabía el
    // recuento de productos y la meta salía cortada a media frase.
    description: "Regalos frikis y originales: ser friki no es una moda, es un estilo de vida.",
    color: "#8B5CF6",
    icon: "🤓"
  },
  "regalos-wtf": {
    name: "Regalos WTF",
    description: "Productos locos, virales y que te harán decir WTF",
    color: "#F59E0B",
    icon: "🤯"
  },
  "regalos-para-todo-tipo-de-edades": {
    name: "Regalos para todo tipo de edades",
    description: "Regalos originales para niños, adolescentes y adultos, para acertar con cualquier edad y pasar un buen rato.",
    color: "#06B6D4",
    icon: "👥"
  },
  "regalos-para-pasarlo-bien": {
    name: "Regalos para pasarlo bien",
    description: "Regalos originales para pasar momentos muy divertidos con amigos o en familia.",
    color: "#EF4444",
    icon: "🎉"
  },
  "regalos-para-cumpleanos": {
    name: "Regalos para cumpleaños",
    description: "Regalos originales para cumpleaños. Regala algo distinto y con encanto a esa persona que tanto aprecias.",
    color: "#EC4899",
    icon: "🎂"
  },
  "halloween": {
    name: "Halloween",
    description: "Productos espeluznantes y divertidos para la noche más terrorífica del año",
    color: "#7C2D12",
    icon: "🎃"
  },
  "regalos-originales-para-parejas": {
    name: "Regalos originales para parejas",
    description: "Regalos originales para disfrutar grandes momentos con tu pareja. Experiencias únicas, divertidas y sensoriales para recordar y repetir en mas de una ocasión",
    color: "#E91E63",
    icon: "💕"
  },
  "mierdas-gamers": {
    name: "Mierdas gamers",
    description: "Productos gaming, frikis y de videojuegos para los verdaderos gamers. Desde consolas retro hasta accesorios únicos para tu setup gaming.",
    color: "#00D4AA",
    icon: "🎮"
  },
  blog: {
    name: "Blog",
    description: "Artículos y contenido especial",
    color: "#1F2937",
    icon: "📝"
  }
} as const;

export type CategorySlug = keyof typeof categoryConfig;

/**
 * Categoría lista para pintar en un menú (con su número de productos).
 *
 * El tipo vive aquí, en la config pura, y no en `lib/data.ts`, para que los
 * componentes de cliente puedan tiparlo sin importar el módulo que carga el
 * catálogo de 1,9 MB.
 */
export interface CategoryOption {
  slug: CategorySlug;
  name: string;
  description: string;
  count: number;
}

/** Todos los nombres canónicos de categoría, en un Set para búsquedas rápidas. */
export const CATEGORY_NAMES: ReadonlySet<string> = new Set(
  Object.values(categoryConfig).map(c => c.name)
);

/** ¿Es `name` el nombre canónico de alguna categoría? */
export function isKnownCategoryName(name: string): boolean {
  return CATEGORY_NAMES.has(name);
}

/**
 * ¿Es un valor admisible del campo `categories` de un producto?
 * Acepta los nombres canónicos y 'blog', que se etiqueta en minúscula porque
 * los artículos viven en data/blog.json y no son productos.
 */
export function isKnownCategoryValue(value: string): boolean {
  return CATEGORY_NAMES.has(value) || value === 'blog';
}

/**
 * Slug de categoría a partir de su nombre canónico.
 *
 * Sustituye a los mapas manuales que había repartidos por `data.ts` y
 * `ProductCard.tsx`: estaban incompletos (les faltaban "Halloween" y
 * "Mierdas gamers") y se desincronizaban cada vez que cambiaba el catálogo.
 * Si el nombre no se reconoce, se devuelve tal cual.
 */
export function categorySlugFromName(name: string): string {
  const entrada = (Object.entries(categoryConfig) as [string, { name: string }][])
    .find(([, config]) => config.name === name);
  return entrada ? entrada[0] : name;
}

// Aquí vivían `SubcategoryConfig` y `CategoryConfigWithSubcategories`, junto
// con el soporte de submenús en CategoryMenu. Se eliminaron: ninguna categoría
// llegó a declarar `subcategories`, así que ese código no se ejecutó nunca, y
// tal como estaba generaba enlaces a `/categoria/<clave>` que habrían dado 404
// salvo que cada clave fuese también una categoría real. Si algún día se
// quieren subcategorías, hay que decidir antes si son categorías con jerarquía
// o solo agrupaciones visuales; está en el historial de git.

