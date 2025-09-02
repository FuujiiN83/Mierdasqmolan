# 📦 Gestión de Productos - MQM Web

Guía completa para añadir, editar y gestionar productos en la plataforma MQM Web.

## 📍 Ubicación de los Datos

Los productos se almacenan en: `data/products.json`

## 🏗️ Estructura de un Producto

```typescript
{
  "id": "string",                    // ✅ OBLIGATORIO - ID único
  "slug": "string",                  // ✅ OBLIGATORIO - URL amigable
  "title": "string",                 // ✅ OBLIGATORIO - Título del producto
  "shortDescription": "string",      // ✅ OBLIGATORIO - Descripción corta
  "description": "string",           // ✅ OBLIGATORIO - Descripción completa (Markdown)
  "image": "string",                 // ✅ OBLIGATORIO - Ruta de la imagen
  "affiliateUrl": "string",          // ✅ OBLIGATORIO - URL de afiliación
  "merchant": "string",              // ⚪ OPCIONAL - Tienda (Amazon, etc.)
  "price": 29.99,                    // ⚪ OPCIONAL - Precio numérico
  "currency": "EUR",                 // ⚪ OPCIONAL - Moneda (EUR/USD)
  "categories": ["categoria1"],      // ✅ OBLIGATORIO - Array de categorías
  "isFeatured": false,               // ✅ OBLIGATORIO - Si está destacado
  "createdAt": "2024-01-15T14:30:00Z", // ✅ OBLIGATORIO - Fecha ISO
  "updatedAt": "2024-01-16T10:00:00Z",  // ⚪ OPCIONAL - Fecha de actualización
  "tags": ["tag1", "tag2"]           // ⚪ OPCIONAL - Etiquetas para búsqueda
}
```

## ➕ Cómo Añadir un Producto Nuevo

### 1. Preparar la Imagen

```bash
# Coloca la imagen en public/images/
public/images/mi-producto.jpg

# Especificaciones recomendadas:
- Formato: JPG o WebP
- Dimensiones: 800x600px (4:3) mínimo
- Tamaño: < 200KB para mejor rendimiento
- Calidad: Alta resolución para zoom
```

### 2. Generar ID y Slug

```typescript
// ID: Número secuencial único
"id": "15"

// Slug: Versión URL-friendly del título
"slug": "producto-increible-oferta-especial"

// Reglas para el slug:
- Solo letras minúsculas, números y guiones
- Sin espacios, acentos o caracteres especiales
- Máximo 60 caracteres
- Descriptivo del producto
```

### 3. Ejemplo Completo

```json
{
  "id": "15",
  "slug": "auriculares-gaming-rgb-inalambricos",
  "title": "Auriculares Gaming RGB Inalámbricos Premium",
  "shortDescription": "Auriculares gaming de alta calidad con iluminación RGB, sonido 7.1 surround y batería de 50 horas.",
  "description": "# Auriculares Gaming RGB Premium\n\n**¡La experiencia gaming definitiva!** Estos auriculares están diseñados para gamers exigentes.\n\n## Características:\n- **Sonido 7.1 Surround** para inmersión total\n- **50 horas de batería** para sesiones largas\n- **RGB personalizable** con 16.7M colores\n- **Micrófono retráctil** con cancelación de ruido\n\n## Compatibilidad:\n- PC, PS5, Xbox Series X/S\n- Nintendo Switch\n- Móviles y tablets\n\n**¡Oferta limitada!** Ahorra 30€ en estos auriculares premium.",
  "image": "/images/auriculares-gaming-rgb.jpg",
  "affiliateUrl": "https://amazon.es/dp/B08EXAMPLE?tag=mqmweb-21",
  "merchant": "Amazon",
  "price": 79.99,
  "currency": "EUR",
  "categories": ["viciados", "ninos-rata", "viral"],
  "isFeatured": false,
  "createdAt": "2024-01-20T15:30:00Z",
  "tags": ["gaming", "audio", "rgb", "inalambrico", "bateria"]
}
```

## ✏️ Editar Productos Existentes

### 1. Actualizar Información

