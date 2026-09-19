import { siteConfig } from '@/config/site';

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


/*
 * Aquí vivía `formatPrice()`, que devolvía siempre cadena vacía porque el sitio
 * no muestra precios. Se ha eliminado al quitar sus dos últimos usos (el hueco
 * `hidden` de la ficha y el de la tarjeta): una función que promete formatear un
 * precio y devuelve "" es una trampa para el siguiente que la llame, y además su
 * presencia sostenía un `offers.price` en el structured data que no correspondía
 * a nada visible.
 *
 * Si algún día se muestran precios, hay que crearla de nuevo Y volver a meter el
 * precio en el JSON-LD de producto, que ahora mismo no lo emite a propósito.
 */

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
 * Normaliza texto para buscar: minúsculas y sin acentos.
 *
 * Sin esto el buscador era sensible a los acentos: "lampara" no encontraba
 * "Lámpara" (se perdían 16 de 22 productos) y "camara"/"pinata" devolvían 0.
 * Es lo que teclea cualquiera desde el móvil, así que no se puede ignorar.
 */
export function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Etiquetas que nunca deben llegar al DOM desde contenido de producto.
const DANGEROUS_TAGS = /<\s*(script|style|iframe|object|embed|form|link|meta|base)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi;
const DANGEROUS_SELF_CLOSING = /<\s*(script|style|iframe|object|embed|form|link|meta|base)\b[^>]*\/?>/gi;
// onclick=, onerror=, onload=…
const INLINE_EVENT_HANDLERS = /\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
// href="javascript:…" / src='javascript:…' / href=data:text/html…
const DANGEROUS_URL_ATTRS = /(href|src)\s*=\s*(?:"|')?\s*(?:javascript|data|vbscript):[^"'>\s]*(?:"|')?/gi;

// Cualquier apertura de <a ...>, con o sin atributos.
const ANCHOR_TAG = /<a\b[^>]*>/gi;

/** Atributo troceado de una etiqueta de apertura. */
interface Atributo {
  name: string;
  raw: string;
}

/**
 * Trocea los atributos de una etiqueta respetando las comillas.
 *
 * Hace falta trocear de verdad en vez de buscar ` rel=` con una regex: dentro de
 * `href="https://x.com/q?a=1 rel=2"` hay un ` rel=` que no es un atributo, y
 * reescribirlo dejaba el `href` sin cerrar y se comía el resto del documento.
 */
function parseAttributes(tag: string): Atributo[] {
  const cuerpo = tag.replace(/^<a\b/i, '').replace(/>$/, '').trim();
  const atributos: Atributo[] = [];
  let i = 0;

  while (i < cuerpo.length) {
    while (i < cuerpo.length && /\s/.test(cuerpo[i])) i++;
    if (i >= cuerpo.length) break;

    const inicio = i;
    while (i < cuerpo.length && !/[\s=]/.test(cuerpo[i])) i++;

    const nombre = cuerpo.slice(inicio, i);
    if (!nombre) {
      i++;
      continue;
    }

    while (i < cuerpo.length && /\s/.test(cuerpo[i])) i++;

    if (cuerpo[i] === '=') {
      i++;
      while (i < cuerpo.length && /\s/.test(cuerpo[i])) i++;

      const comilla = cuerpo[i];
      if (comilla === '"' || comilla === "'") {
        i++;
        while (i < cuerpo.length && cuerpo[i] !== comilla) i++;
        i++; // cierre de la comilla
      } else {
        while (i < cuerpo.length && !/\s/.test(cuerpo[i])) i++;
      }
    }

    atributos.push({ name: nombre, raw: cuerpo.slice(inicio, i) });
  }

  return atributos;
}

