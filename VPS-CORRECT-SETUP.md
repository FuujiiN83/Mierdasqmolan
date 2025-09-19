# Configuración Correcta del VPS

## Problema Identificado
El VPS está usando la ruta incorrecta `/opt/mqm-web` cuando debería usar `/opt/Mierdasqmolan`.

## Solución

### Comandos Manuales:

```bash
# 1. Parar todos los procesos
pkill -f node
pkill -f next
sleep 3

# 2. Eliminar directorio incorrecto
rm -rf /opt/mqm-web

# 3. Crear directorio correcto
mkdir -p /opt/Mierdasqmolan
cd /opt/Mierdasqmolan

# 4. Clonar repositorio correcto
git clone https://github.com/FuujiiN83/Mierdasqmolan.git .

# 5. Verificar que se clonó correctamente
ls -la
# Deberías ver: package.json, src/, next.config.js, etc.

# 6. Instalar dependencias
NODE_OPTIONS="--max-old-space-size=256" npm install --production

# 7. Construir aplicación
NODE_OPTIONS="--max-old-space-size=256" npm run build

# 8. Iniciar aplicación
NODE_OPTIONS="--max-old-space-size=256" npm start
```

### Script Automático:

```bash
# Descargar y ejecutar script de configuración
curl -sSL https://raw.githubusercontent.com/FuujiiN83/Mierdasqmolan/main/setup-correct-vps.sh | bash
```

### Verificación:

```bash
# Verificar que estás en el directorio correcto
pwd
# Debería mostrar: /opt/Mierdasqmolan

# Verificar que el proyecto está completo
ls -la
# Deberías ver todos los archivos del proyecto

# Verificar que la aplicación está funcionando
netstat -tlnp | grep :3000
```

## Nota Importante
El repositorio correcto es `Mierdasqmolan` dentro de `MQM web`, no `mqm-web` directamente.
