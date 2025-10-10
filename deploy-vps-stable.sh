#!/bin/bash
# Script de deploy estable para evitar desconexiones de Putty
# Ejecutar en el VPS: bash deploy-vps-stable.sh

echo "=== DEPLOY ESTABLE VPS MQM WEB ==="

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Función para mantener conexión activa
keep_alive() {
    while true; do
        echo "."
        sleep 30
    done &
    KEEP_ALIVE_PID=$!
}

# Función para limpiar proceso keep_alive
cleanup() {
    if [ ! -z "$KEEP_ALIVE_PID" ]; then
        kill $KEEP_ALIVE_PID 2>/dev/null
    fi
}

# Configurar trap para limpiar al salir
trap cleanup EXIT

# Iniciar keep alive
keep_alive

# 1. Verificar espacio en disco
print_status "1. Verificando espacio en disco..."
df -h /opt
if [ $(df /opt | tail -1 | awk '{print $5}' | sed 's/%//') -gt 80 ]; then
    print_warning "Espacio en disco bajo, limpiando..."
    pm2 delete all 2>/dev/null || true
    rm -rf /tmp/* 2>/dev/null || true
fi

# 2. Backup de configuración actual
print_status "2. Haciendo backup de configuración actual..."
if [ -d "/opt/Mierdasqmolan" ]; then
    cp -r /opt/Mierdasqmolan /opt/Mierdasqmolan.backup.$(date +%Y%m%d_%H%M%S) 2>/dev/null || true
fi

# 3. Parar servicios de forma segura
print_status "3. Parando servicios de forma segura..."
pm2 stop all 2>/dev/null || true
sleep 2
pm2 delete all 2>/dev/null || true
sleep 2

# 4. Limpiar directorio
print_status "4. Limpiando directorio..."
cd /opt
rm -rf Mierdasqmolan
mkdir Mierdasqmolan
cd Mierdasqmolan

# 5. Clonar repositorio con timeout
print_status "5. Clonando repositorio..."
timeout 300 git clone https://github.com/FuujiiN83/Mierdasqmolan.git . || {
    print_error "Timeout clonando repositorio"
    exit 1
}

# 6. Usar configuración conservadora
print_status "6. Aplicando configuración conservadora..."
if [ -f "next.config-conservative.js" ]; then
    cp next.config-conservative.js next.config.js
    print_success "Configuración conservadora aplicada"
else
    print_warning "No se encontró next.config-conservative.js, usando configuración por defecto"
fi

# 7. Instalar dependencias con límite de memoria
print_status "7. Instalando dependencias..."
export NODE_OPTIONS="--max-old-space-size=256"
export NPM_CONFIG_PRODUCTION=false

# Limpiar cache de npm
npm cache clean --force 2>/dev/null || true

# Instalar con timeout
timeout 600 npm install --production || {
    print_error "Timeout instalando dependencias"
    exit 1
}

if [ $? -ne 0 ]; then
    print_error "Error instalando dependencias"
    exit 1
fi

# 8. Build con configuración conservadora
print_status "8. Construyendo aplicación..."
export NODE_OPTIONS="--max-old-space-size=256"

# Limpiar build anterior
rm -rf .next 2>/dev/null || true

# Build con timeout
timeout 900 npm run build || {
    print_error "Timeout en build"
    print_status "Mostrando logs de error..."
    npm run build 2>&1 | tail -20
    exit 1
}

if [ $? -ne 0 ]; then
    print_error "Error en el build"
    print_status "Mostrando logs de error..."
    npm run build 2>&1 | tail -20
    exit 1
fi

# 9. Configurar PM2 con configuración estable
print_status "9. Configurando PM2..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'mqm-web',
    script: 'npm',
    args: 'start',
    cwd: '/opt/Mierdasqmolan',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '256M',
    min_uptime: '10s',
    max_restarts: 5,
    restart_delay: 4000,
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NODE_OPTIONS: '--max-old-space-size=256'
    }
  }]
};
EOF

# 10. Iniciar aplicación
print_status "10. Iniciando aplicación..."
pm2 start ecosystem.config.js
sleep 5
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null || true

# 11. Verificar que la aplicación funciona
print_status "11. Verificando aplicación..."
sleep 10

# Verificar que PM2 está funcionando
if pm2 list | grep -q "mqm-web.*online"; then
    print_success "Aplicación: Funcionando"
else
    print_error "Aplicación: No funciona"
    pm2 logs mqm-web --lines 20
    exit 1
fi

# Verificar que el puerto está escuchando
if netstat -tlnp | grep -q ":3000"; then
    print_success "Puerto 3000: Escuchando"
else
    print_error "Puerto 3000: No escucha"
    exit 1
fi

# Probar que la aplicación responde
if curl -f -s http://localhost:3000 > /dev/null; then
    print_success "Aplicación responde correctamente"
else
    print_warning "Aplicación no responde, pero PM2 está funcionando"
fi

# 12. Configurar Nginx si no está configurado
print_status "12. Verificando Nginx..."
if [ ! -f "/etc/nginx/sites-enabled/mqm-web" ]; then
    print_status "Configurando Nginx..."
    
    cat > /etc/nginx/sites-available/mqm-web << 'EOF'
server {
    listen 80;
    server_name mierdasquemolan.com www.mierdasquemolan.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|eot)$ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    access_log /var/log/nginx/mqm-web.access.log;
    error_log /var/log/nginx/mqm-web.error.log;
}
EOF

    # Habilitar sitio
    ln -sf /etc/nginx/sites-available/mqm-web /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    
    # Verificar configuración
    nginx -t
    if [ $? -eq 0 ]; then
        systemctl reload nginx
        print_success "Nginx configurado y recargado"
    else
        print_error "Error en configuración de Nginx"
    fi
else
    print_success "Nginx ya está configurado"
fi

# 13. Verificación final
print_status "13. Verificación final..."
sleep 5

if systemctl is-active --quiet nginx; then
    print_success "Nginx: Funcionando"
else
    print_warning "Nginx: No está activo, pero la aplicación funciona directamente"
fi

print_success "=== DEPLOY ESTABLE COMPLETADO ==="
print_status "Comandos útiles:"
echo "  pm2 status                    # Ver estado"
echo "  pm2 logs mqm-web             # Ver logs"
echo "  pm2 restart mqm-web          # Reiniciar"
echo "  systemctl status nginx      # Estado Nginx"
echo "  curl -I http://localhost:3000 # Probar aplicación"
echo "  curl -I http://mierdasquemolan.com # Probar dominio"

# Limpiar proceso keep_alive
cleanup
