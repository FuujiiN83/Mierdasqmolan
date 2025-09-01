# 🏷️ Gestión de Categorías - MQM Web

Guía completa para entender, configurar y gestionar las categorías de productos en MQM Web.

## 📍 Ubicación de la Configuración

Las categorías se configuran en: `src/config/site.ts`

## 🎯 Categorías Disponibles

### Lista Completa de Categorías

| Slug | Nombre | Descripción |
|------|--------|-------------|
| `ninos` | Niños | Productos para los más pequeños |
| `adultos` | Adultos | Para personas mayores de edad |
| `casados` | Casados | Para parejas casadas |
| `divorciados` | Divorciados | Para personas divorciadas |
| `dejados` | Dejados | Para personas abandonadas |
| `cinefilos` | Cinéfilos | Para amantes del cine |
| `rancios` | Rancios | Para los más clásicos |
| `adolescentes` | Adolescentes | Para jóvenes adolescentes |
| `deportistas` | Deportistas | Para amantes del deporte |
| `ratas` | Ratas | Para los más agarrados |
| `viciados` | Viciados | Para adictos a algo |
| `otakus` | Otakus | Para fans del anime y manga |
| `anti-fitness` | Anti Fitness | Para enemigos del gimnasio |
| `gym-bros` | Gym Bros | Para adictos al gimnasio |
| `ofendiditos` | Ofendiditos | Para los más sensibles |
| `ninos-rata` | Niños Rata | Para los más pequeños gamers |
| `random` | Random | Productos aleatorios y curiosos |
| `facheritos` | Facheritos | Para los más fashionistas |
| `viral` | Viral | Productos que están de moda |

## 🔧 Configuración en el Código

### Estructura en `src/config/site.ts`

```typescript
export const categoryConfig = {
  ninos: { 
    name: 'Niños', 
    description: 'Productos para los más pequeños' 
  },
  adultos: { 
    name: 'Adultos', 
    description: 'Para personas mayores de edad' 
  },
  // ... más categorías
} as const;

export type CategorySlug = keyof typeof categoryConfig;
```

## ➕ Cómo Asignar Categorías a Productos

### En `data/products.json`

```json
{
  "id": "1",
  "title": "Producto Ejemplo",
  "categories": ["viral", "random", "facheritos"],
  // ... otros campos
}
```

### Reglas de Asignación

- **Mínimo 1 categoría** por producto
- **Máximo 5 categorías** recomendado
- Usa **slugs exactos** (verificar ortografía)
- Orden **no importa** en el array
- Categorías **más específicas primero**

### Ejemplos de Asignación Correcta

```json
// Producto gaming
"categories": ["viciados", "ninos-rata", "viral"]

// Producto fitness
"categories": ["deportistas", "gym-bros", "adultos"]

// Producto de moda
"categories": ["facheritos", "adolescentes", "viral"]

// Producto de hogar
"categories": ["casados", "adultos", "ratas"]

// Producto infantil
"categories": ["ninos", "random"]
```

## 🚀 Añadir Nueva Categoría

### 1. Modificar Configuración

Edita `src/config/site.ts`:

```typescript
export const categoryConfig = {
  // ... categorías existentes
  'nueva-categoria': { 
    name: 'Nueva Categoría', 
    description: 'Descripción de la nueva categoría' 
  },
} as const;
```

### 2. Reglas para Nuevos Slugs

```typescript
// ✅ CORRECTO
'nueva-categoria'     // Minúsculas y guiones
'tech-lovers'         // Palabras en inglés OK
'mas-de-40'          // Números OK

// ❌ INCORRECTO
'Nueva_Categoria'     // No usar mayúsculas ni guiones bajos
'tech lovers'         // No usar espacios
'más-de-40'          // No usar acentos
'nueva-categoría'     // No usar caracteres especiales
```

### 3. Actualizar Menús

El menú se actualiza automáticamente, pero puedes personalizar en:
- `src/components/CategoryMenu.tsx` (orden y visibilidad)
- `src/components/Footer.tsx` (categorías destacadas en footer)

### 4. Crear Página de Categoría

No necesitas crear páginas manualmente. El sistema usa:
- Ruta dinámica: `/categoria/[slug]`
- Archivo: `src/app/categoria/[slug]/page.tsx`

## 📊 Gestión de Categorías Populares

### En la Home Page

Las categorías más populares aparecen como chips. Se calculan automáticamente por:
1. **Número de productos** en cada categoría
2. **Ordenadas por popularidad** (más productos = más arriba)
3. **Máximo 6 categorías** en chips

### Personalizar Orden

Edita `src/components/CategoryMenu.tsx`:

```typescript
// Categorías fijas en orden específico
const featuredCategories = [
  'viral',
  'random', 
  'facheritos',
  'viciados',
  'otakus',
  'gym-bros'
];
```

## 🎨 Personalización Visual

### Iconos para Categorías

Añade iconos SVG en `src/components/CategoryMenu.tsx`:

