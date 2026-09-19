# Changelog

Todos los cambios notables en el proyecto MQM Web serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Sin publicar]

### Corregido (SEO)

- **Paginación rastreable.** La paginación eran `<button onClick>` y no existía
  una URL por página, así que las páginas 2+ de cada categoría eran invisibles
  para los rastreadores: solo 72 de las 420 fichas recibían algún enlace interno
  (348 no tenían ninguno). Ahora se pagina en el servidor con
  `?page=N` y enlaces reales, con canónica autorreferencial por página y 404 en
  las páginas fuera de rango. Medido con `npm run seo:crawl`: **420 de 420**.
- **Precio invisible en el structured data.** El JSON-LD de producto declaraba
  `offers.price` mientras el hueco del precio está oculto (`formatPrice`
  devuelve cadena vacía). Marcar contenido que no se ve es motivo de acción
  manual. Se ha quitado, junto con el `brand: "Amazon"` (era el vendedor, no el
  fabricante) y la imagen relativa. El bloque inline duplicado de la ficha se ha
  consolidado en `lib/seo.ts`.
- **Enlaces de afiliado sin calificar.** Los 18 enlaces a Amazon del blog salían
  como dofollow porque el `rel` venía escrito a mano en `data/blog.json`.
  `sanitizeHtml` ahora reescribe el `rel` de todo enlace externo.
- **`lastmod` falso en 16 URLs del sitemap.** Portada, destacados, el listado del
  blog, las 4 legales y las 9 categorías llevaban la hora del build en cada
  despliegue. Ahora cada una usa una fecha real de su contenido.
  En la página de afiliados, "Última actualización" también anunciaba la fecha
  del build; pasa a ser `LEGAL_LAST_UPDATED`.
- **Meta descriptions sin recortar.** 395 de 420 fichas pasaban de 160
  caracteres (hasta 619) y Google las cortaba por donde quería.
- **HTML inválido en 384 de 420 descripciones.** `markdownToHtml` envolvía en
  `<p>` un contenido que ya era HTML, generando párrafos anidados y rompiendo la
  jerarquía de encabezados.
- **Open Graph.** Las fichas y los artículos no emitían `og:url` (Next descarta
  el del layout al definir uno propio) y las legales heredaban el de la portada.
- **Artículos sin `BlogPosting` ni `BreadcrumbList`**, y la portada sin
  `ItemList`, pese a listar productos.
- **Marca partida.** La web decía "MQM Web" y el structured data "Mierdas que
  molan". Unificado en "Mierdas que molan".
- **Canibalización** entre la portada y `/categoria/regalos-para-pasarlo-bien`:
  ambas competían por la misma consulta.

### Rendimiento

- **El catálogo ya no se serializa entero.** `ProductCard` recibe solo los campos
  que pinta (`lib/card-data.ts`) y la descripción se pide bajo demanda a
  `/api/producto/[slug]` al desplegar la tarjeta. Una categoría pasa de 578 KB
  (172 KB gzip) a 27 KB gzip.
- **El catálogo ya no se descarga en el navegador.** La portada y el buscador
  usaban `import('@/lib/data')` para filtrar en cliente: un chunk de 1,63 MB de
  JavaScript que se bajaba la primera vez que alguien tecleaba en el buscador del
  header (o sea, en cualquier página) o pasaba de página en la portada. Ahora
  tiran de `/api/productos`, que devuelve la página ya recortada en JSON. En el
  bundle de cliente no queda ningún chunk de más de 500 KB.
- El listado del blog deja de ser componente de cliente: los 44 KB de
  `data/blog.json` ya no viajan al navegador.
- Fuera la fuente `Inter`, que se descargaba en todas las páginas sin aplicarse
  a ningún elemento.
- Sin `console.log` por petición en el servidor.
- El header global de caché ya no se aplica a `/api/*`, que declara la suya: las
  respuestas de la API salían con dos cabeceras `cache-control` y los
  intermediarios se quedaban con la primera, perdiendo el `s-maxage`.

### Arreglado (revisión posterior)

- El `onKeyDown` de la tarjeta escuchaba el keydown burbujeado de los hijos:
  con teclado, Enter sobre "Comprar" no abría el afiliado sino la ficha, y Enter
  sobre "Ver más" no desplegaba. El `role="button"` del `<article>`, además,
  marcaba todo su contenido como presentacional y ocultaba a los lectores de
  pantalla el título enlazado, los chips y el botón.
- `hardenExternalLinks` no veía como externos `//host/ruta`, un `href` con
  espacios delante ni `&#104;ttps://…` (que el navegador decodifica). Los tres se
  quedaban dofollow.
- Ese mismo reescrito partía la etiqueta si el valor de otro atributo contenía
  ` rel=`: ahora se trocean los atributos respetando las comillas.
- 49 de 420 productos repiten etiquetas en el JSON y se pintaban con
  `key={tag}`.
- El listado `/categoria/blog` no tenía metadatos propios: heredaba el `og:url`
  de la portada y no emitía canónica.
- El "Ver más" de los productos relacionados no hacía nada.
- Los `<` del JSON-LD no se escapaban.

