export const siteConfig = {
  name: "Mierdas que molan - Regalos originales y mucho más",
  description: "Regalos originales frikis, para parejas, fiestas, grandes ratos de diversión y mucho. Entra y busca tu regalo favorito.",
  url: "https://www.mierdasquemolan.com",
  ogImage: "/og-image.png",
  pagination: {
    productsPerPage: 12
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
  affiliate: {
    disclaimer: "Este sitio contiene enlaces de afiliación. Podemos recibir una comisión por las compras realizadas a través de estos enlaces, sin coste adicional para ti. Esto nos ayuda a mantener el sitio funcionando y a seguir encontrando las mejores ofertas."
  }
};

export type SiteConfig = typeof siteConfig;

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
    description: "Regalos originales para frikis. porque no es una moda, es un estilo de vida que nos encanta. ¡Viva el orgullo friki!",
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
    description: "regalos originales para niños, adolescentes, adultos y para pasar buenos momentos.",
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

