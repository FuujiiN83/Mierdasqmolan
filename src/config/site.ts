export const siteConfig = {
  name: "MQM Web",
  description: "Las mejores ofertas y productos que molan",
  url: "https://www.mierdasquemolan.com",
  ogImage: "/logo.png",
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

// Configuración de categorías basada en los productos existentes
export const categoryConfig = {
  viral: {
    name: "Viral",
    description: "Lo que está de moda y arrasa en redes",
    color: "#F59E0B",
    icon: "🔥"
  },
  random: {
    name: "Random",
    description: "Productos curiosos y sorprendentes",
    color: "#8B5CF6",
    icon: "🎲"
  },
  viejoven: {
    name: "Viejoven",
    description: "Para los que ya no son tan jóvenes pero siguen siendo jóvenes de corazón",
    color: "#8B5CF6",
    icon: "👴"
  },
  ofendiditos: {
    name: "Ofendiditos",
    description: "Para los que se ofenden por todo",
    color: "#EF4444",
    icon: "😤"
  },
  dejados: {
    name: "Dejados",
    description: "Para los que han tirado la toalla",
    color: "#6B7280",
    icon: "🛋️"
  },
  otakus: {
    name: "Otakus",
    description: "Anime, manga y cultura japonesa",
    color: "#EC4899",
    icon: "🎌"
  },
  adolescentes: {
    name: "Adolescentes",
    description: "Para los que todavía no saben nada de la vida",
    color: "#06B6D4",
    icon: "🧒"
  },
  cinefilos: {
    name: "Cinéfilos",
    description: "Para los amantes del séptimo arte",
    color: "#1F2937",
    icon: "🎬"
  },
  ninos: {
    name: "Niños",
    description: "Para los pequeños de la casa",
    color: "#10B981",
    icon: "🧸"
  },
  educativo: {
    name: "Educativo",
    description: "Aprender jugando",
    color: "#3B82F6",
    icon: "📚"
  },
  steam: {
    name: "STEAM",
    description: "Ciencia, tecnología, ingeniería, arte y matemáticas",
    color: "#6366F1",
    icon: "🔬"
  },
  deportistas: {
    name: "Deportistas",
    description: "Para los que mueven el esqueleto",
    color: "#059669",
    icon: "⚽"
  },
  frikis: {
    name: "Frikis",
    description: "Para los amantes de la cultura geek",
    color: "#10B981",
    icon: "🤓"
  },
  gamers: {
    name: "Gamers",
    description: "Para los adictos a los videojuegos",
    color: "#8B5CF6",
    icon: "🎮"
  },
  fiesta: {
    name: "Fiesta",
    description: "Para animar cualquier celebración",
    color: "#F59E0B",
    icon: "🎉"
  },
  "vida-en-el-wc": {
    name: "Vida en el WC",
    description: "Para los momentos más íntimos",
    color: "#6366F1",
    icon: "🚽"
  },
  blog: {
    name: "Blog",
    description: "Artículos y contenido especial",
    color: "#1F2937",
    icon: "📝"
  },
  halloween: {
    name: "Halloween",
    description: "Productos terroríficos y de Halloween",
    color: "#7C2D12",
    icon: "🎃"
  },
  divertido: {
    name: "Divertido",
    description: "Productos para reír y pasar un buen rato",
    color: "#F59E0B",
    icon: "😄"
  },
  hogar: {
    name: "Hogar",
    description: "Decoración y accesorios para el hogar",
    color: "#10B981",
    icon: "🏠",
    subcategories: {
      tazas: {
        name: "Tazas",
        description: "Para los amantes del café y bebidas calientes",
        color: "#8B4513",
        icon: "☕"
      },
      ropa: {
        name: "Ropa",
        description: "Camisetas, calcetines y ropa divertida",
        color: "#EC4899",
        icon: "👕"
      },
      tecnologico: {
        name: "Tecnológico",
        description: "Gadgets y productos tecnológicos",
        color: "#3B82F6",
        icon: "📱"
      },
      "juegos-de-mesa": {
        name: "Juegos de Mesa",
        description: "Diversión analógica para todos",
        color: "#7C3AED",
        icon: "🎲"
      },
      libros: {
        name: "Libros",
        description: "Para los amantes de la lectura",
        color: "#DC2626",
        icon: "📚"
      }
    }
  },
  bromas: {
    name: "Bromas",
    description: "Productos para hacer bromas y reírse",
    color: "#DC2626",
    icon: "😈"
  },
  musica: {
    name: "Música",
    description: "Productos relacionados con la música y el sonido",
    color: "#8B5CF6",
    icon: "🎵"
  },
} as const;

export type CategorySlug = keyof typeof categoryConfig;

// Tipo para subcategorías
export type SubcategoryConfig = {
  name: string;
  description: string;
  color: string;
  icon: string;
};

// Tipo para categorías con subcategorías opcionales
export type CategoryConfigWithSubcategories = {
  name: string;
  description: string;
  color: string;
  icon: string;
  subcategories?: Record<string, SubcategoryConfig>;
};