/** Valor de un atributo ya troceado: `href="x"` → `x`. */
function valorDeAtributo(raw: string): string {
  const igual = raw.indexOf('=');
  if (igual === -1) return '';

  const valor = raw
    .slice(igual + 1)
    .trim()
    .replace(/^["']|["']$/g, '');

  return valor;
}

/**
 * Decodifica las entidades que el navegador resolvería antes de seguir el
 * enlace: `&#104;ttps://…` es `https://…` para el navegador, así que si aquí se
 * leyera en crudo, un enlace externo pasaría por interno y se quedaría dofollow.
 *
 * Solo se usa para DECIDIR; el HTML de salida no se toca con esto.
 */
function decodeEntities(texto: string): string {
  return texto
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&colon;/gi, ':')
    .replace(/&sol;/gi, '/');
}

/**
 * ¿Es un enlace que sale del dominio del sitio?
 *
 * Se normaliza antes de comparar: el navegador ignora los espacios de los
 * extremos y convierte `//host/ruta` en una URL del protocolo actual, así que
 * las dos formas son externas aunque no empiecen por `http`.
 */
function isExternalHttpLink(urlCruda: string): boolean {
  const url = decodeEntities(urlCruda).trim();
  if (!url) return false;

  // `//amzn.to/x` es externa: el navegador le pone el protocolo de la página.
  if (url.startsWith('//')) return true;

  if (!/^https?:\/\//i.test(url)) return false;

  try {
    const host = new URL(url).hostname.replace(/^www\./, '').toLowerCase();
    const propio = new URL(siteConfig.url).hostname.replace(/^www\./, '').toLowerCase();
    return host !== propio;
  } catch {
    return false;
  }
}

/**
 * Fuerza `rel="sponsored nofollow noopener"` en todo enlace externo del
 * contenido.
 *
 * Los enlaces de afiliado del blog venían escritos a mano en `data/blog.json`
 * con `rel="noopener noreferrer"`: 18 enlaces dofollow a Amazon desde el
 * contenido editorial, que es justo el patrón por el que Google abre una acción
 * manual por link spam. Las fichas y las tarjetas sí lo hacían bien, así que la
 * incoherencia era además llamativa.
 *
 * Se reescribe el `rel` en vez de añadirlo porque los posts ya traen uno: si
 * solo se añadiese, acabarían con dos atributos `rel` y el navegador se quedaría
 * con el primero (el de origen).
 */
export function hardenExternalLinks(html: string): string {
  return html.replace(ANCHOR_TAG, (tag) => {
    const atributos = parseAttributes(tag);

    const href = atributos.find((a) => a.name.toLowerCase() === 'href');
    if (!href || !isExternalHttpLink(valorDeAtributo(href.raw))) return tag;

    // Se reconstruye la etiqueta sin el `rel` viejo. El resto de atributos se
    // conservan tal cual venían (incluido el `/` de cierre si lo hubiera).
    const conservados = atributos
      .filter((a) => a.name.toLowerCase() !== 'rel')
      .map((a) => a.raw);
    const autocierre = conservados.includes('/') ? ' /' : '';

    const resto = conservados.filter((raw) => raw !== '/');

    return `<a ${resto.join(' ')} rel="sponsored nofollow noopener"${autocierre}>`;
  });
}

/**
 * Sanea HTML que va a inyectarse con dangerouslySetInnerHTML.
 *
 * IMPORTANTE: esto es una *mitigación*, no un sanitizador completo. Quita los
 * vectores habituales (script/iframe/handlers/javascript:) para que el día que
 * las descripciones lleguen de las APIs de Amazon o AliExpress no entren sin
 * barrera. Si se conectan fuentes externas de verdad, hay que sustituirlo por
 * un sanitizador con allowlist (DOMPurify o similar).
 *
 * No se puede simplemente escapar el HTML: el contenido actual de productos y
 * blog ya viene como HTML (`<p>`, `<h2>`, `<strong>`), así que escaparlo
 * dejaría las descripciones a la vista como texto plano.
 */
export function sanitizeHtml(html: string): string {
  return hardenExternalLinks(
    html
      .replace(DANGEROUS_TAGS, '')
      .replace(DANGEROUS_SELF_CLOSING, '')
      .replace(INLINE_EVENT_HANDLERS, '')
      .replace(DANGEROUS_URL_ATTRS, '$1="#"')
  );
}

/**
 * Devuelve la URL solo si es http(s); si no, el fallback.
 *
 * `new URL('javascript:alert(1)')` NO lanza, así que un `javascript:` colado
 * en el feed de afiliados llegaría intacto al href. Esto lo corta.
 */
export function safeUrl(url: string, fallback = '#'): string {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
      ? parsed.toString()
      : fallback;
  } catch {
    return fallback;
  }
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

/** ¿El texto ya viene como HTML en bloque, en vez de markdown? */
const YA_ES_HTML = /<(p|h[1-6]|ul|ol|div|table|section|article|blockquote|figure|img|br)\b[^>]*>/i;

/**
 * Convierte markdown básico a HTML y lo sanea.
 *
 * La mayoría de las descripciones ya son HTML (`<p>`, `<h2>`, `<ul>`), y encima
 * en una sola línea. Eso rompía la conversión: la regla que envuelve cada línea
 * suelta en un `<p>` no veía un inicio de `<h1-6` ni de `<li>`, así que envolvía
 * el documento ENTERO, y el HTML servido empezaba literalmente con
 * `<p class="mb-3"><p>¿Quieres marcha en tu relación…`. Eso son bloques `<p>`
 * anidados (inválidos: el navegador cierra el exterior a la primera) y una
 * jerarquía de encabezados rota, porque un `<h2>` acababa dentro de un `<p>`.
 *
 * Por eso ahora se decide primero qué es: si ya es HTML se sanea y se deja tal
 * cual, y la conversión de markdown se reserva para el texto plano.
 */
export function markdownToHtml(markdown: string): string {
  if (YA_ES_HTML.test(markdown)) {
    return sanitizeHtml(markdown);
  }

  return sanitizeHtml(
    markdown
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
    .replace(/<p class="mb-3"><\/p>/g, '')
  );
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