```typescript
const categoryIcons = {
  viral: '🔥',
  random: '🎲',
  facheritos: '👗',
  viciados: '🎮',
  otakus: '🍜',
  'gym-bros': '💪',
  // ... más iconos
};
```

### Colores Personalizados

En `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      categories: {
        viral: '#ff6b6b',
        random: '#4ecdc4',
        facheritos: '#ffe66d',
        // ... más colores
      }
    }
  }
}
```

## 📱 Categorías en Mobile

### Menú Desplegable

En mobile, las categorías se muestran en un menú desplegable que:
- Muestra **todas las categorías**
- Se abre con animación
- Se cierra al seleccionar
- Incluye contador de productos

### Chips Responsivos

Los chips de categorías se adaptan:
- **Desktop:** 6-8 categorías visibles
- **Tablet:** 4-6 categorías
- **Mobile:** 3-4 categorías con scroll horizontal

## 🔍 SEO y Categorías

### URLs Amigables

Cada categoría genera:
- URL: `/categoria/slug-categoria`
- Título SEO: "Nombre Categoría - X productos | MQM Web"
- Meta description: Incluye descripción y número de productos

### Breadcrumbs

Sistema automático de breadcrumbs:
```
Inicio > Categoría > Producto
```

### Sitemap Automático

Las categorías con productos se incluyen automáticamente en:
- `sitemap.xml`
- Prioridad: 0.6
- Cambio: semanal

## 📈 Analytics por Categoría

### Tracking Automático

Si tienes Google Analytics configurado, se trackea:
- Visitas a páginas de categoría
- Clics en enlaces de categoría
- Productos más populares por categoría

### Eventos Personalizados

Añade tracking en `src/components/CategoryMenu.tsx`:

```typescript
const handleCategoryClick = (categorySlug: string) => {
  // Google Analytics
  gtag('event', 'category_click', {
    category_slug: categorySlug,
    category_name: categoryConfig[categorySlug]?.name
  });
};
```

## 🧹 Mantenimiento de Categorías

### Eliminar Categoría

**⚠️ CUIDADO:** Antes de eliminar:

1. **Busca productos** que usen la categoría:
```bash
grep -r "categoria-a-eliminar" data/products.json
```

2. **Reasigna productos** a otras categorías
3. **Elimina de configuración**
4. **Verifica que no hay errores**

### Renombrar Categoría

Para cambiar solo el nombre visible (no el slug):

```typescript
// Antes
'gym-bros': { name: 'Gym Bros', description: '...' }

// Después
'gym-bros': { name: 'Gimnasio Bros', description: '...' }
```

Para cambiar el slug (⚠️ **rompe URLs existentes**):
1. Añadir nueva categoría
2. Migrar productos uno por uno
3. Configurar redirecciones
4. Eliminar categoría antigua

## 🏆 Mejores Prácticas

### Consistencia de Nombres

- **Plurales:** Usa singular ("Niño" no "Niños")
- **Jerga:** Mantén consistencia con el tono
- **Longitud:** Máximo 15 caracteres para el menú
- **Claridad:** Nombres autoexplicativos

### Organización Lógica

```typescript
// ✅ BUENA organización por tema
gaming: ['viciados', 'ninos-rata']
fitness: ['deportistas', 'gym-bros', 'anti-fitness'] 
lifestyle: ['facheritos', 'rancios', 'viral']
family: ['ninos', 'casados', 'divorciados']

// ❌ MALA organización aleatoria
random_mix: ['viciados', 'casados', 'anti-fitness']
```

### Balance de Productos

- **Evita categorías vacías** (sin productos)
- **No sobrecargues** categorías populares
- **Distribuye productos** equilibradamente
- **Máximo 20-30 productos** por categoría para navegación

## 🔧 Troubleshooting

### Errores Comunes

#### 1. Categoría no aparece en menú
```typescript
// Verifica que esté en categoryConfig
export const categoryConfig = {
  'mi-categoria': { name: 'Mi Categoría', description: '...' }
}
```

#### 2. Error "Categoría no encontrada"
```json
// Verifica slug exacto en products.json
"categories": ["mi-categoria"] // Debe coincidir exactamente
```

#### 3. Página de categoría vacía
- Verifica que hay productos asignados
- Revisa mayúsculas/minúsculas en slugs
- Confirma sintaxis JSON correcta

### Debug de Categorías

```javascript
// En navegador (DevTools)
console.log('Categorías disponibles:', categoryConfig);
console.log('Productos por categoría:', getAvailableCategories());
```

## 📝 Checklist para Nueva Categoría

- [ ] Slug sigue convenciones (minúsculas, guiones)
- [ ] Name es descriptivo y consistente
- [ ] Description explica claramente el propósito
- [ ] Al menos 3 productos asignados
- [ ] No duplica categorías existentes
- [ ] Funciona en mobile y desktop
- [ ] URLs generadas son correctas
- [ ] SEO metadata apropiado

---

**¿Necesitas ayuda?** Consulta otros README o abre un issue en GitHub.







