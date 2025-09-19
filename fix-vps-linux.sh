#!/bin/bash
# Script para solucionar el problema de directorio en VPS Linux

echo "=== SOLUCIONANDO PROBLEMA DE DIRECTORIO VPS ==="

echo "1. Verificando directorio actual..."
echo "Directorio actual: $(pwd)"

echo "2. Verificando si estamos en el directorio correcto..."
if [ -f "package.json" ]; then
    echo "✓ package.json encontrado en directorio actual"
else
    echo "✗ package.json NO encontrado. Buscando en subdirectorios..."
    
    # Buscar package.json en subdirectorios
    PACKAGE_JSON_PATH=$(find . -name "package.json" -type f | head -1)
    if [ -n "$PACKAGE_JSON_PATH" ]; then
        echo "✓ package.json encontrado en: $PACKAGE_JSON_PATH"
        PROJECT_DIR=$(dirname "$PACKAGE_JSON_PATH")
        echo "Cambiando al directorio del proyecto: $PROJECT_DIR"
        cd "$PROJECT_DIR"
    else
        echo "✗ No se encontró package.json en ningún subdirectorio"
        echo "Verifica que el proyecto esté clonado correctamente"
        exit 1
    fi
fi

echo "3. Verificando estructura del proyecto..."
if [ -d "src" ]; then echo "✓ Carpeta src encontrada"; else echo "✗ Carpeta src NO encontrada"; fi
if [ -f "next.config.js" ]; then echo "✓ next.config.js encontrado"; else echo "✗ next.config.js NO encontrado"; fi

echo "4. Limpiando instalación anterior..."
rm -rf node_modules package-lock.json .next

echo "5. Instalando dependencias desde el directorio correcto..."
export NODE_OPTIONS="--max-old-space-size=256"
npm install --production --no-optional --no-audit --no-fund

if [ $? -ne 0 ]; then
    echo "ERROR: npm install falló. Verifica la conexión a internet y permisos."
    exit 1
fi

echo "6. Construyendo aplicación..."
export NODE_OPTIONS="--max-old-space-size=256"
npm run build

if [ $? -eq 0 ]; then
    echo "✓ Build exitoso. Iniciando servidor..."
    export NODE_OPTIONS="--max-old-space-size=256"
    npm start
else
    echo "✗ Build falló. Revisa los errores arriba."
fi