```json
{
  "id": "1", // ❌ NUNCA cambiar el ID
  "slug": "nuevo-slug", // ⚠️ Cambiar slug rompe URLs existentes
  "title": "Nuevo título actualizado",
  "shortDescription": "Nueva descripción más atractiva",
  "price": 59.99, // ✅ Actualizar precio cuando cambie
  "updatedAt": "2024-01-21T10:00:00Z", // ✅ Añadir fecha de actualización
  // ... resto de campos
}
```

### 2. Buenas Prácticas

- **Mantén el ID:** Nunca cambies el ID de un producto existente
- **URLs existentes:** Cambiar el slug rompe enlaces externos
- **Fecha de actualización:** Añade `updatedAt` cuando modifiques algo importante
- **Precio:** Actualiza cuando haya cambios de precio reales
- **Descripción:** Mantén el formato Markdown consistente

## 🏷️ Campos Detallados

### ID (Obligatorio)
```json
"id": "15"
```
- Debe ser único en todo el archivo
- Usa números secuenciales: "1", "2", "3"...
- Una vez asignado, nunca lo cambies

### Slug (Obligatorio)
```json
"slug": "producto-ejemplo-slug"
```
- URL amigable del producto
- Solo letras minúsculas, números y guiones
- Sin acentos ni caracteres especiales
- Ejemplo: `/producto/auriculares-gaming-rgb`

### Título (Obligatorio)
```json
"title": "Auriculares Gaming RGB Premium con Sonido 7.1"
```
- Máximo 80 caracteres para SEO
- Incluye palabras clave importantes
- Evita MAYÚSCULAS excesivas
- Sé descriptivo pero conciso

### Descripción Corta (Obligatorio)
```json
"shortDescription": "Auriculares gaming con sonido 7.1, RGB personalizable y 50h de batería."
```
- Máximo 160 caracteres
- Resume los beneficios principales
- Se usa en metadescriptions
- Evita repetir el título exacto

### Descripción Completa (Obligatorio)
Soporta **Markdown** para formato:

```markdown
# Título Principal

**Texto en negrita** para destacar beneficios.

## Características:
- Elemento de lista 1
- Elemento de lista 2
- Elemento de lista 3

### Especificaciones técnicas:
- Detalle técnico 1
- Detalle técnico 2

**¡Oferta especial!** Texto de llamada a la acción.
```

### Imagen (Obligatorio)
```json
"image": "/images/nombre-producto.jpg"
```
- Ruta relativa desde `/public/`
- Formatos: `.jpg`, `.png`, `.webp`
- Dimensiones mínimas: 800x600px
- Tamaño máximo: 200KB

### URL de Afiliación (Obligatorio)
```json
"affiliateUrl": "https://amazon.es/dp/B08EXAMPLE?tag=mqmweb-21"
```
- URL completa con tu tag de afiliado
- Se añadirán parámetros UTM automáticamente
- Verifica que funcione antes de publicar

### Merchant (Opcional)
```json
"merchant": "Amazon"
```
- Nombre de la tienda: "Amazon", "eBay", "AliExpress"
- Se muestra en la interfaz
- Ayuda a generar confianza

### Precio y Moneda (Opcional)
```json
"price": 79.99,
"currency": "EUR"
```
- Precio como número decimal
- Moneda: "EUR" o "USD"
- Si no hay precio, omite ambos campos

### Categorías (Obligatorio)
```json
"categories": ["viciados", "ninos-rata", "viral"]
```
- Array de slugs de categorías válidas
- Mínimo 1, máximo 5 recomendado
- Ver [README_CATEGORIAS.md](./README_CATEGORIAS.md)

### Destacado (Obligatorio)
```json
"isFeatured": true
```
- `true`: Aparece en sección destacados
- `false`: Producto normal
- Máximo 3-5 productos destacados recomendado

### Fechas (Obligatorio createdAt)
```json
"createdAt": "2024-01-20T15:30:00Z",
"updatedAt": "2024-01-21T10:00:00Z"
```
- Formato ISO 8601 con timezone UTC (Z)
- `createdAt`: Fecha de creación (obligatorio)
- `updatedAt`: Fecha de última modificación (opcional)

