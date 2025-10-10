#!/bin/bash
# Script de diagnóstico para problemas de conexión Putty
# Ejecutar en el VPS: bash diagnose-vps-connection.sh

echo "=== DIAGNÓSTICO DE CONEXIÓN VPS ==="

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

# 1. Verificar recursos del sistema
print_status "1. Verificando recursos del sistema..."
echo "Memoria RAM:"
free -h
echo ""
echo "Espacio en disco:"
df -h
echo ""
echo "Uso de CPU:"
top -bn1 | head -5
echo ""

# 2. Verificar procesos de Node.js
print_status "2. Verificando procesos de Node.js..."
ps aux | grep node | grep -v grep
echo ""

# 3. Verificar PM2
print_status "3. Verificando PM2..."
if command -v pm2 &> /dev/null; then
    pm2 status
    echo ""
    pm2 logs --lines 5
else
    print_warning "PM2 no está instalado"
fi
echo ""

# 4. Verificar puertos
print_status "4. Verificando puertos..."
netstat -tlnp | grep -E ":(3000|80|443)"
echo ""

# 5. Verificar Nginx
print_status "5. Verificando Nginx..."
if systemctl is-active --quiet nginx; then
    print_success "Nginx está activo"
    systemctl status nginx --no-pager -l
else
    print_warning "Nginx no está activo"
fi
echo ""

# 6. Verificar logs del sistema
print_status "6. Verificando logs del sistema..."
echo "Últimas 10 líneas de syslog:"
tail -10 /var/log/syslog 2>/dev/null || echo "No se puede acceder a syslog"
echo ""

# 7. Verificar memoria y swap
print_status "7. Verificando memoria y swap..."
echo "Memoria virtual:"
cat /proc/meminfo | grep -E "(MemTotal|MemAvailable|SwapTotal|SwapFree)"
echo ""

# 8. Verificar conexiones de red
print_status "8. Verificando conexiones de red..."
ss -tuln | head -10
echo ""

# 9. Verificar si hay procesos que consumen mucha memoria
print_status "9. Verificando procesos que consumen memoria..."
ps aux --sort=-%mem | head -10
echo ""

# 10. Verificar configuración de SSH
print_status "10. Verificando configuración de SSH..."
if [ -f "/etc/ssh/sshd_config" ]; then
    echo "Configuración SSH relevante:"
    grep -E "(ClientAliveInterval|ClientAliveCountMax|TCPKeepAlive)" /etc/ssh/sshd_config
else
    print_warning "No se puede acceder a configuración SSH"
fi
echo ""

# 11. Verificar si la aplicación responde
print_status "11. Verificando respuesta de la aplicación..."
if curl -f -s http://localhost:3000 > /dev/null 2>&1; then
    print_success "Aplicación responde en puerto 3000"
else
    print_error "Aplicación no responde en puerto 3000"
fi

if curl -f -s http://localhost:80 > /dev/null 2>&1; then
    print_success "Nginx responde en puerto 80"
else
    print_warning "Nginx no responde en puerto 80"
fi
echo ""

# 12. Verificar logs de la aplicación
print_status "12. Verificando logs de la aplicación..."
if [ -d "/opt/Mierdasqmolan" ]; then
    echo "Logs de la aplicación:"
    if [ -f "/opt/Mierdasqmolan/.next/server.log" ]; then
        tail -10 /opt/Mierdasqmolan/.next/server.log
    else
        print_warning "No se encontraron logs de la aplicación"
    fi
else
    print_warning "Directorio de la aplicación no encontrado"
fi
echo ""

print_status "=== DIAGNÓSTICO COMPLETADO ==="
print_status "Si Putty se desconecta, puede ser por:"
echo "1. Falta de memoria RAM"
echo "2. Procesos que consumen muchos recursos"
echo "3. Configuración de SSH con timeouts cortos"
echo "4. Problemas en el build de la aplicación"
echo "5. Conflictos de puertos"
echo ""
print_status "Soluciones recomendadas:"
echo "1. Reiniciar el VPS: sudo reboot"
echo "2. Usar el script deploy-vps-stable.sh"
echo "3. Verificar que no hay procesos zombie"
echo "4. Aumentar memoria swap si es necesario"
