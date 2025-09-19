#!/bin/bash
# Script simple para clonar el proyecto en VPS

echo "=== CLONANDO PROYECTO MQM WEB ==="

# Crear directorio del proyecto
PROJECT_DIR="/opt/mqm-web"
echo "Creando directorio: $PROJECT_DIR"
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# Clonar el repositorio
echo "Clonando desde GitHub..."
git clone https://github.com/FuujiiN83/Mierdasqmolan.git .

if [ $? -eq 0 ]; then
    echo "✓ Proyecto clonado exitosamente"
    echo "Directorio del proyecto: $PROJECT_DIR"
    echo "Para continuar, ejecuta:"
    echo "cd $PROJECT_DIR"
    echo "npm install"
    echo "npm run build"
    echo "npm start"
else
    echo "✗ Error al clonar el proyecto"
    exit 1
fi
