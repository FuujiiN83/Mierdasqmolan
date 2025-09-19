#!/bin/bash
# Script completo de instalación para VPS

echo "=== INSTALACIÓN COMPLETA MQM WEB EN VPS ==="

# Verificar si git está instalado
if ! command -v git &> /dev/null; then
    echo "Instalando git..."
    apt update && apt install -y git
fi

# Verificar si node está instalado
if ! command -v node &> /dev/null; then
    echo "Instalando Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    apt install -y nodejs
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "Instalando npm..."
    apt install -y npm
fi

echo "Versiones instaladas:"
echo "Git: $(git --version)"
echo "Node: $(node --version)"
echo "NPM: $(npm --version)"

# Crear directorio para el proyecto
PROJECT_DIR="/opt/mqm-web"
echo "Creando directorio del proyecto: $PROJECT_DIR"
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# Clonar el repositorio
echo "Clonando repositorio desde GitHub..."
git clone https://github.com/FuujiiN83/Mierdasqmolan.git .

if [ $? -ne 0 ]; then
    echo "ERROR: No se pudo clonar el repositorio"
    exit 1
fi

# Hacer los scripts ejecutables
chmod +x *.sh

# Instalar dependencias
echo "Instalando dependencias..."
export NODE_OPTIONS="--max-old-space-size=256"
npm install --production --no-optional --no-audit --no-fund

if [ $? -ne 0 ]; then
    echo "ERROR: npm install falló"
    exit 1
fi

# Construir la aplicación
echo "Construyendo aplicación..."
export NODE_OPTIONS="--max-old-space-size=256"
npm run build

if [ $? -ne 0 ]; then
    echo "ERROR: Build falló"
    exit 1
fi

echo "✓ Instalación completada exitosamente"
echo "Para iniciar la aplicación, ejecuta:"
echo "cd $PROJECT_DIR && npm start"
