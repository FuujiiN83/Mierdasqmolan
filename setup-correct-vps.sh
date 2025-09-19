#!/bin/bash
# Script para configurar el VPS con la ruta correcta

echo "=== CONFIGURANDO VPS CON RUTA CORRECTA ==="

# 1. Parar todos los procesos
echo "1. Parando todos los procesos..."
pkill -f node
pkill -f next
sleep 3

# 2. Eliminar directorio incorrecto
echo "2. Eliminando directorio incorrecto..."
rm -rf /opt/mqm-web

# 3. Crear directorio correcto
echo "3. Creando directorio correcto..."
mkdir -p /opt/Mierdasqmolan
cd /opt/Mierdasqmolan

# 4. Clonar repositorio correcto
echo "4. Clonando repositorio correcto..."
git clone https://github.com/FuujiiN83/Mierdasqmolan.git .

# 5. Verificar clonación
echo "5. Verificando clonación..."
if [ -f "package.json" ] && [ -d "src" ]; then
    echo "✓ Repositorio clonado correctamente"
else
    echo "✗ Error al clonar el repositorio"
    exit 1
fi

# 6. Instalar dependencias
echo "6. Instalando dependencias..."
NODE_OPTIONS="--max-old-space-size=256" npm install --production

# 7. Construir
echo "7. Construyendo aplicación..."
NODE_OPTIONS="--max-old-space-size=256" npm run build

# 8. Iniciar
echo "8. Iniciando aplicación..."
NODE_OPTIONS="--max-old-space-size=256" npm start
