#!/bin/bash
# Script para solucionar errores específicos del VPS

echo "=== SOLUCIONANDO ERRORES DEL VPS ==="

# 1. Parar todos los procesos de Node que puedan estar usando el puerto 3000
echo "1. Parando procesos que usan el puerto 3000..."
pkill -f node
pkill -f next
sleep 2

# Verificar que el puerto esté libre
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "Puerto 3000 aún en uso. Forzando liberación..."
    fuser -k 3000/tcp
    sleep 2
fi

# 2. Ir al directorio del proyecto
cd /opt/mqm-web

# 3. Limpiar instalación anterior
echo "2. Limpiando instalación anterior..."
rm -rf node_modules package-lock.json .next

# 4. Instalar todas las dependencias (incluyendo devDependencies para el build)
echo "3. Instalando dependencias completas..."
export NODE_OPTIONS="--max-old-space-size=256"
npm install --no-audit --no-fund

# 5. Verificar que tailwindcss esté instalado
echo "4. Verificando tailwindcss..."
if npm list tailwindcss >/dev/null 2>&1; then
    echo "✓ tailwindcss instalado"
else
    echo "✗ tailwindcss no encontrado. Instalando..."
    npm install tailwindcss autoprefixer postcss --save-dev
fi

# 6. Verificar que los componentes existan
echo "5. Verificando componentes..."
if [ -f "src/components/ProductCard.tsx" ]; then
    echo "✓ ProductCard.tsx encontrado"
else
    echo "✗ ProductCard.tsx NO encontrado"
fi

if [ -f "src/components/AdSlot.tsx" ]; then
    echo "✓ AdSlot.tsx encontrado"
else
    echo "✗ AdSlot.tsx NO encontrado"
fi

# 7. Construir la aplicación
echo "6. Construyendo aplicación..."
export NODE_OPTIONS="--max-old-space-size=256"
npm run build

if [ $? -eq 0 ]; then
    echo "✓ Build exitoso"
    
    # 8. Iniciar la aplicación
    echo "7. Iniciando aplicación..."
    export NODE_OPTIONS="--max-old-space-size=256"
    npm start
else
    echo "✗ Build falló. Revisa los errores arriba"
    echo "Intentando build con más memoria..."
    export NODE_OPTIONS="--max-old-space-size=512"
    npm run build
fi
