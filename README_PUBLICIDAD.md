# 💰 Gestión de Publicidad - MQM Web

Guía completa para configurar, optimizar y gestionar la publicidad en MQM Web sin comprometer la experiencia de usuario ni los Core Web Vitals.

## 🎯 Ubicaciones de Anuncios (AdSlots)

### Mapa de Posiciones

```
┌─────────────────────────────────────┐
│ Header + Navigation                 │
├─────────────────────────────────────┤
│ Hero Section                        │
├─────────────────────────────────────┤
│ [1] HERO-UNDER (Leaderboard)        │ ← 728x90 / Responsive
├─────────────────────────────────────┤
│ Featured Products                   │
├─────────────────────────────────────┤
│ Product 1                           │
│ Product 2                           │
│ Product 3                           │
├─────────────────────────────────────┤
│ [2] INLINE (Medium Rectangle)       │ ← 300x250 / Responsive
├─────────────────────────────────────┤
│ Product 4                           │
│ Product 5                           │
│ Product 6                           │
├─────────────────────────────────────┤
│ [3] INLINE (Medium Rectangle)       │
├─────────────────────────────────────┤
│ More Products...                    │
├─────────────────────────────────────┤
│ [4] FOOTER (Leaderboard)            │ ← 728x90 / Responsive
└─────────────────────────────────────┘

Desktop Sidebar:
┌─────────────┐
│ [5] SIDEBAR │ ← 300x600 / Sticky
│   (Sticky)  │
│             │
│   [Ad]      │
│             │
└─────────────┘
```

## ⚙️ Configuración Básica

### 1. Activar Publicidad

Edita `src/config/site.ts`:

```typescript
export const siteConfig = {
  // ... otras configuraciones
  ads: {
    enabled: true,                    // ← Cambiar a true
    heroUnderFrequency: 1,           // Cada cuántas páginas
    inlineFrequency: 3,              // Cada 3 productos
    sidebarEnabled: true,            // Sidebar en desktop
  },
}
```

### 2. Posiciones Disponibles

| Posición | Tamaño | Dispositivos | Comportamiento |
|----------|--------|--------------|----------------|
| `hero-under` | 728x90 / Responsive | Todos | Debajo del banner principal |
| `inline` | 300x250 / Responsive | Todos | Entre productos (cada N) |
| `sidebar-sticky` | 300x600 / 300x250 | Desktop solamente | Fijo lateral |
| `footer` | 728x90 / Responsive | Todos | Antes del footer |

### 3. Configuración de Frecuencia

```typescript
// En src/config/site.ts
ads: {
  heroUnderFrequency: 1,    // 1 = en todas las páginas
  inlineFrequency: 3,       // Cada 3 productos un anuncio
  sidebarEnabled: true,     // true = mostrar sidebar
}

// Ejemplos de frecuencia inline:
// 2 = Producto, Producto, [AD], Producto, Producto, [AD]
// 4 = Producto, Producto, Producto, Producto, [AD], ...
// 5 = Más espaciado entre anuncios
```

## 🚀 Google AdSense - Configuración Completa

### 1. Obtener Publisher ID