### Tags (Opcional)
```json
"tags": ["gaming", "audio", "rgb", "ofertas"]
```
- Array de strings para búsqueda
- Palabras clave relevantes
- Máximo 8 tags recomendado
- Ayudan en la función de búsqueda

## 🔍 Control de Calidad

### Validación Automática

El sistema valida automáticamente:
- ✅ Campos obligatorios presentes
- ✅ Formato de URL válido
- ✅ Formato de fecha correcto
- ✅ Categorías existentes
- ✅ Tipos de datos correctos

### Lista de Verificación Manual

Antes de publicar, verifica:
- [ ] La imagen se ve correctamente
- [ ] El enlace de afiliación funciona
- [ ] La descripción está bien formateada
- [ ] Las categorías son apropiadas
- [ ] El precio es actual
- [ ] No hay errores de ortografía

## 🗑️ Eliminar Productos

Para eliminar un producto:

1. **Busca el producto** por ID en `data/products.json`
2. **Elimina todo el objeto** incluyendo llaves `{}`
3. **Verifica la sintaxis JSON** (comas correctas)
4. **Mantén copia de seguridad** por si necesitas revertir

```json
// ANTES:
[
  { "id": "1", "title": "Producto A" },
  { "id": "2", "title": "Producto B" }, // <- Este será eliminado
  { "id": "3", "title": "Producto C" }
]

// DESPUÉS:
[
  { "id": "1", "title": "Producto A" },
  { "id": "3", "title": "Producto C" }
]
```

## 📊 Orden de los Productos

Los productos se muestran por **fecha de creación descendente** (más recientes primero).

Para cambiar el orden:
1. **Modifica `createdAt`** con una fecha más reciente
2. **Usa formato ISO:** `"2024-01-21T15:30:00Z"`
3. **Mantén coherencia** temporal

## 🚨 Errores Comunes

### 1. JSON Inválido
```json
// ❌ INCORRECTO - Coma extra
{
  "id": "1",
  "title": "Producto",
}

// ✅ CORRECTO
{
  "id": "1",
  "title": "Producto"
}
```

### 2. Categorías Inexistentes
```json
// ❌ INCORRECTO
"categories": ["categoria-inexistente"]

// ✅ CORRECTO (ver README_CATEGORIAS.md)
"categories": ["viral", "random"]
```

### 3. URLs Malformadas
```json
// ❌ INCORRECTO
"affiliateUrl": "amazon.es/producto"

// ✅ CORRECTO
"affiliateUrl": "https://amazon.es/dp/B08EXAMPLE?tag=mqmweb-21"
```

### 4. Fechas Incorrectas
```json
// ❌ INCORRECTO
"createdAt": "2024/01/20"

// ✅ CORRECTO
"createdAt": "2024-01-20T15:30:00Z"
```

## 🛠️ Herramientas Útiles

### Generadores de Slug
```javascript
// Función para generar slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Sin acentos
    .replace(/[^a-z0-9\s-]/g, '')    // Solo letras, números, espacios
    .trim()
    .replace(/\s+/g, '-')            // Espacios a guiones
    .replace(/-+/g, '-');            // Un solo guión
}
```

### Validadores JSON
- [jsonlint.com](https://jsonlint.com)
- [jsonformatter.org](https://jsonformatter.org)
- VSCode con extensión JSON

### Generadores de Fechas ISO
```javascript
// JavaScript
new Date().toISOString() // "2024-01-20T15:30:00.000Z"

// Online
// https://timestampgenerator.com
```

## 💡 Consejos de Optimización SEO

### Títulos Efectivos
- Incluye palabras clave principales
- Menciona beneficios específicos
- Usa números cuando sea relevante
- Evita duplicados exactos

### Descripciones que Venden
- Destaca el problema que resuelve
- Incluye beneficios específicos
- Usa llamadas a la acción
- Menciona ofertas o descuentos

### Tags Estratégicos
- Incluye sinónimos de palabras clave
- Añade términos de búsqueda populares
- Considera variaciones de escritura
- Incluye características únicas

---

**¿Necesitas ayuda?** Consulta otros README o abre un issue en GitHub.









