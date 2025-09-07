# README IMPORTANTE - Proceso de Añadir Productos y Sincronización

## ⚠️ INFORMACIÓN CRÍTICA

**LA CARPETA `Mierdasqmolan` ES LA QUE SE CONECTA CON GITHUB, NO LA CARPETA PRINCIPAL**

## 📋 Proceso Completo para Añadir Productos

### 1. Preparación de Imágenes
- Colocar la imagen del producto en: `MQM web/images/`
- La imagen debe estar en formato `.webp`
- Nombre de archivo: usar el nombre del producto (ej: "Que me estas container.webp")

### 2. Copiar Imágenes a Ubicaciones Correctas
```powershell
# Desde la carpeta MQM web
copy "images\[nombre-imagen].webp" "public\images\[nombre-imagen].webp"
copy "images\[nombre-imagen].webp" "Mierdasqmolan\public\images\[nombre-imagen].webp"
```

### 3. Añadir Producto al JSON
- **ARCHIVO PRINCIPAL**: `MQM web/data/products.json`
- **ARCHIVO SINCRONIZADO**: `Mierdasqmolan/data/products.json`

#### Estructura del Producto:
```json
{
  "id": "XX",
  "slug": "nombre-del-producto",
  "title": "Nombre del Producto",
  "shortDescription": "Descripción corta...",
  "description": "<p>Descripción completa con HTML...</p>",
  "image": "/images/nombre-imagen.webp",
  "alt": "Texto alternativo para SEO",
  "affiliateUrl": "https://amzn.to/XXXXX",
  "merchant": "Amazon",
  "price": XX.XX,
  "currency": "EUR",
  "categories": ["categoria1", "categoria2"],
  "isFeatured": false,
  "createdAt": "2024-01-23TXX:00:00Z",
  "tags": ["tag1", "tag2", "tag3"]
}
```

### 4. Sincronización Entre Carpetas
```powershell
# Copiar el archivo principal a Mierdasqmolan
copy "data\products.json" "Mierdasqmolan\data\products.json"
```

### 5. Arreglar Codificación UTF-8
```powershell
# Cambiar a la carpeta Mierdasqmolan
cd Mierdasqmolan

# Convertir a UTF-8
powershell -Command "Get-Content 'data\products.json' -Encoding Default | Out-File 'data\products_utf8.json' -Encoding UTF8"
copy "data\products_utf8.json" "data\products.json"
```

### 6. Commit y Push a GitHub
```powershell
# Desde la carpeta Mierdasqmolan
git add .
git commit -m "Añadir producto: [Nombre del Producto]"
git push
```

## 🔧 Solución de Problemas

### Problema: Caracteres UTF-8 no se ven correctamente
**Solución**: Usar el proceso de conversión UTF-8 del paso 5

### Problema: Productos no aparecen en la web
**Verificar**:
1. ¿Está el producto en `Mierdasqmolan/data/products.json`?
2. ¿Está la imagen en `Mierdasqmolan/public/images/`?
3. ¿Se hizo push desde la carpeta `Mierdasqmolan`?

### Problema: Error "ENOENT: no such file or directory"
**Solución**: El archivo `data/products.json` no existe en la carpeta principal
```powershell
# Restaurar desde Mierdasqmolan
copy "Mierdasqmolan\data\products.json" "data\products.json"
```

## 📁 Estructura de Carpetas Importante

```
MQM web/                    # Carpeta principal (desarrollo local)
├── data/
│   └── products.json       # Archivo principal
├── images/                 # Imágenes fuente
├── public/images/          # Imágenes para web local
└── Mierdasqmolan/          # Carpeta que se conecta con GitHub
    ├── data/
    │   └── products.json   # Archivo sincronizado
    └── public/images/      # Imágenes para GitHub/VPS
```

## ⚡ Comandos Rápidos

### Añadir un producto completo:
```powershell
# 1. Copiar imagen
copy "images\[imagen].webp" "public\images\[imagen].webp"
copy "images\[imagen].webp" "Mierdasqmolan\public\images\[imagen].webp"

# 2. Editar JSON (añadir producto manualmente)

# 3. Sincronizar
copy "data\products.json" "Mierdasqmolan\data\products.json"

# 4. Arreglar UTF-8
cd Mierdasqmolan
powershell -Command "Get-Content 'data\products.json' -Encoding Default | Out-File 'data\products_utf8.json' -Encoding UTF8"
copy "data\products_utf8.json" "data\products.json"

# 5. Subir a GitHub
git add .
git commit -m "Añadir producto: [Nombre]"
git push
```

## 🎯 Productos Actuales (56 total)

