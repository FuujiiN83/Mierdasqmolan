#!/bin/bash
# Instalación completa para VPS

echo "=== INSTALACIÓN COMPLETA VPS ==="

# 1. Parar procesos
pkill -f node
pkill -f next
sleep 2

# 2. Ir al directorio
cd /opt/Mierdasqmolan

# 3. Limpiar
rm -rf node_modules package-lock.json .next

# 4. Instalar dependencias completas
echo "Instalando dependencias..."
NODE_OPTIONS="--max-old-space-size=256" npm install

# 5. Build
echo "Construyendo..."
NODE_OPTIONS="--max-old-space-size=256" npm run build

# 6. Start
echo "Iniciando..."
NODE_OPTIONS="--max-old-space-size=256" npm start
