// Función simple para combinar clases sin dependencias externas
export function clsx(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs.filter(Boolean).join(' ');
}

export function twMerge(...inputs: string[]): string {
  // Implementación simple de merge de clases Tailwind
  return inputs.join(' ');
}

export type ClassValue = string | undefined | null | boolean;

/**
 * Combina clases de Tailwind CSS de forma inteligente
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

/**
 * Formatea precio con moneda
 */
export function formatPrice(price: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}

/**
 * Formatea fecha relativa (ej: "hace 2 días")
 */
export function formatRelativeDate(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffInMs = now.getTime() - target.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return 'Hoy';
  } else if (diffInDays === 1) {
    return 'Ayer';
  } else if (diffInDays < 7) {
    return `Hace ${diffInDays} días`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `Hace ${weeks} semana${weeks > 1 ? 's' : ''}`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `Hace ${months} mes${months > 1 ? 'es' : ''}`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `Hace ${years} año${years > 1 ? 's' : ''}`;
  }
}

/**
 * Formatea fecha absoluta
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

/**
 * Trunca texto con puntos suspensivos
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Genera slug a partir de texto
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
    .trim()
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-') // Múltiples guiones a uno solo
    .replace(/^-|-$/g, ''); // Quitar guiones al inicio/final
}

/**
 * Debounce función para optimizar búsquedas
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

/**
 * Convierte markdown básico a HTML
 */
export function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // Italic  
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/\n/g, '<br>')
    // Lists
    .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
    // Wrap in paragraphs
    .replace(/^(?!<[h1-6]|<li)(.+)$/gim, '<p class="mb-3">$1</p>')
    // Clean up
    .replace(/<p class="mb-3"><\/p>/g, '');
}

/**
 * Valida si una URL es externa
 */
export function isExternalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname !== window.location.hostname;
  } catch {
    return false;
  }
}

/**
 * Extrae el dominio de una URL
 */
export function getDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return 'Enlace externo';
  }
}

/**
 * Genera un ID único
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Maneja el scroll suave a un elemento
 */
export function scrollToElement(elementId: string, offset = 0): void {
  const element = document.getElementById(elementId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

/**
 * Optimiza imagen para diferentes tamaños
 */
export function getOptimizedImageUrl(
  src: string,
  width: number,
  height?: number,
  quality = 80
): string {
  // Si es una imagen externa, devolver tal como está
  if (src.startsWith('http')) {
    return src;
  }
  
  // Para imágenes locales, Next.js se encarga de la optimización
  return src;
}

/**
 * Verifica si estamos en el lado del cliente
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Copia texto al portapapeles
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isClient() || !navigator.clipboard) {
    return false;
  }
  
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
