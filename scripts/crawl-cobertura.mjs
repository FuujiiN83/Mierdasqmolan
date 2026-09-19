/**
 * Rastrea el sitio como lo haría Googlebot (siguiendo solo <a href>) y mide
 * cuántas fichas quedan alcanzables por enlaces internos.
 *
 * Uso:  node scripts/crawl-cobertura.mjs [http://localhost:3111]
 *
 * Es la comprobación de la mejora A1: antes, las páginas 2+ de cada categoría
 * eran botones y no existían como URL, así que 348 de 420 fichas no recibían ni
 * un solo enlace interno. La referencia es el propio catálogo: si una ficha no
 * aparece en el rastreo, está huérfana.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const base = process.argv[2] || 'http://localhost:3111';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
// El JSON lleva BOM: JSON.parse no lo traga.
const crudo = readFileSync(join(raiz, 'data', 'products.json'), 'utf8').replace(/^﻿/, '');
const catalogo = JSON.parse(crudo);

const fichas = new Set();
const vistas = new Set();

async function html(ruta) {
  const res = await fetch(base + ruta);
  return res.ok ? res.text() : '';
}

const coincidencias = (texto, regex) => [...texto.matchAll(regex)].map((m) => m[1]);

const home = await html('/');
const categorias = [
  ...new Set(coincidencias(home, /href="(\/categoria\/[a-z0-9-]+)"/g)),
];

const pendientes = ['/', '/destacados', ...categorias];

while (pendientes.length) {
  const ruta = pendientes.shift();
  if (vistas.has(ruta)) continue;
  vistas.add(ruta);

  const contenido = await html(ruta);
  if (!contenido) continue;

  for (const ficha of coincidencias(contenido, /href="(\/producto\/[^"?#]+)"/g)) {
    fichas.add(ficha);
  }

  // Paginación de esa misma ruta: ?page=N es lo que ahora hace rastreables las
  // páginas 2+. La base se calcula quitando el propio ?page=, o desde la página
  // 5 se buscaría "…?page=5?page=6" y no se encontraría nada.
  const baseRuta = ruta.split('?')[0];
  const escapada = baseRuta.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regexPagina = new RegExp(`href="(${escapada}\\?page=\\d+)"`, 'g');
  for (const pagina of coincidencias(contenido, regexPagina)) {
    if (!vistas.has(pagina)) pendientes.push(pagina);
  }

  for (const categoria of coincidencias(contenido, /href="(\/categoria\/[a-z0-9-]+)"/g)) {
    if (!vistas.has(categoria)) pendientes.push(categoria);
  }
}

const productos = catalogo.filter((p) => !(p.categories || []).includes('blog'));
const huerfanos = productos.filter((p) => !fichas.has(`/producto/${p.slug}`));

if (process.env.VER_VISITADAS) {
  console.log([...vistas].sort().join('\n'));
}

console.log(`Páginas visitadas:                  ${vistas.size}`);
console.log(`Fichas alcanzadas por enlaces:      ${fichas.size} de ${productos.length}`);
console.log(`Huérfanas (solo en el sitemap):     ${huerfanos.length}`);

if (huerfanos.length > 0) {
  console.log('\nPrimeras huérfanas:');
  for (const p of huerfanos.slice(0, 15)) {
    console.log(`  ${p.slug} → categorías: ${JSON.stringify(p.categories)}`);
  }
  process.exitCode = 1;
}
