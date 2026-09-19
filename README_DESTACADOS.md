# ⭐ Gestión de Productos Destacados - MQM Web

Guía completa para gestionar la sección de productos destacados, incluyendo criterios de selección, configuración y mejores prácticas.

## 🎯 ¿Qué son los Productos Destacados?

Los productos destacados son una selección curada de los mejores productos disponibles, que aparecen en:
- **Sección especial** en la página principal
- **Página dedicada** `/destacados`
- **Badge especial** "⭐ Destacado" en las tarjetas
- **Prioridad visual** en el layout

## 📍 Cómo Marcar un Producto como Destacado

### En `data/products.json`

```json
{
  "id": "1",
  "slug": "producto-increible",
  "title": "Producto Increíble",
  "isFeatured": true,  // ← Cambiar a true para destacar
  // ... resto de campos
}
```

### Proceso Paso a Paso

1. **Abrir** `data/products.json`
2. **Buscar** el producto por ID o título
3. **Cambiar** `"isFeatured": false` → `"isFeatured": true`
4. **Guardar** el archivo
5. **Verificar** que aparece en `/destacados`

## ❌ Cómo Quitar un Producto Destacado

```json
{
  "id": "1",
  "isFeatured": false,  // ← Cambiar a false para quitar
  // ... resto de campos
}
```

**⚠️ Importante:** Siempre incluir el campo `isFeatured` (true o false), nunca omitirlo.

## 📊 Dónde Aparecen los Destacados

### 1. Página Principal (Home)

**Ubicación:** Después del hero, antes de todos los productos
**Cantidad mostrada:** 2 productos destacados
**Layout:** Grid de 2 columnas en desktop, 1 en mobile

```typescript
// Código: src/app/page.tsx
const featuredProducts = getFeaturedProducts().slice(0, 2);
```

### 2. Página Dedicada `/destacados`

**Ubicación:** Página completa accesible desde menú
**Cantidad mostrada:** Todos los productos destacados
**Paginación:** Sí (24 productos por página, `siteConfig.pagination.productsPerPage`)
**URL:** `https://tu-dominio.com/destacados`

### 3. Badge Visual

**Aparece en:**
- Tarjetas de producto en listas
- Página individual del producto
- Resultados de búsqueda

**Diseño:**
```html
<span class="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
  ⭐ Destacado
</span>
```

## 🎖️ Criterios de Selección

### ✅ Productos Ideales para Destacar

1. **Calidad Premium**
   - Marcas reconocidas
   - Buenas valoraciones
   - Materiales de calidad

2. **Ofertas Excepcionales**
   - Descuentos superiores al 30%
   - Precio por debajo del mercado
   - Ofertas por tiempo limitado

3. **Productos Trending**
   - Viral en redes sociales
   - Mencionados en medios
   - Búsquedas en alza

4. **Utilidad Comprobada**
   - Resuelve problemas reales
   - Múltiples casos de uso
   - Recomendaciones de usuarios

5. **Comisión Atractiva**
   - Buenos márgenes de afiliación
   - Programas de partner preferente
   - Tasas de conversión altas

### ❌ Productos a Evitar como Destacados

- Productos sin stock frecuente
- Ofertas que han expirado
- Artículos con malas reseñas
- Precios inflados artificialmente
- Productos de nicho muy específico

## 📈 Cuántos Productos Destacar

### Recomendaciones por Sección

| Ubicación | Cantidad Recomendada | Cantidad Máxima |
|-----------|---------------------|-----------------|
| Home (Hero) | 2-3 productos | 5 productos |
| Página Destacados | 6-12 productos | 20 productos |
| **Total General** | **8-15 productos** | **25 productos** |

### ⚠️ Por Qué No Destacar Demasiados

- **Dilución del valor:** Si todo es destacado, nada es destacado
- **Saturación visual:** Demasiados badges confunden
- **Decisión paralysis:** Muchas opciones abruman al usuario
- **Pérdida de exclusividad:** Los destacados pierden su atractivo

## 🔄 Rotación de Productos Destacados

### Frecuencia Recomendada

- **Semanal:** Para productos trending y ofertas temporales
- **Quincenal:** Para productos estacionales
- **Mensual:** Para productos de calidad premium

### Estrategia de Rotación

```json
// Semana 1: Enfoque en gaming
"isFeatured": true → productos de gaming y tech

// Semana 2: Enfoque en hogar
"isFeatured": true → productos de hogar y lifestyle

// Semana 3: Enfoque en fitness
"isFeatured": true → productos deportivos y wellness

// Semana 4: Mix de lo más popular
"isFeatured": true → productos con mejor rendimiento
```

## 📝 Proceso de Actualización

### Checklist Semanal

- [ ] **Revisar rendimiento** de productos destacados actuales
- [ ] **Verificar disponibilidad** y precios en merchant
- [ ] **Comprobar ofertas** que expiran pronto
- [ ] **Analizar tendencias** y productos virales
- [ ] **Actualizar selección** basada en datos
- [ ] **Probar enlaces** de afiliación
- [ ] **Verificar imágenes** y contenido

### Template de Análisis

```markdown
## Análisis Semanal - [Fecha]

### Productos Destacados Actuales:
1. [Producto A] - CTR: X% - Conversiones: X
2. [Producto B] - CTR: X% - Conversiones: X
3. [Producto C] - CTR: X% - Conversiones: X

### Acciones a Tomar:
- [ ] Mantener: [Productos con buen rendimiento]
- [ ] Rotar: [Productos con bajo rendimiento]
- [ ] Añadir: [Nuevos productos candidatos]

### Próxima Revisión: [Fecha]
```

