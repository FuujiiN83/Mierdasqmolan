#!/bin/bash
# Solución rápida para errores del VPS

echo "=== SOLUCIÓN RÁPIDA VPS ==="

# 1. Parar procesos
echo "1. Parando procesos..."
pkill -f node
pkill -f next
sleep 3

# 2. Ir al directorio
cd /opt/mqm-web

# 3. Limpiar
echo "2. Limpiando..."
rm -rf node_modules package-lock.json .next

# 4. Instalar dependencias completas
echo "3. Instalando dependencias..."
NODE_OPTIONS="--max-old-space-size=256" npm install

# 5. Build
echo "4. Construyendo..."
NODE_OPTIONS="--max-old-space-size=256" npm run build

# 6. Iniciar
echo "5. Iniciando..."
NODE_OPTIONS="--max-old-space-size=256" npm start
