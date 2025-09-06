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

## 📝 Notas Importantes

1. **SIEMPRE trabajar desde la carpeta `Mierdasqmolan` para GitHub**
2. **Verificar que los caracteres españoles (ñ, ¿, acentos) se vean correctamente**
3. **Las imágenes deben estar en ambas carpetas `public/images/`**
4. **El archivo `products.json` debe estar sincronizado entre ambas carpetas**
5. **Hacer push desde `Mierdasqmolan` para que se actualice el VPS**

## 🚨 Errores Comunes

- **Error de codificación**: Usar conversión UTF-8
- **Productos faltantes**: Verificar sincronización entre carpetas
- **Imágenes no visibles**: Verificar que estén en ambas carpetas `public/images/`
- **Push fallido**: Asegurarse de estar en la carpeta `Mierdasqmolan`

---
**Última actualización**: 23 de enero de 2024
**Total productos**: 56
**Commit hash**: 6c8f91a