### Productos Recientes Añadidos:
- **ID 50**: Cinta adhesiva WC (11,95€)
- **ID 51**: Mi cuaderno de cagadas (8,02€)
- **ID 52**: Cepillo y peine para calvos (4,13€)
- **ID 53**: El tonto del pueblo (19,95€)
- **ID 54**: Me la sopla (19,90€)
- **ID 55**: Que me estas container (19,95€)
- **ID 56**: Ambientador personalizado (9,00€)
- **ID 49**: Papel Higiénico con la Cara de Trump (8,95€)

## 📰 Artículos de Blog Actuales (2 total)

### Artículos Publicados:
- **ID 1**: "Tribuna RFEF - Nuestro Patrocinador" (3 min de lectura)
  - **Slug**: `tribuna-rfef-nuestro-patrocinador`
  - **Fecha**: 5 de septiembre de 2025
  - **Tags**: tribuna, rfef, futbol, patrocinador, blog, periodismo, deportes, informacion
  - **Imagen**: `/images/Tribuna.webp`

- **ID 2**: "¿Qué es Halloween?" (2 min de lectura)
  - **Slug**: `que-es-halloween`
  - **Fecha**: 7 de septiembre de 2025
  - **Tags**: halloween, disfraces, fiesta, diversion, maquillaje, accesorios, especial, blog, festividad, risas
  - **Imagen**: `/images/Halloween 1.webp`

## 📝 Notas Importantes

1. **SIEMPRE trabajar desde la carpeta `Mierdasqmolan` para GitHub**
2. **Verificar que los caracteres españoles (ñ, ¿, acentos) se vean correctamente**
3. **Las imágenes deben estar en ambas carpetas `public/images/`**
4. **El archivo `products.json` debe estar sincronizado entre ambas carpetas**
5. **Hacer push desde `Mierdasqmolan` para que se actualice el VPS**

## 📰 Proceso para Añadir Artículos de Blog

### 1. Preparación del Artículo
- Crear el contenido del artículo en formato HTML
- Preparar imagen destacada en formato `.webp`
- Definir tags, categoría y metadatos

### 2. Añadir Artículo al JSON
- **ARCHIVO PRINCIPAL**: `MQM web/data/blog.json`
- **ARCHIVO SINCRONIZADO**: `Mierdasqmolan/data/blog.json`

#### Estructura del Artículo:
```json
{
  "id": "XX",
  "slug": "titulo-del-articulo",
  "title": "Título del Artículo",
  "excerpt": "Resumen del artículo...",
  "content": "<p>Contenido completo con HTML...</p>",
  "featuredImage": "/images/imagen-destacada.webp",
  "alt": "Texto alternativo para SEO",
  "author": "MQM Web",
  "publishedAt": "2024-01-23TXX:00:00Z",
  "updatedAt": "2024-01-23TXX:00:00Z",
  "tags": ["tag1", "tag2", "tag3"],
  "category": "blog",
  "isPublished": true,
  "readTime": "X min"
}
```

### 3. Sincronización del Blog
```powershell
# Copiar el archivo principal a Mierdasqmolan
copy "data\blog.json" "Mierdasqmolan\data\blog.json"
```

### 4. Arreglar Codificación UTF-8 para Blog
```powershell
# Cambiar a la carpeta Mierdasqmolan
cd Mierdasqmolan

# Convertir a UTF-8
powershell -Command "Get-Content 'data\blog.json' -Encoding Default | Out-File 'data\blog_utf8.json' -Encoding UTF8"
copy "data\blog_utf8.json" "data\blog.json"
```

### 5. Import Correcto en el Código
- **Archivo**: `src/app/categoria/blog/page.tsx`
- **Import correcto**: `import blogData from '@/data/blog.json';`
- **NO usar**: `import blogData from '../../../data/blog.json';`

### 6. Commit y Push del Blog
```powershell
# Desde la carpeta Mierdasqmolan
git add .
git commit -m "Añadir artículo de blog: [Título del Artículo]"
git push
```

## 🚨 Errores Comunes

- **Error de codificación**: Usar conversión UTF-8
- **Productos faltantes**: Verificar sincronización entre carpetas
- **Imágenes no visibles**: Verificar que estén en ambas carpetas `public/images/`
- **Push fallido**: Asegurarse de estar en la carpeta `Mierdasqmolan`
- **Error "Module not found: Can't resolve './../../data/blog.json'"**: Usar import correcto `@/data/blog.json`
- **Blog no aparece**: Verificar que `blog.json` esté en ambas carpetas y sincronizado

---
**Última actualización**: 23 de enero de 2025
**Total productos**: 56
**Total artículos de blog**: 2
**Commit hash**: c0819dd
**Último commit**: "Corregir import de blog.json y actualizar productos"