1. **Regístrate** en [Google AdSense](https://www.google.com/adsense/)
2. **Añade tu sitio** web para revisión
3. **Obtén tu Publisher ID** (ej: `ca-pub-1234567890123456`)

### 2. Configurar Publisher ID

Edita `src/components/AdSlot.tsx`:

```typescript
// Buscar esta línea (línea ~120 aproximadamente)
data-ad-client="ca-pub-XXXXXXXXXX" // ← Reemplazar con tu ID real

// Ejemplo:
data-ad-client="ca-pub-1234567890123456"
```

### 3. Crear Ad Units en AdSense

**En tu dashboard de AdSense:**

1. **Ads → Ad units → Create new ad unit**
2. **Selecciona "Display ads"**
3. **Configura según posición:**

| Posición | Nombre Sugerido | Tamaño AdSense |
|----------|-----------------|----------------|
| Hero-under | `MQM_Hero_Under_728x90` | Leaderboard (728x90) |
| Inline | `MQM_Inline_300x250` | Medium Rectangle (300x250) |
| Sidebar | `MQM_Sidebar_300x600` | Half Page (300x600) |
| Footer | `MQM_Footer_728x90` | Leaderboard (728x90) |

### 4. Insertar Ad Unit Codes

Para cada posición, reemplaza en `src/components/AdSlot.tsx`:

```typescript
export function AdSenseSlot({ 
  slot,           // ← Tu ad unit slot ID
  format = 'auto',
  responsive = true,
  className = '' 
}: {
  slot: string;    // ej: "1234567890"
  format?: string;
  responsive?: boolean;
  className?: string;
}) {
  // ... código existente
  
  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-TU-PUBLISHER-ID"  // ← Tu Publisher ID
        data-ad-slot={slot}                      // ← Slot específico
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}
```

### 5. Usar Ad Units Específicos

Crea componentes específicos:

```typescript
// src/components/ads/HeroUnderAd.tsx
export function HeroUnderAd() {
  return (
    <AdSenseSlot 
      slot="1234567890"        // ← Tu slot ID específico
      format="auto"
      className="my-8"
    />
  );
}

// src/components/ads/InlineAd.tsx
export function InlineAd() {
  return (
    <AdSenseSlot 
      slot="0987654321"        // ← Tu slot ID específico
      format="rectangle"
      className="my-6"
    />
  );
}
```

### 6. Actualizar ads.txt

Edita `/public/ads.txt`:

```txt
# Ads.txt para MQM Web
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0

# Reemplazar:
# pub-1234567890123456 ← Tu Publisher ID real
```

## 📊 Optimización para Core Web Vitals

### 1. Lazy Loading de Anuncios

**Ya implementado** en `src/components/AdSlot.tsx`:

```typescript
useEffect(() => {
  // Intersection Observer para carga diferida
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !adLoaded) {
          setIsVisible(true);
          loadAd(); // ← Solo carga cuando es visible
        }
      });
    },
    { threshold: 0.1 } // Carga cuando 10% es visible
  );
}, []);
```

### 2. Prevenir Layout Shift (CLS)

**Contenedores con tamaño fijo:**

```typescript
const getSizeClasses = () => {
  switch (size) {
    case 'leaderboard':
      return 'w-full h-20 sm:h-24';        // Reserva espacio
    case 'medium':
      return 'w-full h-32 sm:w-80 sm:h-64'; // 300x250 equiv
    case 'large':
      return 'w-full h-48 sm:w-96 sm:h-80'; // 300x600 equiv
  }
};
```

### 3. Carga Asíncrona de Scripts

En `src/app/layout.tsx`:

```typescript
{/* Scripts de AdSense cargados asíncronamente */}
<script
  async                                    // ← No bloquea rendering
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-TU-PUBLISHER-ID"
  crossOrigin="anonymous"
/>
```

### 4. Optimización de LCP

**Evitar anuncios above-the-fold:**
- Hero-under aparece DESPUÉS del hero principal
- No hay anuncios en el primer viewport
- Imágenes hero tienen prioridad

## 🎛️ Configuración Avanzada

### 1. Anuncios Responsivos Personalizados

```css
/* En src/app/globals.css */
.responsive-ad {
  width: 100%;
  height: 280px;
}

@media (min-width: 768px) {
  .responsive-ad {
    width: 728px;
    height: 90px;
  }
}

@media (min-width: 1024px) {
  .responsive-ad {
    width: 970px;
    height: 250px;
  }
}
```

### 2. Anuncios Condicionados por Categoría

```typescript
// src/components/ConditionalAd.tsx
export function ConditionalAd({ category }: { category: string }) {
  // Solo mostrar anuncios en ciertas categorías
  const showAd = ['viral', 'random', 'facheritos'].includes(category);
  
  if (!showAd) return null;
  
  return <AdSlot position="inline" size="medium" />;
}
```

### 3. A/B Testing de Posiciones

```typescript
// src/lib/adExperiments.ts
export function shouldShowSidebarAd(): boolean {
  // 50% de usuarios ven sidebar, 50% no
  return Math.random() > 0.5;
}

// En componente:
{shouldShowSidebarAd() && (
  <AdSlot position="sidebar-sticky" size="large" />
)}
```

### 4. Bloqueo de Anuncios por Categoría

```typescript
// src/config/site.ts
export const adBlockedCategories = [
  'ninos',          // Sin anuncios en contenido infantil
  'educativo'       // Sin anuncios en contenido educativo
];

// En AdSlot.tsx:
const category = getCurrentCategory();
if (adBlockedCategories.includes(category)) {
  return null;
}
```

## 📱 Anuncios en Mobile

### 1. Configuración Mobile-First

```typescript
// Anuncios optimizados para móvil
const mobileAdSizes = {
  banner: '320x50',      // Mobile banner
  square: '300x250',     // Mobile medium rectangle
  large: '320x480',      // Mobile interstitial
};
```

### 2. Desactivar Sidebar en Mobile

**Ya implementado** automáticamente:

```css
/* En Tailwind classes */
.sidebar-ad {
  @apply hidden lg:block;  /* Solo visible en desktop */
}
```

### 3. Anuncios Native Mobile

```typescript
// Anuncios que parecen contenido orgánico en mobile
export function NativeMobileAd({ product }: { product: Product }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 lg:hidden">
      <p className="text-xs text-blue-600 mb-2">Publicidad</p>
      <div className="flex items-center space-x-3">
        <img src={product.image} className="w-16 h-16 rounded" />
        <div>
          <h4 className="font-medium">{product.title}</h4>
          <p className="text-sm text-gray-600">{product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
```

## 📊 Monitoreo y Analytics

### 1. Métricas Clave a Monitorear

**En Google AdSense:**
- **RPM** (Revenue Per Mille): Ingresos por 1000 impresiones
- **CTR** (Click Through Rate): % de clics sobre impresiones
- **CPC** (Cost Per Click): Precio promedio por clic
- **Fill Rate**: % de requests que se llenan con anuncios

**Objetivos recomendados:**
- RPM: >$1.00
- CTR: 1-3%
- Fill Rate: >90%

### 2. Core Web Vitals con Anuncios

**Usar herramientas:**
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://webpagetest.org/)

**Objetivos con anuncios:**
- LCP: <2.5s (sin anuncios above-the-fold)
- FID: <100ms (scripts asíncronos)
- CLS: <0.1 (contenedores fijos)

### 3. Google Analytics + AdSense

```javascript
// Track ad performance
gtag('event', 'ad_impression', {
  'ad_position': 'hero-under',
  'ad_size': 'leaderboard'
});

gtag('event', 'ad_click', {
  'ad_position': 'inline',
  'product_context': productId
});
```

## 🚫 Políticas y Compliance

### 1. Google AdSense Policies

**Contenido permitido:**
- ✅ Reseñas de productos
- ✅ Comparativas
- ✅ Guías de compra
- ✅ Contenido de afiliación (declarado)

**Contenido prohibido:**
- ❌ Contenido para adultos
- ❌ Violencia o contenido peligroso
- ❌ Drogas o sustancias ilegales
- ❌ Clickbait engañoso

### 2. Declaración de Afiliación

**Ya implementado** en:
- Footer del sitio
- Página `/legal/afiliados`
- Disclaimer en productos

### 3. Cookies y Consentimiento

```typescript
// src/components/CookieConsent.tsx (implementar si es necesario)
export function CookieConsent() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <p className="text-sm">
          Usamos cookies para personalizar anuncios y analizar tráfico.
        </p>
        <button className="bg-primary-600 px-4 py-2 rounded text-sm">
          Aceptar
        </button>
      </div>
    </div>
  );
}
```

## 🛠️ Troubleshooting

### 1. Anuncios No Aparecen

**Checklist:**
- [ ] `ads.enabled: true` en configuración
- [ ] Publisher ID correcto
- [ ] Ad unit slots correctos
- [ ] ads.txt configurado
- [ ] Sitio aprobado en AdSense
- [ ] Sin bloqueadores de anuncios activos

**Debug:**
```javascript
// En consola del navegador
console.log('AdSense loaded:', !!window.adsbygoogle);
console.log('Ads config:', siteConfig.ads);
```

### 2. Penalización en Core Web Vitals

**Síntomas:**
- LCP >2.5s
- CLS >0.1
- Score Lighthouse <90

**Soluciones:**
1. Reducir frecuencia de anuncios inline
2. Usar lazy loading más agresivo
3. Contenedores de tamaño fijo
4. Mover anuncios below-the-fold

### 3. Baja Performance de Anuncios

**Análisis:**
```javascript
// Identificar anuncios con bajo rendimiento
const lowPerformingAds = adPositions.filter(ad => 
  ad.ctr < 1 || ad.rpm < 0.5
);

console.log('Optimizar estos anuncios:', lowPerformingAds);
```

**Optimizaciones:**
- Cambiar tamaños de anuncios
- Mover posiciones
- Probar formatos diferentes
- A/B test de colores/estilos

## 📈 Estrategias de Optimización

### 1. Estacional

```typescript
// Aumentar anuncios en temporadas altas
const isHighSeason = [11, 12, 1].includes(new Date().getMonth());
const adFrequency = isHighSeason ? 2 : 3; // Más anuncios en Black Friday/Navidad
```

### 2. Por Categoría

```typescript
// Más anuncios en categorías rentables
const adConfig = {
  'tech': { frequency: 2, sidebarEnabled: true },
  'hogar': { frequency: 3, sidebarEnabled: true },
  'ninos': { frequency: 5, sidebarEnabled: false }, // Menos anuncios
};
```

### 3. Geotargeting

```typescript
// Diferentes estrategias por país
const isSpain = getUserCountry() === 'ES';
const adDensity = isSpain ? 'high' : 'medium'; // Más anuncios en España
```

## 📋 Checklist de Implementación

### Configuración Inicial
- [ ] Cuenta AdSense creada y aprobada
- [ ] Publisher ID configurado
- [ ] ads.txt actualizado
- [ ] Ads activados en config
- [ ] Ad units creados en AdSense

### Testing
- [ ] Anuncios aparecen en todas las posiciones
- [ ] Responsive funciona correctamente
- [ ] Core Web Vitals >90 en Lighthouse
- [ ] No hay layout shifts
- [ ] Lazy loading funciona

### Optimización
- [ ] Analytics configurado
- [ ] Métricas baseline establecidas
- [ ] A/B tests planificados
- [ ] Review semanal configurada

### Compliance
- [ ] Política de privacidad actualizada
- [ ] Disclaimer de afiliación visible
- [ ] Consentimiento de cookies (si necesario)
- [ ] Contenido cumple políticas AdSense

---

**¿Necesitas ayuda?** Consulta otros README o abre un issue en GitHub.