## 🎨 Personalización Visual

### Badge de Destacado

Personalizar en `src/components/ProductCard.tsx`:

```typescript
// Badge actual
<span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
  ⭐ Destacado
</span>

// Variaciones posibles
<span className="bg-yellow-400 text-yellow-900">🏆 Premium</span>
<span className="bg-red-500 text-white">🔥 Hot Deal</span>
<span className="bg-green-500 text-white">💎 Editor's Pick</span>
```

### Cinta de Destacado

Para un look más premium:

```css
.featured-ribbon {
  position: absolute;
  top: 10px;
  right: -5px;
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  color: white;
  padding: 5px 15px;
  font-size: 12px;
  font-weight: bold;
  transform: rotate(10deg);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
```

## 📊 Analytics y Métricas

### KPIs a Monitorear

1. **Click-Through Rate (CTR)**
   - Meta: >5% para destacados vs 2-3% para normales
   - Cálculo: (Clics / Impresiones) × 100

2. **Tasa de Conversión**
   - Meta: >3% para destacados
   - Cálculo: (Compras / Clics) × 100

3. **Revenue por Producto**
   - Comisiones generadas por cada destacado
   - Comparar con productos normales

4. **Tiempo en Página**
   - Productos destacados deberían generar más engagement
   - Meta: +30% vs productos normales

### Tracking en Google Analytics

```javascript
// Evento para clic en destacado
gtag('event', 'featured_product_click', {
  'product_id': productId,
  'product_title': productTitle,
  'source': 'home_featured' // o 'featured_page'
});

// Evento para conversión de destacado
gtag('event', 'featured_product_conversion', {
  'product_id': productId,
  'commission_value': commissionAmount
});
```

## 🔧 Automatización

### Script para Identificar Candidatos

```javascript
// Buscar productos con alto CTR que no son destacados
const potentialFeatured = products.filter(product => 
  !product.isFeatured && 
  product.analytics.ctr > 4 &&
  product.analytics.conversions > 10
);

console.log('Candidatos para destacar:', potentialFeatured);
```

### Rotación Automática por Rendimiento

```javascript
// Pseudocódigo para rotación automática
function autoRotateFeatured() {
  const currentFeatured = products.filter(p => p.isFeatured);
  const lowPerformers = currentFeatured.filter(p => p.analytics.ctr < 2);
  const highPerformers = products.filter(p => 
    !p.isFeatured && p.analytics.ctr > 4
  );
  
  // Intercambiar bajo rendimiento por alto rendimiento
  lowPerformers.forEach(product => product.isFeatured = false);
  highPerformers.slice(0, lowPerformers.length)
    .forEach(product => product.isFeatured = true);
}
```

## 🚨 Problemas Comunes y Soluciones

### 1. Productos Destacados No Aparecen

**Síntomas:**
- Badge no se muestra
- No aparecen en página destacados

**Soluciones:**
```json
// Verificar campo exacto
"isFeatured": true  // ✅ Correcto
"isfeatured": true  // ❌ Incorrecto
"featured": true    // ❌ Incorrecto
```

### 2. Demasiados Productos Destacados

**Síntomas:**
- Página destacados muy larga
- Pérdida de exclusividad

**Solución:**
```bash
# Contar destacados actuales
grep -o '"isFeatured": true' data/products.json | wc -l

# Debería ser < 15
```

### 3. Productos Destacados Obsoletos

**Síntomas:**
- Enlaces rotos
- Precios desactualizados
- Productos agotados

**Solución:**
- Revisión semanal obligatoria
- Monitoring automático de enlaces
- Alertas de cambios de precio

## 💡 Estrategias Avanzadas

### 1. Destacados por Estacionalidad

```javascript
// Ejemplo: Destacados navideños
const isChristmasSeason = month >= 11 || month <= 1;
const christmasProducts = products.filter(p => 
  p.tags.includes('navidad') || 
  p.tags.includes('regalo')
);

if (isChristmasSeason) {
  christmasProducts.forEach(p => p.isFeatured = true);
}
```

### 2. A/B Testing de Destacados

```javascript
// Test: productos gaming vs lifestyle
const userGroup = Math.random() > 0.5 ? 'gaming' : 'lifestyle';
const featuredCategory = userGroup === 'gaming' ? 'viciados' : 'facheritos';

const featured = products.filter(p => 
  p.categories.includes(featuredCategory)
).slice(0, 3);
```

### 3. Personalización por Usuario

```javascript
// Destacar basado en historial de navegación
const userInterests = getUserInterests(); // ['gaming', 'tech']
const personalizedFeatured = products.filter(p =>
  p.categories.some(cat => userInterests.includes(cat))
);
```

## 📋 Checklist Final

### Antes de Destacar un Producto

- [ ] Producto tiene buena calidad/reputación
- [ ] Precio es competitivo/tiene oferta real
- [ ] Enlace de afiliación funciona correctamente
- [ ] Imagen es de alta calidad
- [ ] Descripción está completa y bien escrita
- [ ] Categorías asignadas son apropiadas
- [ ] No duplica productos similares ya destacados

### Mantenimiento Mensual

- [ ] Revisar rendimiento de todos los destacados
- [ ] Actualizar precios y disponibilidad
- [ ] Rotar productos con bajo rendimiento
- [ ] Añadir nuevos productos trending
- [ ] Verificar que no excede límite recomendado
- [ ] Comprobar balance entre categorías
- [ ] Actualizar imágenes si es necesario

---

**¿Necesitas ayuda?** Consulta otros README o abre un issue en GitHub.









