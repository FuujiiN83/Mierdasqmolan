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
  adultos: {
    name: "Adultos",
    description: "Para los que ya no son chavales",
    color: "#6B7280",
    icon: "👨‍💼"
  },
  ofendiditos: {
    name: "Ofendiditos",
    description: "Para los que se ofenden por todo",
    color: "#EF4444",
    icon: "😤"
  },
  casados: {
    name: "Casados",
    description: "La realidad del matrimonio",
    color: "#10B981",
    icon: "💍"
  },
  dejados: {
    name: "Dejados",
    description: "Para los que han tirado la toalla",
    color: "#6B7280",
    icon: "🛋️"
  },
  "anti-fitness": {
    name: "Anti Fitness",
    description: "Orgullosamente sedentarios",
    color: "#F97316",
    icon: "🍕"
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
  facheritos: {
    name: "Facheritos",
    description: "Para los que se las dan de guays",
    color: "#8B5CF6",
    icon: "😎"
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
  "gym-bros": {
    name: "Gym Bros",
    description: "Para los adictos al gimnasio",
    color: "#EF4444",
    icon: "💪"
  },
  deportistas: {
    name: "Deportistas",
    description: "Para los que mueven el esqueleto",
    color: "#059669",
    icon: "⚽"
  },
  divorciados: {
    name: "Divorciados",
    description: "Nueva vida, nuevas oportunidades",
    color: "#84CC16",
    icon: "🆓"
  },
  rancios: {
    name: "Rancios",
    description: "Para los que van a su bola",
    color: "#92400E",
    icon: "🧓"
  },
  ratas: {
    name: "Ratas",
    description: "Para los tacaños profesionales",
    color: "#374151",
    icon: "🐭"
  },
  "juegos-de-mesa": {
    name: "Juegos de Mesa",
    description: "Diversión analógica para todos",
    color: "#7C3AED",
    icon: "🎲"
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
  libros: {
    name: "Libros",
    description: "Para los amantes de la lectura",
    color: "#DC2626",
    icon: "📚"
  },
  tazas: {
    name: "Tazas",
    description: "Para los amantes del café y bebidas calientes",
    color: "#8B4513",
    icon: "☕"
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
  ropa: {
    name: "Ropa",
    description: "Camisetas, calcetines y ropa divertida",
    color: "#EC4899",
    icon: "👕"
  }
} as const;

export type CategorySlug = keyof typeof categoryConfig;
