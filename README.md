# MQM Web - Plataforma de Ofertas y Productos de Afiliación

Una plataforma web moderna y rápida para mostrar ofertas y productos de afiliación, construida con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características

- **Feed dinámico** tipo Chollómetro con tarjetas expandibles
- **Categorías personalizadas** para diferentes tipos de usuarios
- **SEO optimizado** con structured data y meta tags
- **Rendimiento excepcional** optimizado para Core Web Vitals
- **Sistema de publicidad** configurable y no intrusivo
- **Responsive design** mobile-first
- **Búsqueda en tiempo real** con resultados instantáneos

## 📦 Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Validación:** Zod
- **Optimización de imágenes:** next/image
- **Análisis:** Google Analytics 4 (configurable)

## 🛠️ Instalación

1. **Clona el repositorio:**
```bash
git clone https://github.com/tu-usuario/mqm-web.git
cd mqm-web
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Configura las variables de entorno:**
```bash
cp .env.example .env.local
```

4. **Inicia el servidor de desarrollo:**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter ESLint
npm run format       # Formateador Prettier
npm run type-check   # Verificación de tipos TypeScript
```

## 🏗️ Estructura del Proyecto

```
mqm-web/
├── src/
│   ├── app/                 # Páginas (App Router)
│   │   ├── categoria/       # Páginas de categorías
│   │   ├── producto/        # Páginas de productos
│   │   ├── destacados/      # Productos destacados
│   │   └── legal/           # Páginas legales
│   ├── components/          # Componentes React
│   ├── lib/                 # Utilidades y funciones
│   ├── types/               # Tipos TypeScript
│   └── config/              # Configuración del sitio
├── data/                    # Datos JSON
├── public/                  # Archivos estáticos
└── docs/                    # README específicos
```

## 🎨 Personalización

### Cambiar el Hero Image

Reemplaza `/public/hero.jpg` con tu imagen personalizada:
- **Formato:** JPG o WebP
- **Dimensiones:** 1920x1080px (16:9) recomendado
- **Tamaño:** < 500KB para mejor rendimiento

### Configurar Colores y Tema

Edita `tailwind.config.ts` para personalizar:
- Colores primarios y secundarios
- Fuentes tipográficas
- Espaciados y breakpoints

### Logo y Branding

1. Reemplaza los archivos en `/public/`:
   - `favicon.ico`
   - `apple-touch-icon.png`
   - `favicon-32x32.png`
   - `favicon-16x16.png`

2. Actualiza el componente `Header` con tu logo

## 📈 Activar Analytics

### Google Analytics 4

1. Edita `src/config/site.ts`:
```typescript
analytics: {
  googleAnalyticsId: 'G-XXXXXXXXXX', // Tu GA4 ID
}
```

2. El script se cargará automáticamente

### Matomo (Alternativa)

1. Configura en `src/config/site.ts`:
```typescript
analytics: {
  matomoUrl: 'https://tu-instancia.matomo.cloud',
  matomoSiteId: '1',
}
```

## 💰 Configurar Publicidad

### Google AdSense

1. **Activa la publicidad** en `src/config/site.ts`:
```typescript
ads: {
  enabled: true,
  heroUnderFrequency: 1,
  inlineFrequency: 3,
  sidebarEnabled: true,
}
```

2. **Añade tu Publisher ID** en `src/components/AdSlot.tsx`

3. **Actualiza ads.txt** en `/public/ads.txt` con tus datos reales

### Posiciones de Anuncios

- **Hero-under:** Debajo del banner principal
- **Inline:** Entre tarjetas de productos (cada N productos)
- **Sidebar-sticky:** Lateral fijo en desktop
- **Footer:** Antes del pie de página

## 🚀 Despliegue

### Vercel (Recomendado)

1. **Conecta tu repositorio** en [vercel.com](https://vercel.com)
2. **Configura variables de entorno** en el dashboard
3. **Deploy automático** en cada push a main

### Otros Proveedores

La aplicación es compatible con:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Railway
- Render

## ⚡ Optimización de Rendimiento

### Buenas Prácticas Implementadas

- **Static Generation** para páginas de productos
- **Image Optimization** con next/image
- **Lazy Loading** de imágenes y anuncios
- **Code Splitting** automático
- **Prefetch** de enlaces importantes
- **Compresión gzip/brotli**

### Métricas Core Web Vitals

Objetivo: **90+ en Lighthouse**
- ✅ LCP (Largest Contentful Paint) < 2.5s
- ✅ FID (First Input Delay) < 100ms
- ✅ CLS (Cumulative Layout Shift) < 0.1

### Monitoreo

Usa herramientas como:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Vercel Analytics

## 🔧 Solución de Problemas

### Errores Comunes

1. **Imágenes no se cargan:**
   - Verifica que existan en `/public/images/`
   - Comprueba los nombres en `data/products.json`

2. **Build falla:**
   - Ejecuta `npm run type-check`
   - Verifica sintaxis en archivos JSON

3. **Estilos no aplican:**
   - Reinicia el servidor de desarrollo
   - Verifica clases Tailwind CSS

### Performance Issues

1. **Carga lenta:**
   - Optimiza imágenes (< 200KB)
   - Reduce datos en JSON
   - Activa compresión en servidor

2. **Anuncios bloquean render:**
   - Usa lazy loading
   - Carga scripts asíncronos
   - Implementa IntersectionObserver

## 📚 Documentación Adicional

- [README_PRODUCTOS.md](./README_PRODUCTOS.md) - Gestión de productos
- [README_CATEGORIAS.md](./README_CATEGORIAS.md) - Configuración de categorías
- [README_DESTACADOS.md](./README_DESTACADOS.md) - Productos destacados
- [README_PUBLICIDAD.md](./README_PUBLICIDAD.md) - Configuración de anuncios

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 💬 Soporte

¿Necesitas ayuda? Abre un [issue](https://github.com/tu-usuario/mqm-web/issues) en GitHub.

---

**Hecho con ❤️ por el equipo MQM Web**