### Añadido

- `npm run seo:crawl`: rastrea el sitio siguiendo solo enlaces y avisa si alguna
  ficha queda huérfana.
- Página 404 propia, con las categorías enlazadas.
- Tests de paginación, metadatos, structured data y enlaces de afiliado (112 en
  total).

## [1.0.0] - 2024-01-20

### Añadido

#### Core Features
- ✨ Sistema completo de productos con tarjetas expandibles inline
- 🔍 Búsqueda en tiempo real con autocompletado
- 🏷️ Sistema de categorías personalizadas (19 categorías únicas)
- ⭐ Sistema de productos destacados
- 📱 Diseño responsive mobile-first
- 🚀 Optimización para Core Web Vitals

#### Páginas Implementadas
- 🏠 Página principal con feed dinámico
- 📦 Páginas individuales de productos (`/producto/[slug]`)
- 🗂️ Páginas de categorías (`/categoria/[slug]`)
- ⭐ Página de productos destacados (`/destacados`)
- ⚖️ Página legal de afiliación (`/legal/afiliados`)

#### SEO y Performance
- 📊 Structured data (JSON-LD) para productos
- 🗺️ Sitemap XML automático
- 🤖 Robots.txt configurado
- 📈 Meta tags optimizados
- 🖼️ Optimización de imágenes con next/image
- ⚡ Lazy loading de imágenes y anuncios

#### Sistema de Publicidad
- 💰 AdSlots configurables en 4 posiciones
- 📱 Anuncios responsivos sin afectar CLS
- 🎯 Lazy loading con IntersectionObserver
- 📋 Preparado para Google AdSense
- 📊 Ads.txt configurado

#### Datos y Contenido
- 📦 14 productos de ejemplo con datos realistas
- 🏷️ 19 categorías temáticas (viral, random, facheritos, etc.)
- 🔗 Enlaces de afiliación con tracking UTM
- 📝 Contenido en Markdown para descripciones
- 🏷️ Sistema de tags para búsqueda

### Tecnologías

#### Frontend
- ⚛️ Next.js 14 con App Router
- 📘 TypeScript para tipado estático
- 🎨 Tailwind CSS para estilos
- 🖼️ next/image para optimización de imágenes
- ✅ Zod para validación de datos

#### Performance
- 🚀 Static Generation para páginas de productos
- ⚡ Code splitting automático
- 🔄 Prefetch de enlaces importantes
- 📱 Mobile-first responsive design
- 🎯 Core Web Vitals optimizados

#### Tooling
- 🔍 ESLint para linting
- 💅 Prettier para formateo
- 📦 npm scripts para desarrollo
- 🔧 TypeScript strict mode

### Documentación

#### README Completos
- 📖 README.md principal con setup completo
- 📦 README_PRODUCTOS.md para gestión de productos
- 🏷️ README_CATEGORIAS.md para configuración de categorías
- ⭐ README_DESTACADOS.md para productos destacados
- 💰 README_PUBLICIDAD.md para configuración de anuncios

#### Guías Incluidas
- 🚀 Instalación y configuración
- 📝 Gestión de contenido
- 🎨 Personalización visual
- 📊 Analytics y tracking
- 🔧 Troubleshooting

### Configuración

#### Archivos de Configuración
- ⚙️ `src/config/site.ts` - Configuración principal
- 🎨 `tailwind.config.ts` - Configuración de estilos
- 📦 `next.config.js` - Configuración de Next.js
- 📋 `tsconfig.json` - Configuración de TypeScript

#### Variables de Entorno
- 🔧 `env.example` con todas las variables necesarias
- 🔐 Configuración para Analytics opcional
- 💰 Setup para AdSense y afiliación
- 🌐 URLs configurables

### Estructura del Proyecto

```
mqm-web/
├── src/
│   ├── app/                 # Páginas (App Router)
│   ├── components/          # Componentes React
│   ├── lib/                 # Utilidades y funciones
│   ├── types/               # Tipos TypeScript
│   └── config/              # Configuración
├── data/                    # Datos JSON
├── public/                  # Archivos estáticos
└── docs/                    # README específicos
```

### Características Destacadas

#### UX/UI
- 🎴 Tarjetas expandibles con animaciones suaves
- 🔍 Búsqueda instantánea con dropdown
- 📱 Menú responsive con categorías
- 🎯 CTA claros para enlaces de afiliación
- ♿ Accesibilidad con ARIA labels

#### SEO Optimizado
- 📊 Structured data para productos
- 🗺️ Sitemap automático
- 📱 Open Graph y Twitter Cards
- 🎯 Meta descriptions optimizadas
- 🔗 URLs amigables

#### Performance
- ⚡ Lighthouse Score >90 objetivo
- 📱 Mobile-first approach
- 🖼️ Optimización automática de imágenes
- 🎯 Core Web Vitals optimizados
- 🚀 Carga diferida de recursos

---

**Notas de la versión:**
- Esta es la primera versión estable del proyecto
- Incluye todas las funcionalidades principales solicitadas
- Documentación completa para setup y mantenimiento
- Preparado para producción con optimizaciones de rendimiento









