#!/bin/bash
# Script para solucionar dependencias faltantes en VPS

echo "=== SOLUCIONANDO DEPENDENCIAS FALTANTES ==="

# 1. Parar procesos
echo "1. Parando procesos..."
pkill -f node
pkill -f next
sleep 2

# 2. Ir al directorio correcto
cd /opt/Mierdasqmolan

# 3. Limpiar instalación anterior
echo "2. Limpiando instalación anterior..."
rm -rf node_modules package-lock.json .next

# 4. Instalar TODAS las dependencias (incluyendo devDependencies)
echo "3. Instalando todas las dependencias..."
NODE_OPTIONS="--max-old-space-size=256" npm install

# 5. Verificar que tailwindcss esté instalado
echo "4. Verificando tailwindcss..."
if npm list tailwindcss >/dev/null 2>&1; then
    echo "✓ tailwindcss instalado"
else
    echo "✗ tailwindcss no encontrado. Instalando manualmente..."
    npm install tailwindcss autoprefixer postcss --save-dev
fi

# 6. Verificar componentes
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

# 7. Construir aplicación
echo "6. Construyendo aplicación..."
NODE_OPTIONS="--max-old-space-size=256" npm run build

if [ $? -eq 0 ]; then
    echo "✓ Build exitoso"
    
    # 8. Iniciar aplicación
    echo "7. Iniciando aplicación..."
    NODE_OPTIONS="--max-old-space-size=256" npm start
else
    echo "✗ Build falló. Revisa los errores arriba"
fi
