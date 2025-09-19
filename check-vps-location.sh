#!/bin/bash
# Script para verificar la ubicación del proyecto en VPS

echo "=== VERIFICACIÓN DE UBICACIÓN DEL PROYECTO ==="

echo "1. Directorio actual: $(pwd)"
echo "2. Usuario actual: $(whoami)"
echo "3. Contenido del directorio actual:"
ls -la

echo "4. Buscando package.json en el sistema:"
find / -name "package.json" 2>/dev/null | head -10

echo "5. Buscando archivos del proyecto:"
find / -name "next.config.js" 2>/dev/null | head -5
find / -name "src" -type d 2>/dev/null | head -5

echo "6. Verificando si hay un repositorio git:"
if [ -d ".git" ]; then
    echo "✓ Repositorio git encontrado"
    echo "Rama actual: $(git branch --show-current)"
    echo "Último commit: $(git log -1 --oneline)"
else
    echo "✗ No se encontró repositorio git en el directorio actual"
fi

echo "7. Verificando permisos:"
ls -la package.json 2>/dev/null || echo "package.json no encontrado en directorio actual"

echo "=== FIN DE VERIFICACIÓN ==="
