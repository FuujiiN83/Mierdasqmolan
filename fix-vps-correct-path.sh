#!/bin/bash
# Script para corregir la ruta del repositorio en el VPS

echo "=== CORRIGIENDO RUTA DEL REPOSITORIO ==="

# 1. Parar todos los procesos
echo "1. Parando procesos existentes..."
pkill -f node
pkill -f next
sleep 3

# 2. Crear directorio correcto
echo "2. Creando directorio correcto..."
mkdir -p /opt/Mierdasqmolan
cd /opt/Mierdasqmolan

# 3. Clonar el repositorio correcto
echo "3. Clonando repositorio correcto..."
git clone https://github.com/FuujiiN83/Mierdasqmolan.git .

if [ $? -ne 0 ]; then
    echo "ERROR: No se pudo clonar el repositorio"
    exit 1
fi

# 4. Verificar que se clonó correctamente
echo "4. Verificando estructura del proyecto..."
if [ -f "package.json" ]; then
    echo "✓ package.json encontrado"
else
    echo "✗ package.json NO encontrado"
    exit 1
fi

if [ -d "src" ]; then
    echo "✓ carpeta src encontrada"
else
    echo "✗ carpeta src NO encontrada"
    exit 1
fi

# 5. Limpiar instalación anterior
echo "5. Limpiando instalación anterior..."
rm -rf node_modules package-lock.json .next

# 6. Instalar dependencias
echo "6. Instalando dependencias..."
NODE_OPTIONS="--max-old-space-size=256" npm install --production

# 7. Construir aplicación
echo "7. Construyendo aplicación..."
NODE_OPTIONS="--max-old-space-size=256" npm run build

if [ $? -eq 0 ]; then
    echo "✓ Build exitoso"
    
    # 8. Iniciar aplicación
    echo "8. Iniciando aplicación..."
    NODE_OPTIONS="--max-old-space-size=256" npm start
else
    echo "✗ Build falló"
    exit 1
fi
