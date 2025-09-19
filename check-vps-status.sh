#!/bin/bash
# Script para verificar el estado del VPS

echo "=== ESTADO DEL VPS ==="

echo "1. Directorio actual: $(pwd)"
echo "2. Usuario: $(whoami)"
echo "3. Memoria disponible:"
free -h

echo "4. Espacio en disco:"
df -h

echo "5. Procesos de Node ejecutándose:"
ps aux | grep node | grep -v grep

echo "6. Puerto 3000:"
netstat -tlnp | grep :3000 || echo "Puerto 3000 libre"

echo "7. Archivos del proyecto:"
ls -la /opt/mqm-web/

echo "8. Dependencias instaladas:"
if [ -d "/opt/mqm-web/node_modules" ]; then
    echo "✓ node_modules existe"
    echo "Tamaño: $(du -sh /opt/mqm-web/node_modules | cut -f1)"
else
    echo "✗ node_modules NO existe"
fi

echo "9. Tailwindcss:"
if [ -f "/opt/mqm-web/node_modules/tailwindcss/package.json" ]; then
    echo "✓ tailwindcss instalado"
else
    echo "✗ tailwindcss NO instalado"
fi

echo "10. Componentes:"
if [ -f "/opt/mqm-web/src/components/ProductCard.tsx" ]; then
    echo "✓ ProductCard.tsx existe"
else
    echo "✗ ProductCard.tsx NO existe"
fi

if [ -f "/opt/mqm-web/src/components/AdSlot.tsx" ]; then
    echo "✓ AdSlot.tsx existe"
else
    echo "✗ AdSlot.tsx NO existe"
fi
